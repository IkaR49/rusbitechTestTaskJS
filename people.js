'use scrict';

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
   * copy(obj) - скопировать необходимые свойства 
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

// Class Implementation

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
Human.prototype.copy = function(obj) {
  for (let key in obj) {
    this[key] = obj[key];
  }
  return true;
}
//////////

Student.prototype.name = function(...args) {
  Human.prototype.name.apply(this, args);
  return `${this._name.last} ${this._name.first}`;
};
//////////

Lecturer.prototype.name = function(...args) {
  Human.prototype.name.apply(this, args);
  return `${this._name.last} ${this._name.first[0]}.${this._name.middle[0]}.`;
};
Lecturer.prototype.degree = function(deg) {
  if (deg) this._degree = deg;
  return this._degree;
}
//////////
