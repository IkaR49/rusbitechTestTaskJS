// Генератор файлов json
// Запускается один раз через nodejs
// Технически содержит в себе копипасту файлов people.js и subj.js

'use strict';

// Class Definition

function Human() {
  this._id = -1;
  this._name = {
    first: 'Имя',
    middle: 'Отчество',
    last: 'Фамилия'
  };
  
  /* Methods:
   * name(f, m, l) - set/get name (Full: "Last First Middle")
   * id(i) - set/get id
  */
}
//////////

function Student() {
  Human.apply(this, arguments);

  /* Methods:
   * name(f, m, l) - set/get name (Without middle: "Last First")
  */
}
Student.prototype = Object.create(Human.prototype);
Student.prototype.constructor = Student;
//////////

function Lecturer() {
  Human.apply(this, arguments);
  this._degree = 'donkey';

  /* Methods:
   * name(f, m, l) - set/get name (Last and initials: "Last F.M.")
   * degree(deg) - set/get degree
  */
}
Lecturer.prototype = Object.create(Human.prototype);
Lecturer.prototype.constructor = Lecturer;
//////////

// Class Inmplementation

Human.prototype.name = function(...args) {
  if (args.length) {
    if (args[0] instanceof Array)
      args = args[0];
    this._name = {
      first: args[0],
      middle: args[1],
      last: args[2]
    };
  }
  return `${this._name.last} ${this._name.first} ${this._name.middle}`;
};
Human.prototype.id = function(i) {
  if (isFinite(parseFloat(i))) // isNumeric()
    if (i > -1)                // isPositive()
      this._id = i;
  return this._id;
};
//////////

Student.prototype.name = function(...args) {
  Human.prototype.name.apply(this, args);
  return `${this._name.last} ${this._name.first}`;
};
//////////

Lecturer.prototype.name = function (...args) {
  Human.prototype.name.apply(this, args);
  return `${this._name.last} ${this._name.first[0]}.${this._name.middle[0]}.`;
};
Lecturer.prototype.degree = function (deg) {
  if (deg) this._degree = deg;
  return this._degree;
}
//////////

// Help function
function isPosNum(i) {
  /*if (isFinite(parseFloat(i))) // isNumeric()
    if (i > -1)                // isPositive()
      return true;
  return false;*/
  return isFinite(parseFloat(i)) && (i > -1);
}

// Class Definition

function Subject() {
  this._id = -1;
  this._name = 'Наименование';
  this._lecturer = -1;
  
  /* Methods:
   * name(t) - set/get name
   * id(i) - set/get id
   * lecturer(id) - set/get lecturer's id
  */
}
//////////

function Group() {
  this._id = -1;
  this._name = 'Наименование';
  this._students = [];

  /* Methods:
   * name(n) - set/get name of group
   * id(i) - set/get id
   * students() - get array of student's id
   * isStudying() - true/false
   * add() - add student-id into group
   * expel() - remove student-if from group
  */
}
//////////

function Lesson() {
  this._id = -1;
  this._subject = -1;
  this._group = -1;
  this._date = 0; // only timestamp. Not a "correct" date.
  this._losers = [];

  /* Methods:
   * id(i) - set/get id
   * subject(id),  group(id) - set/get id of the necessary element
   * date(ms) - set date in ms or get date in string "dd.mm"
   * losers() - get array of losers
   * isLoser(id) - true if student - loser, false - otherwise
   * wasBe(id) - true if student was in class, false - otherwise
   * addLoser(id) - add loser
  */
}

// Class Inmplementation

Subject.prototype.id = function(i) {
  if (isPosNum(i))
    this._id = i;
  return this._id;
};
Subject.prototype.name = function(t) {
  if (t) this._name = t;
  return this._name;
};
Subject.prototype.lecturer = function(id) {
  if (isPosNum(id))
    this._lecturer = id;
  return this._lecturer;
};
//////////

