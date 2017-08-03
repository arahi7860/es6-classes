class Person {

  constructor (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayHiTo (other) {
    console.log(`Hi ${other.firstName}, I am ${this.firstName}`);
  }

  get fullName() {
    console.log('getting')
    return this.firstName + ' ' + this.lastName;
  }

  set fullName (val) {
    console.log('setting')
    var names = val.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}
