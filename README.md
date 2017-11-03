---
title: ES6 classes
type: lesson
duration: "2:30"
creator:
    name: Ari Brenner
    city: NY
competencies: Programming
---
### Hook
*Replaces clunkier pattern/strategy covered earlier in classes*
- more user-friendly semantics/syntax
- ask if people used prototypes, why or why not?

*Common pattern across programming*

*Similar to radio shorthand for submarines communicating to amongst themsleves*

*comparable to biological cells with walls that communicate with chemical messages*

*seamless organization of data and behavior that "pulls" your thinking into a more naturally organized structure*

*where do conversations/topics begin to take shape organically?*




### Objectives
*After this lesson, students will be able to:*
- Create classes and subclasses with ES6

- Effectively use classes with ES6 to organize a code problem
- Confidently use getters/setters, instance methods, static methods, and define new classes


- Compare and contrast the use of ES6 classes vs traditional patterns
- Identify advantages of classes over prototypes

- Explain what the `arguments` keyword provides and provide an example use classes

- Identify simple setters and getters as instance methods
- Identify examples wherein to use getters/setters


### Preparation
*Before this lesson, students should already:*
- Have a good understanding of the [Prototype Inheritance lecture](https://git.generalassemb.ly/wdi-nyc-delorean/LECTURE_U01_D08-prototype-inheritance)
  - Understand `prototype`, `constructor`, inheritance
- Have attempted the [corresponding lab](https://git.generalassemb.ly/wdi-nyc-delorean/LAB_U01_D08-prototype-inheritance)

# ES6 Classes

[ES6 Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) are the new school way of writing `constructors` and methods on a `prototype`.  Let's see how this works.

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

To create subclasses we've got our hands dirty. (A little less dirty when we use [this helper function](https://git.generalassemb.ly/wdi-nyc-delorean/LAB_U01_D08-prototype-inheritance/blob/master/inheritance.js))

```javascript
Programmer = function (firstName, lastName, options) {
  Person.call(this, firstName, lastName);
  this.githubHandle = options.githubHandle;
  this.website = options.website;
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
    super(firstName, lastName);
    this.githubHandle = options.githubHandle;
    this.website = options.website;
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

Notice we just call `super(firstName, lastName)` rather than `Person.call(this, firstName, lastName)`. Simple.

**Important**: You must call `super` before accessing the `this` keyword. (Or you will get a nice `ReferenceError`)


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


## Alternatives to getters and setters

Prefer creating regular functions with a `getFullName`/`setFullName` pattern.

```javascript
class Person {
  // ...

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

We can also use the `jQuery` pattern of setting and getting.  How?


`</Mini-Lesson>`

So we can take inspiration from `jQuery` give our functions different behaviors depending on the number of arguments given.

```javascript
class Person {
  // ...

  fullName () {
    if (arguments.length === 0) {
      return getFullName();
    } else {
      setFullName(arguments[0]);
    }
  }
}

person.fullName() // => 'Doc Brown'
person.fullName('Emmett Brown');
person.fullName() // => 'Emmett Brown'
```

This is an interesting pattern that is used in some APIs.  But you probably don't need it when writing code for yourself.


## Defining static functions

Static functions are those that live on the constructor, not the prototype or any instance.  They are used for things related to the class, but not any particular instance.


```javascript
class Person {
  /// ...

  static sentiment (thing) {
    if (thing === 'poo' || thing === `spiders`) {
      console.log(`People do not like ${thing}`);
    } else {
      console.log(`People love ${thing}!`);
    }
  }
}

Person.sentiment('flowers');
// => 'People love flowers!'
Person.sentiment('poo');
// => 'People do not like poo'
```

> Static functions you may recognize: `Object.create`, `Object.assign`, `Array.from`

Avoid using the `this` keyword inside of static functions.  It will refer to the class itself, not any instance.  This can be a little confusing.

## Why we learned the basics first

ES6 classes are pretty cool.  So why did we learn the traditional pattern first?

* ES6 does not have the same support ES5 does
* Most JS libraries are *not* written in ES6 classes (for the reason above)
  * [jQuery](http://code.jquery.com/jquery-3.2.1.js), [underscore](https://github.com/jashkenas/underscore/blob/master/underscore.js), etc.
* Without understanding prototypes, ES6 classes are just "magic"
* We enjoy making you suffer
* Understanding where functions live is helpful for writing good/efficient code and debugging
* In the industry some teams use traditional styles, some use ES6 classes. You gotta know both

## Mini-mini-lesson: [Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)

ES6 also introduced a nice way of "spreading" arrays.  It can be used to spread out function arguments or spread out an array into another.

```javascript
var arr = [3, 4, 5];

someFunc(...arr);
// => someFunc(3, 4, 5)
// different than someFunc([3, 4, 5])

[1, 2, ...arr, 6, 7];
// => [1, 2, 3, 4, 5, 6, 7]
// different than [1, 2, [3, 4, 5], 6, 7]
```


## Lab

[Do it](https://git.generalassemb.ly/wdi-nyc-delorean/LAB_U03_D01_ES6-Classes)

## Resources

* [MDN `class` docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
* [What's new with ES6](https://medium.com/front-end-hacking/es6-vs-es5-9254f8390332)
* `Prototype`/`Constructor` [lecture](https://git.generalassemb.ly/wdi-nyc-delorean/LECTURE_U01_D08-prototype-inheritance) and [lab](https://git.generalassemb.ly/wdi-nyc-delorean/LAB_U01_D08-prototype-inheritance)
* [`get`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) and [`set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)

## Conclusion
- What are some differences to ES6 classes versus the patterns we have previously seen?
- What are getters and setters? How can we get around using them?
- What type of object is `arguments`? How can we use it?
- What is the difference between static methods and instance methods?
