'use sctrict';

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
   * name(t) - set/get title
   * id(i) - set/get id
   * lecturer(id) - set/get lecturer's id
   * copy(obj) - скопировать необходимые свойства из obj
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
   * copy(obj) - скопировать необходимые свойства из obj
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
   * copy(obj) - скопировать необходимые свойства из obj
  */
}

// Class Implementation

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
Subject.prototype.copy = function(obj) {
  for (let key in obj) {
    this[key] = obj[key];
  }
  return true;
}
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
Group.prototype.copy = function(obj) {
  for (let key in obj) {
    this[key] = obj[key];
  }
  return true;
}
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
Lesson.prototype.copy = function(obj) {
  for (let key in obj) {
    this[key] = obj[key];
  }
  return true;
}
//////////
