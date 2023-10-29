class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(dataArray) {
    this.root = this.buildTree(dataArray);
  }

  buildTree = (dataArray) => {
    const sortedArray = Array.from(new Set(dataArray)).sort((a, b) => a - b);
    return this.constructBalancedBST(sortedArray, 0, sortedArray.length - 1);
  };

  constructBalancedBST = (sortedArray, start, end) => {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new Node(sortedArray[mid]);

    node.left = this.constructBalancedBST(sortedArray, start, mid - 1);
    node.right = this.constructBalancedBST(sortedArray, mid + 1, end);

    return node;
  };

  insert = (value) => {
    const newNode = new Node(value);

    this.root === null
      ? (this.root = newNode)
      : this.insertNode(this.root, newNode);
  };

  insertNode = (node, newNode) => {
    switch (true) {
      case newNode.data < node.data:
        !node.left
          ? (node.left = newNode)
          : this.insertNode(node.left, newNode);
        break;
      default:
        !node.right
          ? (node.right = newNode)
          : this.insertNode(node.right, newNode);
        break;
    }
  };

  find = (value) => {
    return this.findNode(this.root, value);
  };

  findNode = (node, value) => {
    if (!node) {
      return null;
    }

    if (value === node.data) {
      return node;
    } else if (value < node.data) {
      return this.findNode(node.left, value);
    } else {
      return this.findNode(node.right, value);
    }
  };

  levelOrder = () => {
    const result = [];
    const queue = [];

    this.root ? queue.push(this.root) : null;

    while (queue.length > 0) {
      const node = queue.shift();

      result.push(node.data);

      node.left ? queue.push(node.left) : null;
      node.right ? queue.push(node.right) : null;
    }

    return result;
  };

  inorder = () => {
    const result = [];

    const traverse = (node) => {
      node.left ? traverse(node.left) : null;

      result.push(node.data);

      node.right ? traverse(node.right) : null;
    };

    traverse(this.root);

    return result;
  };

  preorder = () => {
    const result = [];

    const traverse = (node) => {
      result.push(node.data);

      node.left ? traverse(node.left) : null;

      node.right ? traverse(node.right) : null;
    };

    traverse(this.root);

    return result;
  };

  postorder = () => {
    const result = [];

    const traverse = (node) => {
      node.left ? traverse(node.left) : null;

      node.right ? traverse(node.right) : null;

      result.push(node.data);
    };

    traverse(this.root);

    return result;
  };

  height = (node) => {
    if (!node) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  depth = (node) => {
    if (!node) {
      return 0;
    }

    if (node === this.root) {
      return 0;
    }

    return this.depth(node.parent) + 1;
  };

  isBalanced = () => {
    return this.checkBalanced(this.root);
  };

  checkBalanced = (node) => {
    if (!node) {
      return true;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    const heightDiff = Math.abs(leftHeight - rightHeight);

    if (heightDiff > 1) {
      return false;
    }

    return this.checkBalanced(node.left) && this.checkBalanced(node.right);
  };

  rebalance = () => {
    const values = this.inorder();
    this.root = this.buildTree(values);
  };
}

// Driver code
const getRandomNumbers = (count) => {
  const numbers = [];
  while (numbers.length < count) {
    const randomNumber = Math.floor(Math.random() * 100);
    !numbers.includes(randomNumber) ? numbers.push(randomNumber) : null;
  }
  return numbers;
};

const tree = new Tree(getRandomNumbers(10));
console.log("Is balanced:", tree.isBalanced());
console.log("Level order:", tree.levelOrder().join(" -> "));
console.log("Inorder:", tree.inorder().join(" -> "));
console.log("Preorder:", tree.preorder().join(" -> "));
console.log("Postorder:", tree.postorder().join(" -> "));

console.log("Adding numbers > 100 to unbalance the tree");
tree.insert(150);
tree.insert(110);
tree.insert(120);
tree.insert(130);
tree.insert(140);

console.log("Is balanced:", tree.isBalanced());
console.log("Level order:", tree.levelOrder().join(" -> "));
console.log("Inorder:", tree.inorder().join(" -> "));
console.log("Preorder:", tree.preorder().join(" -> "));
console.log("Postorder:", tree.postorder().join(" -> "));

console.log("Rebalancing the tree");
tree.rebalance();
console.log("Is balanced:", tree.isBalanced());
console.log("Level order:", tree.levelOrder().join(" -> "));
console.log("Inorder:", tree.inorder().join(" -> "));
console.log("Preorder:", tree.preorder().join(" -> "));
console.log("Postorder:", tree.postorder().join(" -> "));
