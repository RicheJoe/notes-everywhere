function yhsj(numRows) {
  if (numRows < 1) return false;
  let result = Array.from({ length: numRows }, v => []);
  result[0] = [1];
  for (let i = 1; i < numRows; i++) {
    for (let j = 0; j < i + 1; j++) {
      result[i][j] = (result[i - 1][j] || 0) + (result[i - 1][j - 1] || 0);
    }
  }
  return result;
}

console.log("楊輝三角:", yhsj(5));

function primes(num) {
  let res = Array.from({ length: num - 1 }).map((v, i) => i + 2);
  let sqrNum = Math.floor(Math.sqrt(num));
  let sqrArr = Array.from({ length: sqrNum - 1 }).map((v, i) => i + 2);
  sqrArr.forEach(a => {
    res = res.filter(b => b % a !== 0 || b === a);
  });
  console.log(`${num}以内素数:${res}`);
}
primes(10);

function maxProfit(arr) {
  let res = 0;
  let min = arr[0];
  arr.forEach(v => {
    if (v < min) min = v;
    if (v - min > res) res = v - min;
  });
  console.log('最大利润:',res);
  return res;
}
maxProfit([7, 1, 5, 3, 6, 4]);
