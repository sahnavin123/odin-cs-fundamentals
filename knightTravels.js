// This code implements a function called knightMoves that calculates the shortest path for a
//knight to move from a given start position to a target end position on a chessboard.

// The function uses a breadth-first search algorithm to explore all possible moves of the
//knight until it reaches the target position or exhausts all possible moves. It keeps track of
//visited squares, stores the parent square of each visited square to reconstruct the path, and uses a queue to efficiently explore the squares.

// The code takes into account the knight's movement rules and checks the validity of each move,
//ensuring that the next square is within the boundaries of the chessboard and has not been visited before.

// If a valid path is found, the function prints the path length and the squares in the path.
//If no path is found, it displays a "No path found!" message.

const knightMoves = (start, end) => {
  // Define the possible moves a knight can make
  const moves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  // Creating a queue to store the squares to visit
  const queue = [start];

  // Creating a set to keep track of visited squares
  const visited = new Set();
  visited.add(start.toString());

  // Creating an object to store the parent square of each visited square
  const parents = {};

  // breadth-first search
  while (queue.length > 0) {
    const square = queue.shift();

    if (square[0] === end[0] && square[1] === end[1]) {
      const path = [end];
      let parent = parents[end.toString()];

      while (parent) {
        path.unshift(parent); // Insert the parent square at the beginning of the path array
        parent = parents[parent.toString()];
      }

      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach((square) => console.log(square));
      return path;
    }

    for (const move of moves) {
      const nextSquare = [square[0] + move[0], square[1] + move[1]];

      // Check if the next square is within the board boundaries and not visited
      if (
        nextSquare[0] >= 0 &&
        nextSquare[0] < 8 &&
        nextSquare[1] >= 0 &&
        nextSquare[1] < 8 &&
        !visited.has(nextSquare.toString())
      ) {
        queue.push(nextSquare);
        visited.add(nextSquare.toString());
        parents[nextSquare.toString()] = square;
      }
    }
  }

  // if no path found
  console.log("No path found!");
  return [];
};

// Test cases
knightMoves([0, 0], [1, 2]); // Output: [[0, 0], [1, 2]]
knightMoves([0, 0], [3, 3]); // Output: [[0, 0], [1, 2], [3, 3]]
knightMoves([3, 3], [0, 0]); // Output: [[3, 3], [1, 2], [0, 0]]
