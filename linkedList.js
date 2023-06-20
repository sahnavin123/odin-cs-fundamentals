class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append = (value) => {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }

    this.size++;
  };

  prepend = (value) => {
    const newNode = new Node(value);

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }

    this.size++;
  };

  at = (index) => {
    if (index < 0 || index >= this.size) {
      return null;
    }

    let currentNode = this.head;
    let currentIndex = 0;

    while (currentIndex < index) {
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    return currentNode;
  };

  pop = () => {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;
    let prevNode = null;

    while (currentNode.nextNode) {
      prevNode = currentNode;
      currentNode = currentNode.nextNode;
    }

    prevNode.nextNode = null;
    this.tail = prevNode;
    this.size--;

    return currentNode;
  };

  contains = (value) => {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }

    return false;
  };

  find = (value) => {
    let currentNode = this.head;
    let currentIndex = 0;

    while (currentNode) {
      if (currentNode.value === value) {
        return currentIndex;
      }
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    return null;
  };

  removeAt = (index) => {
    if (index < 0 || index >= this.size) {
      return null;
    }

    if (index === 0) {
      const removedNode = this.head;
      this.head = this.head.nextNode;

      if (!this.head) {
        this.tail = null;
      }

      this.size--;
      return removedNode;
    }

    let currentNode = this.head;
    let prevNode = null;
    let currentIndex = 0;

    while (currentIndex < index) {
      prevNode = currentNode;
      currentNode = currentNode.nextNode;
      currentIndex++;
    }

    prevNode.nextNode = currentNode.nextNode;

    if (index === this.size - 1) {
      this.tail = prevNode;
    }

    this.size--;

    return currentNode;
  };

  toString = () => {
    let currentNode = this.head;
    let result = "";

    while (currentNode) {
      result += `(${currentNode.value}) -> `;
      currentNode = currentNode.nextNode;
    }

    result += "null";

    return result;
  };
}

// Usage example:

const list = new LinkedList();
list.append(1);
list.append(2);
list.prepend(3);
list.append(4);
console.log(list.toString()); // Output: (3) -> (1) -> (2) -> (4) -> null

console.log(list.size); // Output: 4
console.log(list.head.value); // Output: 3
console.log(list.tail.value); // Output: 4

console.log(list.at(2).value); // Output: 2
