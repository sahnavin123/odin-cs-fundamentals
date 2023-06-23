let number = 8;
const fib = (n) => {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
};

const recursiveFib = (n) => {
  if (n <= 0) {
    return;
  }
  const fibArr = [];
  for (let i = 1; i <= n; i++) {
    fibArr.push(fib(i - 1));
  }

  return fibArr;
};

console.log(recursiveFib(number)); //[0, 1, 1,  2, 3, 5, 8, 13]
