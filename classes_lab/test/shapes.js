var expect = chai.expect;

describe('Shape', function () {
  var shape;

  beforeEach(function () {
    shape = new Shape([2, 3, 3, 4, 5]);
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(Shape).to.be.a('function');
    });

    it('can be constructed', function () {
      expect(shape).to.be.an.instanceof(Shape);
    });
  });

  describe('sideLengths', function () {
    it('is the length of every side', function () {
      expect(shape.sideLengths).to.have.members([2, 3, 3, 4, 5]);
    });
  });

  describe('getPerimeter', function () {
    it('is the sum of every side', function () {
      // 2 + 3 + 3 + 4 + 5
      expect(shape.getPerimeter()).to.eq(17);
    });
  });
});

describe('Triangle', function () {
  var tri;

  beforeEach(function () {
    tri = new Triangle(3, 4, 5);
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(Triangle).to.be.a('function');
    });

    it('inherits from Shape', function () {
      expect(tri).to.be.an.instanceof(Shape);
      expect(tri).to.be.an.instanceof(Triangle);
    });
  });

  describe('sideLengths', function () {
    it('is the length of every side', function () {
      expect(tri.sideLengths).to.have.members([3, 4, 5]);
    });
  });

  describe('getPerimeter', function () {
    it('is the sum of every side', function () {
      // 3 + 4 + 5
      expect(tri.getPerimeter()).to.eq(12);
    });
  });

  describe('area', function () {
    it('has a getter for the area', function () {
      // formula given
      expect(tri.area).to.eq(6);
    });
  });

  describe('heronFormula', function () {
    it("has a static function for heron's formula", function () {
      expect(Triangle.heronFormula(5, 12, 13)).to.eq(30);
    });
  });
});

describe('Rectangle', function () {
  var rect;

  beforeEach(function () {
    rect = new Rectangle(5, 7);
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(Rectangle).to.be.a('function');
    });

    it('inherits from Shape', function () {
      expect(rect).to.be.an.instanceof(Shape);
      expect(rect).to.be.an.instanceof(Rectangle);
    });

    it('can be constructed with a width and height', function () {
      expect(rect.width).to.eq(5);
      expect(rect.height).to.eq(7);
    });
  });

  describe('sideLengths', function () {
    it('is the length of every side', function () {
      expect(rect.sideLengths).to.have.members([5, 7, 5, 7]);
    });
  });

  describe('getPerimeter', function () {
    it('is the sum of every side', function () {
      // 5 + 5 + 7 + 7
      expect(rect.getPerimeter()).to.eq(24);
    });
  });

  describe('area', function () {
    it('has a getter for the area', function () {
      // 5 * 7
      expect(rect.area).to.eq(35);
    });
  });
});

describe('Square', function () {
  var square;

  beforeEach(function () {
    square = new Square(6);
  });

  describe('constructor', function () {
    it('is defined', function () {
      expect(Square).to.be.a('function');
    });

    it('inherits from Rectangle', function () {
      expect(square).to.be.an.instanceof(Shape);
      expect(square).to.be.an.instanceof(Rectangle);
      expect(square).to.be.an.instanceof(Square);
    });

    it('can be constructed with just one sideLength', function () {
      expect(square.width).to.eq(6);
      expect(square.height).to.eq(6);
    });
  });

  describe('sideLengths', function () {
    it('is the length of every side', function () {
      expect(square.sideLengths).to.have.members([6, 6, 6, 6]);
    });
  });

  describe('getPerimeter', function () {
    it('is the sum of every side', function () {
      // 6 + 6 + 6 + 6
      expect(square.getPerimeter()).to.eq(24);
    });
  });

  describe('area', function () {
    it('has a getter for the area', function () {
      // 5 * 7
      expect(square.area).to.eq(36);
    });
  });
});
