class Node {
  constructor (val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor () {
    this.head = null;
  }

  length () {
    return this.toArray().length;
  }

  push(val) {
    var newNode = new Node(val);
    var cur = this.head;

    if(this.head) {
      this.tail().next = newNode;
    } else {
      this.head = newNode;
    }
  }

  pop() {
    var cur = this.head;
    var prev;

    if(!cur) { return null; }

    if(this.length() === 1) {
      this.head = null;
      return cur.val;
    }

    while(cur.next) {
      prev = cur;
      cur = cur.next;
    }

    prev.next = null;
    return cur.val;
  }

  forEach (callback) {
    this.map(callback);
  }

  map (callback) {
    var arr = [];
    var cur = this.head;

    while(cur) {
      arr.push(callback(cur.val));
      cur = cur.next;
    }

    return arr;
  }

  toArray () {
    return this.map((e) => e);
  }

  tail () {
    var cur = this.head;
    if (!cur) { return null; }

    while(cur.next) { cur = cur.next; }

    return cur;
  }
}

var l = new LinkedList();
l.push('a');
l.push('b');
l.push('c');
