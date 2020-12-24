# ES6 Classes  

![cell](cell.gif)

### Objectives
*After this lesson, students will be able to:*
- Create classes and subclasses with ES6
- Define and use getter and setter methods
- Define and use class methods
- Distinguish static methods from standard  methods

# ES6 Classes

[ES6 Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) are the new school way of writing `constructors` and methods on a `prototype`. JavaScript runs on prototypal inheritance, as opposed to class inheritance, but this syntactic sugar allows us to create class-like structures for OOP in JavaScript, as well as to bridge the gap from languages such as C++ and Java. Let's see how this works.


### ES6

```javascript
class Person {

  // define the constructor function
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // define any instance method
  sayHiTo(other) {
    console.log(`Hi ${other.firstName}, I am ${this.firstName}`);
  }
}

// creating an instance of Person
const soleil = new Person('Soleil', 'Solomon');
```

### ES5

```javascript
// object properties / data attributes are conventionally
// declared and attached to the object in the constructor
var Person = function (firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
};

// member methods on the object are attached to the prototype object
// after defining a constructor
Person.prototype.sayHiTo = function (other) {
  console.log(`Hi ${other.firstName}, I am ${this.firstName}`);
};
```

What we see above is exactly equivalent. This is just nicer syntax introduced in ES6.

### Short Practice (10 min)
- Create a new file in your sandbox called `Person.js`.
- Copy and paste the above `Person` ES6 class into the file.
- Define two `Person` instances and make one `sayHiTo` the other.
- Bonus: define a `getFullName` method that prints out the `Person`'s full name to the console and then call it.

## Class Inheritance

### ES6

With ES6 this is super easy.  We simply use the [`extends`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) and [`super`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) keywords.

```javascript
// Programmer is inheriting from Person
class Programmer extends Person {
  constructor(firstName, lastName, options) {
    super(firstName, lastName);
    this.githubHandle = options.githubHandle;
    this.website = options.website;
  }

  getResume() {
    return `${this.firstName} ${this.lastName} \n Github: ${this.githubHandle} \n Website: ${this.website}`;
  }
}
```

### ES5

To create subclasses, however we've got our hands dirty. (A little less dirty when we use a helper function which wraps `Object.create`, an updated mechanism for generating new prototypes/objects.

```javascript
/**
 * Makes Subclass constructor a subclass of Superclass constructor
 * @param {Function} Subclass
 * @param {Function} Superclass
 * @return undefined
 */
window.inheritPrototype = function (Subclass, Superclass) {
  // set Subclass's prototype to a copy of Superclass's prototype
  Subclass.prototype = Object.create(Superclass.prototype);

  // set the constructor property to Subclass (otherwise it will be Superclass)
  Subclass.prototype.constructor = Subclass;
};

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

Notice we just call `super(firstName, lastName)` rather than `Person.call(this, firstName, lastName)`. Simple.

**Important**: You must call `super` before accessing the `this` keyword. (Or you will get a nice `ReferenceError`)


We can actually call `super` in any instance method.

```javascript
class Programmer extends Person {
  /// ...

