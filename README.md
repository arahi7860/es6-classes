---
title: ES6 classes
type: lesson
duration: "2:30"
creator:
    name: Ari Brenner
    city: NY
competencies: Programming
---


<!-- ### Objectives
*After this lesson, students will be able to:*
- Define and identify recursion
- Compare and contract the use of iteration over recursion
- Use (linear) recursion to solve basic algorithms
- Complete all of the learning objectives including this one (lol recursion)

### Preparation
*Before this lesson, students should already be able to:*
- Have a good understanding javascript and functions
- Have practice with white-boarding and discussing algorithms -->

# ES6 Classes

ES6 Classes are the new school way of writing `constructors` and methods on the `prototype`.  Let's see how this works.

### ES5

```javascript
var Person = function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};

Person.prototype.sayHiTo = function (other) {
  console.log(`Hi ${other.firstName}, I am ${this.firstName}`);
};
```

### ES6

```javascript
class Person {

  // define the constructor function
  constructor (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // define any instance method
  sayHiTo (other) {
    console.log(`Hi ${other.firstName}, I am ${this.firstName}`);
  }
}
```

What we see above is exactly equivalent. This is just nicer syntax introduced in ES6.

## Class inheritance

### ES5

To create subclasses we've got our hands dirty. (A little less dirty when we use [helper function](https://git.generalassemb.ly/wdi-nyc-delorean/LAB_U01_D08-prototype-inheritance/blob/master/inheritance.js))

```javascript
Programmer = function (firstName, lastName, options) {
  this.githubHandle = options.githubHandle;
  this.website = options.website;
  Person.call(this, firstName, lastName);
};

inheritPrototype(Person, Programmer);

Programmer.prototype.getResume = function () {
  return (
    this.firstName + ' ' + this.lastName +
    '\n' + 'Github: ' + this.githubHandle +
    '\n' + 'Website: ' + this.website
  );
};
```

> Refer back to [this lecture](https://git.generalassemb.ly/wdi-nyc-delorean/LECTURE_U01_D08-prototype-inheritance) if this does not look familiar.

### ES6

With ES6 this is super easy.  We simply use the [`extends`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) and [`super`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) keywords.

```javascript
// Programmer is inheriting from Person
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
}
```

Pretty shweet, huh?

We can actually call `super` in any instance method.

```javascript
class Programmer extends Person {
  /// ...

  sayHiTo (other) {

    // do everything that happens in the superclass method
    super.sayHiTo(other);

    // do more stuff
    console.log('I AM A PROGRAMMER!');
  }
}

// ...

programmer.sayHiTo(stacey);
// Hi Stacey, I am Ari
// I AM A PROGRAMMER!
```

## Getters and Setters

With ES6, we can also easily define `getter`s and `setter`s.

### Getters

Getters are a way of calling a function without using parens.  (Therefore getters never take arguments.)


```javascript
class Person {
  // ...

  get fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}

var person = new Person('Marty', 'McFly');
person.fullName // => 'Marty McFly'
```

We just called a function without using parens!

> NOTE: Getters should only be used for simple functions that can execute quickly. (In constant time)

### Setters

Setters give us a way of executing code while setting some attribute.  Setters take exactly 1 argument.

```javascript
class Person {
  // ...

  set fullName (val) {
    var names = val.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}

var person = new Person('Doc', 'Brown');
person.fullName // => 'Doc Brown'
person.fullName = 'Emmett Brown';
person.fullName // => 'Emmett Brown'
person.firstName // => 'Emmett'
person.lastName // => 'Brown'
```

Normally when we see `obj.foo = 'bar'` we think "Just setting the `foo` property on `obj` to `'bar'`.  But with setters a function is actually being called and there can be more logic going on.

### When should we use setters and getters?

Almost never.  Bugs around setters and getters can be very hard to track down.  Most JS developers forget they even exist.  For anything more complex than the `fullName` example, do not use getters and setters.

Prefer creating regular functions with a `getFullName`/`setFullName` pattern.

```javascript
class Person {
  getFullName () {
    return this.firstName + ' ' + this.lastName;
  }

  setFullName (val) {
    var names = val.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}
```

> NOTE: I am just smooshing `get fullName` into `getFullName` and `set fullName` into `setFullName`.

We can also use the `jQuery` pattern of setting and getting.

<!-- ## Conclusion
- When would we prefer to use recursion over iteration?
- How does recursion actually work?
- What is needed to insure we don't recurse forever? -->
