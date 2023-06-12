const merge = (arr, l, mid, r) => {
  let n1 = mid - l + 1;
  let n2 = r - mid;

  let L = new Array(n1);
  let R = new Array(n2);

  for (let i = 0; i < n1; i++) {
    L[i] = arr[l + i];
  }

  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
  }

  let i = 0;
  let j = 0;

  let k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
};

const mergeSort = (arr, l, r) => {
  if (l >= r) return;

  let mid = l + parseInt((r - l) / 2);
  mergeSort(arr, l, mid);
  mergeSort(arr, mid + 1, r);
  merge(arr, l, mid, r);
};

const printArray = (arr, size) => {
  for (let i = 0; i < size; i++) {
    console.log(arr[i], " "); //5 6 7 11 12 13
  }
};

let arr = [12, 11, 13, 5, 6, 7];
let arr_size = arr.length;

console.log("Given array is");
printArray(arr, arr_size);

mergeSort(arr, 0, arr_size - 1);

console.log("sorted arr is");
printArray(arr, arr_size);
