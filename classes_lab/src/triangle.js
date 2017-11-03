class Triangle extends Shape {
  constructor(a, b, c) {
    // a, b, and c are the three side lengths
    // all you need to do is call super with the right argument(s)
  }

  // https://en.wikipedia.org/wiki/Heron%27s_formula#Formulation
  static heronFormula (a, b, c) {
    var s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }

  get area () {
                                 // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
    return Triangle.heronFormula(...this.sideLengths);
  }
}
