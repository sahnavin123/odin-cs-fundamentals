const merge = (array, leftIndex, middleIndex, rightIndex) => {
  let leftMostSize = middleIndex - leftIndex + 1; // this is the length upto left to middle value
  let rightMostSize = rightIndex - middleIndex; // this is the length upto middle to right most value

  let leftArray = new Array(leftMostSize); // this array will contain values from left to mid
  let rightArray = new Array(rightMostSize); // this array will contain values from mid to right

  for (let i = 0; i < leftMostSize; i++) {
    leftArray[i] = array[leftIndex + i];
  }

  for (let j = 0; j < rightMostSize; j++) {
    rightArray[j] = array[middleIndex + 1 + j];
  }

  let ptr1 = 0;
  let ptr2 = 0;

  let currentIndex = leftIndex;
  while (ptr1 < leftMostSize && ptr2 < rightMostSize) {
    if (leftArray[ptr1] <= rightArray[ptr2]) {
      array[currentIndex] = leftArray[ptr1];
      ptr1++;
    } else {
      array[currentIndex] = rightArray[ptr2];
      ptr2++;
    }
    currentIndex++;
  }

  while (ptr1 < leftMostSize) {
    array[currentIndex] = leftArray[ptr1];
    ptr1++;
    currentIndex++;
  }

  while (ptr2 < rightMostSize) {
    array[currentIndex] = rightArray[ptr2];
    ptr2++;
    currentIndex++;
  }
};

const mergeSort = (array, leftIndex, rightIndex) => {
  if (leftIndex >= rightIndex) return;

  let middleIndex = leftIndex + parseInt((rightIndex - leftIndex) / 2);
  mergeSort(array, leftIndex, middleIndex);
  mergeSort(array, middleIndex + 1, rightIndex);
  merge(array, leftIndex, middleIndex, rightIndex);
};

const printArray = (array, size) => {
  console.log(array); //5 6 7 11 12 13
};

let array = [12, 11, 13, 5, 6, 7];
let array_size = array.length;

console.log("Given array is");
printArray(array, array_size);

mergeSort(array, 0, array_size - 1);

console.log("sorted arr is");
printArray(array, array_size);
