### Mini-Lesson: `arguments` keyword

The [`arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) keyword can be referenced inside functions.  It is an array-_like_ object containing each argument passed into the function.  It has a `length` property referring to the number of arguments given.

`arguments` **cannot** be used inside of arrow functions.

```javascript
var foo = function () {
  console.log(`length: ${arguments.length}`);

  for(let i = 0; i < arguments.length; i++) {
    console.log(`argument ${i}: ${arguments[i]}`)
  }
};

foo('stacey', 'tracey');
// length: 2
// argument 0: stacey
// argument 1: tracey
```

In the above example, `arguments` looks like `{0: 'stacey', 1: 'tracey', length: 2}`


Remember, `arguments` is an object, not an array, which means we cannot call array methods on it. (e.g there is no `arguments.forEach`).  If you _need_ an array out of the `arguments`, MDN has a couple suggestions:

```javascript
function () {
  var args = Array.prototype.slice.call(arguments);

  // OR
  var args = [].slice.call(arguments);

  // OR
  var args = Array.from(arguments);
}
```
`arguments` is _not_ new to ES6 (you just may have not seen it yet) so you an use it outside of ES6.

> As an alternative to `arguments` you may also use [rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) which _is_ new to ES6.
