const fibonacci = (n) => {
  const fibArr = [0, 1];

  for (let i = 2; i < n; i++) {
    const nextFib = fibArr[i - 1] + fibArr[i - 2];
    fibArr.push(nextFib);
  }

  return fibArr;
};

const number = 8;
console.log(fibonacci(number)); // [0, 1, 1, 2, 3, 5, 8, 13]
