function myFlat(arr) {
  let res = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      res = res.concat(myFlat(item));
    } else {
      res.push(item);
    }
  });
  return res;
}

let arr = [1, [3, 9, [0, 1]], 5, 66, [0]];

myFlat(arr);

function myFlat_one(arr) {
  return arr.reduce((pre, cur) => pre.concat(cur), []);
}
myFlat_one(arr);

function myFlat_Infinity(arr) {
  return arr.reduce(
    (pre, cur) => pre.concat(Array.isArray(cur) ? myFlat_Infinity(cur) : cur),
    []
  );
}
myFlat_Infinity(arr);

/**
 *   实现真正的flat  可传入参数控制扁平层数  默认 1
 */
function true_flat(arr, num = 1) {
  if (num)
    return arr.reduce(
      (pre, cur) =>
        pre.concat(Array.isArray(cur) ? true_flat(cur, num - 1) : cur),
      []
    );
  else return arr;
}
true_flat(arr);
true_flat(arr, Infinity);