Group.prototype.id = function(i) {
  if (isPosNum(i))
    this._id = i;
  return this._id;
};
Group.prototype.name = function(n) {
  if (n) this._name = n;
  return this._name;
};
Group.prototype.students = function() {
  return this._students;
};
Group.prototype.isStudying = function(id) {
  return (this._students.indexOf(id) > -1);
};
Group.prototype.add = function (id) {
  if (this.isStudying(id))
    return 1;
  this._students.push(id);
  return 0;
};
Group.prototype.expel = function(id) {
  if (!this.isStudying(id))
    return 1;
  this._students.splice(this._students.indexOf(id), 1);
  return 0;
};
//////////

Lesson.prototype.id = function(i) {
  if (isPosNum(i))
    this._id = i;
  return this._id;
};
Lesson.prototype.subject = function(id) {
  if (isPosNum(id))
    this._subject = id;
  return this._subject;
};
Lesson.prototype.group = function(id) {
  if (isPosNum(id))
    this._group = id;
  return this._group;
};
Lesson.prototype.date = function(ms) {
  if (isPosNum(ms))
    this._date = ms;
  let d = new Date(this._date);
  return d.getDate() + '.' + (+d.getMonth() + 1);
};
Lesson.prototype.losers = function() {
  return this._losers;
};
Lesson.prototype.isLoser = function(id) {
  return (this._losers.indexOf(id) > -1);
};
Lesson.prototype.addLoser = function(id) {
  if (this.isLoser(id))
    return 1;
  this._losers.push(id);
  return 0;
};
//////////


// Довольно бредовый словарь
let dictionary = {
  firstName: [
    'Павел', 'Игорь', 'Семён', 'Валентин',
    'Николай', 'Никонор', 'Константин', 'Бродобрей',
    'Валенок', 'Санэкс', 'Иван', 'ПростоХлеб',
    'Джимми', 'Алёна', 'Пётр', 'Кузнец'
  ],
  middleName: [
    'Петрович', 'Иванович', 'Семёнович', 'Ктулху',
    'Бронды оглы', 'Салфетка', 'Свинец',
    'Тихонович', 'Джиммивич', 'Солнышка сын',
    'Бачата', 'Пинокио', 'Клин', 'Туапсе'
  ],
  lastName: [
    'Смирнов', 'Иванов', 'Петров', 'Хохломко',
    'Дизоксирибоза', 'Твоя', 'Толуол',
    'Жидкость', 'Календарь', 'Странная', 'Пташка',
    'Петух', 'Васнецов', 'Казимир', 'Небилет'
  ],
  degree: [
    'умнейший', 'прекрасный', 'лучший', 'тунец',
    'профессор', 'доцент', 'бакалавр', 'холодец',
    'наверное', 'хватит', 'уже', 'идиот'
  ],
  groupName: [
    '2ПО-Т', '1ПО-Т', '3ПО-Т',
    '1СО-М', '2СО-М', '3СО-М',
    '1КГ-Б', '2КГ-Б', '3КГ-Б'
  ],
  subjectname: [
    'Биология', 'Астрология', 'Филология',
    'Болтология', 'Недология', 'Где-тология'
  ]
};

// Промежуточные генераторы
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function genFullName() {
  let posF = getRandom(0, dictionary.firstName.length - 1);
  let posM = getRandom(0, dictionary.middleName.length - 1);
  let posL = getRandom(0, dictionary.lastName.length - 1);
  return [
    dictionary.firstName[posF],
    dictionary.middleName[posM],
    dictionary.lastName[posL]
  ];
}
function genDegree() {
  let pos = getRandom(0, dictionary.degree.length - 1);
  return dictionary.degree[pos];
}
function genGroupName() {
  let pos = getRandom(0, dictionary.groupName.length - 1);
  return dictionary.groupName[pos] + getRandom(1, 5);
}
function genSubjectname() {
  let pos = getRandom(0, dictionary.subjectname.length - 1);
  let type = getRandom(0, 1) ? ' (лекция)' : ' (практика)';
  return dictionary.subjectname[pos] + type;
}

