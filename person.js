class Person {

  constructor (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  sayHiTo (other) {
    console.log(`Hi ${other.firstName}, I am ${this.firstName}`);
  }

  // get and setter below (commented out because we are using a different approach)

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

  // better pattern:

  getFullName () {
    return this.firstName + ' ' + this.lastName;
  }

  setFullName (val) {
    var names = val.split(' ');
    this.firstName = names[0];
    this.lastName = names[1]; // what if there are more than two names given? how can we fix this? eg. 'David Heinemeier Hansson'
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


class Programmer extends Person {
  constructor (firstName, lastName, options) {
    this.githubHandle = options.githubHandle;
    this.website = options.website;
    super(firstName, lastName);
  }

  getResume () {
    return (
      this.firstName + ' ' + this.lastName +
      '\n' + 'Github: ' + this.githubHandle +
      '\n' + 'Website: ' + this.website
    );
  }

  sayHiTo (other) {
    super.sayHiTo(other);
    console.log('I AM A PROGRAMMER!');
  }
}

// sandbox

var person = new Person('Stacey', 'Mae');

var programmer = new Programmer('David', 'Heinemeier Hansson', {
  website: 'david.heinemeierhansson.com',
  githubHandle: 'dhh'
});

programmer.sayHiTo(person);