  sayHiTo(other) {

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

### Short Practice: Pets
Create an `Pet` class, and copy this code into it:

```javascript
class Pet {
  constructor(name, legs) {
    this.name = name;
    this.legs = legs;
  }

  pitterPatter() {
    console.log(`Ah, the pitter patter of ${this.legs}-legged pets.`);
  }

  begForFood() {
    console.log(`${this.name} desires a snack.`);
  }
}
```

- Create two subclasses, which should extend the Pet class, one for `Dog`, and `Cat`. 
- The constructor should also have an additional property for the pet's `sound`.
- Create a `begForFood` method, which should call the superclass' `begForFood` method. For the dog, it should `console.log` that the dog is giving you puppy eyes. For the cat, it should `console.log` the cat's sound.
- BONUS: Make the cat not `console.log` its sound if its name is Mittens.

## Be careful with `extends`
In practice, you should be cautious about using `extends` and class inheritance in general.  Collective industry experience across multiple languages, problem domains, and platforms strongly suggests that deep class hierarchies yield rigid, fragile code that is quite difficult to understand and work with.  Conventional wisdom favors [object composition over inheritance](https://en.wikipedia.org/wiki/Composition_over_inheritance).

So when should `extends` be used?  Class inheritance turns out to be quite an effective semantic structure for interfacing with libraries and frameworks provided to you as a developer when building larger projects.  We need `extends` in order to leverage functionality built into several frameworks, e.g., `React`, seamlessly.  

As a rule of thumb, never fear `extends` when subclassing from a class or object explicitly provided by a framework, but think twice before extending classes you yourself have written.

## Lab
Navigate to the [JS Geometry](https://git.generalassemb.ly/sei-nyc-garnet/js-geometry) repo, and get hacking!

## Function.Prototype.bind()
From mdn:

> The bind() method creates a new function that, when called, has its this keyword set to the provided value, with a given sequence of arguments preceding any provided when the new function is called.

Consider the following example:

```javascript
class Person {
  constructor() {
    this.species = 'Human';
  }

  greet() {
    console.log(`Hey There, I'm a ${this.species}`);
  }
}

const drake = new Person();

drake.greet();
// => Hey There, I'm a Human

let humanGreeter = drake.greet; // note: this function is not being executed

// humanGreeter();
// => throws an error

humanGreeter = drake.greet.bind(drake);
// => Hey There, I'm a Human

class Dog {
  constructor() {
    this.species = 'Canine';
  }
}

const peggySue = new Dog();
const doggyGreeter = drake.greet.bind(peggySue);

doggyGreeter();
// => Hey There, I'm a Canine
```

`bind` becomes especially important when transferring behavior from a class method into a callback in a context where the class no longer available.

What would happen if we passed `drake.greet` as a callback without `bind`ing an object to it?

<details>
  <summary>Hungry for more? Getters, Setters, and Static Methods</summary>
  
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

const person = new Person('Marty', 'McFly');
person.fullName // => 'Marty McFly'
```

We just called a function without using parens!

Also, consider parsing a person's birthday in a getter!

```javascript
class Person {
  // ...

  get birthday() {
    // birthday here something akin to:
    // 2017-11-03 09:26:10.540739-04
    return new Date(this.birthday).toDateString();
  }
}
```

> NOTE: Getters should only be used for simple functions that can execute quickly. (In constant time)

### Setters

Setters give us a way of executing code while setting some attribute.  Setters take exactly 1 argument.

```javascript
class Person {
  // ...

  set fullName (val) {
    const names = val.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}

const person = new Person('Doc', 'Brown');
person.fullName // => 'Doc Brown'
person.fullName = 'Emmett Brown';
person.fullName // => 'Emmett Brown'
person.firstName // => 'Emmett'
person.lastName // => 'Brown'
```

Normally when we see `obj.foo = 'bar'` we think "Just setting the `foo` property on `obj` to `'bar'`.  But with setters a function is actually being called and there can be more logic going on.

### When should we use setters and getters?

Carefully.  Bugs around setters and getters can be very hard to track down, so take care when implementing complex parsing or business logic operations inside getters or setters.  On the other hand, they can be very helpful for exposing manageable chunks of complex data objects without complicating the underlying representation of the domain model.  That's a mouthful to say, but will make more sense when working with more complicated apps.


## Alternatives to getters and setters

As an alternative, we can also create regular functions with a `getFullName`/`setFullName` pattern.  Although, this pattern slightly obscures the underlying intent of expositing straightforward getter and setter methods.

```javascript
class Person {
  // ...

  getFullName () {
    return this.firstName + ' ' + this.lastName;
  }

  setFullName (val) {
    const names = val.split(' ');
    this.firstName = names[0];
    this.lastName = names[1];
  }
}
```

> NOTE: I am just smooshing `get fullName` into `getFullName` and `set fullName` into `setFullName`.


## Defining static functions

Static functions are those that live on the constructor, not the prototype or any instance.  They are used for things related to the class, but not any particular instance.


```javascript
class Person {
  /// ...

  static sentiment(thing) {
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
</details>

## Why we learned the basics first

ES6 classes are pretty cool.  So why did we learn the traditional pattern first?

* ES6 does not have the same support ES5 does
* Most JS libraries are *not* written in ES6 classes (for the reason above)
  * [jQuery](http://code.jquery.com/jquery-3.2.1.js), [underscore](https://github.com/jashkenas/underscore/blob/master/underscore.js), etc.
* Without understanding prototypes, ES6 classes are just "magic"
* Understanding where functions live is helpful for writing good/efficient code and debugging
* In the industry some teams use traditional styles, some use ES6 classes. You gotta know both

## Resources

* [MDN `class` docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
* [Prototypal Inheritance](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
* [What's new with ES6](https://medium.com/front-end-hacking/es6-vs-es5-9254f8390332)
* [`get`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) and [`set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set)

## Conclusion
- What are some differences to ES6 classes versus the patterns we have previously seen?
- What are getters and setters? How can we get around using them?
- What type of object is `arguments`? How can we use it?
- What is the difference between static methods and instance methods?
