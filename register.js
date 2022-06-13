'use strict';

function Register() {
  this._students = [];
  this._lecturers = [];
  this._groups = [];
  this._subjects = [];
  this._lessons = [];

  this._current = {
    group: -1,
    subject: -1
  };
  
  /* Methods:
   * initData() - Подгрузить информацию
   * showGroupList() - Показать список групп в меню
   * showSubjectList() - Показать список предметов в меню
   * showTable() - Показать таблицу с посещаемостью данной группой данного занятия
   * pick(type, id[, onlyMenu]) - Выбрать type (группу/предмет) с номером id и сменить соотв. названия. Если onlyMenu = true - не строить таблицу
   * setListeners() - Устанавливает слушателей кликов меню
  */

  // initData in constructor
  this.initData();
}

Register.prototype.initData = function() {
  let elems = ['groups', 'lecturers', 'lessons',
               'students', 'subjects'];

  for (let i = 0; i < elems.length; i++) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'json/' + elems[i] + '.json', false);
    xhr.send();

    if (xhr.status !== 200) {
      alert(`I can't get ${elems[i]} (${xhr.status})`);
      return false;
    }

    let json = JSON.parse(xhr.responseText);
    let type = '_' + elems[i];
    for (let j = 0; j < json.length; j++) {
      ///////// очень, очень, очень, плохо
      // Хотя, с другой стороны, type строится на основе elems, оба жёстко
      // прописаны в коде и просто так пользователь к ним доступа не имеет.
      // Но мне всё равно не нравится.
      this[type][j] = eval('new ' + type[1].toUpperCase() + type.slice(2, -1) + '();');
      this[type][j].copy(json[j]);
    }
  }

  return true;
}

Register.prototype.showGroupList = function() {
  let gr = this._groups;

  let target = document.querySelector('#group-list');
  let ul = target.cloneNode(false);

  for (let i = 0; i < gr.length; i++) {
    let li = document.createElement('li');
    li.id = 'group-' + gr[i].id();
    li.append(gr[i].name());
    if (i === 0) li.className = 'active';
    ul.append(li);
  }

  target.replaceWith(ul);
  return true;
}

Register.prototype.showSubjectList = function() {
  let sbj = this._subjects;

  let target = document.querySelector('#subject-list');
  let ul = target.cloneNode(false);

  for (let i = 0; i < sbj.length; i++) {
    let li = document.createElement('li');
    li.id = 'subject-' + sbj[i].id();

    let lectName = this._lecturers[sbj[i].lecturer()].name();
    let lectDegree = this._lecturers[sbj[i].lecturer()].degree();
    
    li.append(sbj[i].name() + ` (${lectDegree} ${lectName})`);
    if (i === 0) li.className = 'active';
    ul.append(li);
  }

  target.replaceWith(ul);
  return true;
}

Register.prototype.showTable = function() {
  let less = this._lessons.filter(
    (item) => (item.subject() === this._current.subject) &&
              (item.group() === this._current.group)
  );
  let stud = this._groups[this._current.group].students();

  let target = document.querySelector('.table-wrap table');
  let table = target.cloneNode(false);

  // Create <thead>
  let thead = document.createElement('thead');
  {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.className = 'first';
    td.append('ФИО/Дата');
    tr.append(td);

    for (let lid = 0; lid < less.length; lid++) {
      td = document.createElement('td');
      td.append(less[lid].date());
      tr.append(td);
    }

    thead.append(tr);
  }
  
  // Create <tbody>
  let tbody = document.createElement('tbody');
  for (let sid = 0; sid < stud.length; sid++) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.className = 'first';
    td.append(this._students[stud[sid]].name());
    tr.append(td);

    for (let lid = 0; lid < less.length; lid++) {
      td = document.createElement('td');
      td.append(less[lid].isLoser(sid) ? 'X' : '+');
      tr.append(td);
    }

    tbody.append(tr);
  }

  table.append(thead);
  table.append(tbody);
  target.replaceWith(table);
  return true;
}

Register.prototype.pick = function(type, id, onlyMenu) {
  this._current[type] = id;

  // Change group/subject name
  let elem = document.querySelector('.table-wrap .active.' + type);
  let txt = this['_' + type + 's'][id].name();
  elem.innerHTML = txt;

  // Change lecturer name
  if (type === 'subject') {
    elem = document.querySelector('.table-wrap .active.lecturer');
    txt = this._lecturers[this._subjects[this._current.subject].lecturer()].name();
    elem.innerHTML = txt;
  }

  return onlyMenu ? false : this.showTable();
}

Register.prototype.setListeners = function() {
  let list = document.querySelectorAll('.list ul');
  for (let i = 0; i < list.length; i++) {
    // Вешаем обработчик не на каждый элемент списка, а на весь список.
    // Меньше обработчиков, чище код. Спасибо, stackoverflow.
    // Не понимаю, почему именно этот аргумент передаётся в коллбек-функцию,
    // попросту не нашёл описания. Но оно работает
    list[i].addEventListener('click', (e) => {
      let elem = e.target;

      // Change active element in list
      list[i].querySelector('.active').className = '';
      elem.className = 'active';
      
      // Change right side (and object state)
      let tagID = elem.id.split('-');
      this.pick(tagID[0], +tagID[1]);

      return true;
    });
  }
}
