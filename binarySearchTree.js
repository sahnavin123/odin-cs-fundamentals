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

    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  };

  insertNode = (node, newNode) => {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  };

  delete = (value) => {
    this.root = this.deleteNode(this.root, value);
  };

  deleteNode = (node, value) => {
    if (!node) {
      return null;
    }

    if (value < node.data) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteNode(node.right, value);
    } else {
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }

      const minNode = this.findMinNode(node.right);
      node.data = minNode.data;
      node.right = this.deleteNode(node.right, minNode.data);
    }

    return node;
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

    if (this.root) {
      queue.push(this.root);
    }

    while (queue.length > 0) {
      const node = queue.shift();

      result.push(node.data);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }

    return result;
  };

  inorder = () => {
    const result = [];

    const traverse = (node) => {
      if (node.left) {
        traverse(node.left);
      }

      result.push(node.data);

      if (node.right) {
        traverse(node.right);
      }
    };

    traverse(this.root);

    return result;
  };

  preorder = () => {
    const result = [];

    const traverse = (node) => {
      result.push(node.data);

      if (node.left) {
        traverse(node.left);
      }

      if (node.right) {
        traverse(node.right);
      }
    };

    traverse(this.root);

    return result;
  };

  postorder = () => {
    const result = [];

    const traverse = (node) => {
      if (node.left) {
        traverse(node.left);
      }

      if (node.right) {
        traverse(node.right);
      }

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
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
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
