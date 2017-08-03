class Person {

  constructor (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayHiTo (other) {
    console.log(`Hi ${other.firstName}, I am ${this.firstName}`);
  }

  // get and setter below (but we don't want them)

  // get fullName() {
  //   console.log('getting')
  //   return this.firstName + ' ' + this.lastName;
  // }
  //
  // set fullName (val) {
  //   console.log('setting')
  //   var names = val.split(' ');
  //   this.firstName = names[0];
  //   this.lastName = names[1];
  // }

  getFullName () {
    return this.firstName + ' ' + this.lastName;
  }

  setFullName (val) {
    var names = val.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }

  fullName () {
    if (arguments.length === 0) {
      return getFullName();
    } else {
      setFullName(arguments[0]);
    }
  }

  static sentiment (thing) {
    if (thing === 'poo' || thing === `spiders`) {
      console.log(`People do not like ${thing}`);
    } else {
      console.log(`People love ${thing}!`);
    }
  }
}