// Генераторы людей
function genStudents(count) {
  let stud = [];
  for (let i = 0; i < count; i++) {
    stud[i] = new Student();
    stud[i].id(i);
    stud[i].name(genFullName());
  }
  return stud;
}
function genLecturers(count) {
  let lect = [];
  for (let i = 0; i < count; i++) {
    lect[i] = new Lecturer();
    lect[i].id(i);
    lect[i].name(genFullName());
    lect[i].degree(genDegree());
  }
  return lect;
}

// Генератор учебных групп.
// min - минимальное количество людей в группе,
// max - максимальное количество людей в группе.
// stud - массив студентов
// Создаёт столько групп, сколько сможет из всхе студентов
// Последняя группа может быть недоукомплектована.
function genGroups(min, max, stud) {
  let group = [];
  for (let gid = 0, sid = 0; sid < stud.length; gid++) {
    // Создаём саму группу
    group[gid] = new Group();
    group[gid].id(gid);
    group[gid].name(genGroupName());
    // Добавляем студентов
    let count = getRandom(min, max + 1);
    for (let i = 0; i < count; i++, sid++)
      if (stud[sid] !== undefined)
        group[gid].add(stud[sid].id());
  }
  return group;
}

// Генератор предметов обучения
// count - количество предметов
// lect - массив лекторов
function genSubjects(count, lect) {
  let subj = [];
  for (let sid = 0; sid < count; sid++) {
    // Создаём непосредственно предмет
    subj[sid] = new Subject();
    subj[sid].id(sid);
    subj[sid].name(genSubjectname());
    // Закрепляем лектора за предметом
    let lid = getRandom(0, lect.length - 1);
    subj[sid].lecturer(lid);
  }
  return subj;
}

// Генератор занятий
// count - количество занятий
// group, subj - массивы групп и занятий соответственно
// Прогульщики расставляются случайно
function genLessons(count, group, subj) {
  let less = [];
  for (let lid = 0; lid < count; lid++) {
    // Инициализируем занятие
    less[lid] = new Lesson();
    less[lid].id(lid);
    less[lid].date((new Date()).getTime()); // Для простоты
    // Прикрепляем предмет к занятию
    let sid = getRandom(0, subj.length - 1);
    less[lid].subject(sid);
    // Прикрепляем группу к занятию
    let gid = getRandom(0, group.length - 1);
    less[lid].group(gid);
    // Расставляем прогульщиков
    // Прогульщиков минимум - 0, максимум - вся группа
    let loserCount = getRandom(0, group[gid].students().length - 1);
    for (let i = 0; i < loserCount; i++)
      less[lid].addLoser(getRandom(0, group[gid].students().length - 1));
  }
  
  return less;
}

let students = genStudents(300);
let lecturers = genLecturers(15);
let groups = genGroups(10, 25, students);
let subjects = genSubjects(20, lecturers);
let lessons = genLessons(2000, groups, subjects);

let fs = require('fs');
fs.writeFile('json/students.json', JSON.stringify(students), function(err) {
  if(err) {
    return console.log(err);
  }
  return console.log('Students OK');
});
fs.writeFile('json/lecturers.json', JSON.stringify(lecturers), function(err) {
  if(err) {
    return console.log(err);
  }
  return console.log('Lecturers OK');
});
fs.writeFile('json/groups.json', JSON.stringify(groups), function(err) {
  if(err) {
    return console.log(err);
  }
  return console.log('Groups OK');
});
fs.writeFile('json/subjects.json', JSON.stringify(subjects), function(err) {
  if(err) {
    return console.log(err);
  }
  return console.log('Subjects OK');
});
fs.writeFile('json/lessons.json', JSON.stringify(lessons), function(err) {
  if(err) {
    return console.log(err);
  }
  return console.log('Lessons OK');
});

