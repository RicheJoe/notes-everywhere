// 普通的add函数
function add(x, y) {
  return x + y;
}

// Currying后
function curryingAdd(x) {
  return function (y) {
    return x + y;
  };
}

let add_res = add(1, 2); //3
let curryingAdd_res = curryingAdd(1)(2); //3

console.log("add_res:", add_res, "\n", "curryingAdd_res:", curryingAdd_res);

// 初步封装  2个参数
var currying2 = function (fn) {
  // args 获取第一个方法内的全部参数
  var args = [...arguments].splice(1);
  return function () {
    // 将后面方法里的全部参数和args进行合并
    var newArgs = [...args, ...arguments];
    // 把合并后的参数通过apply作为fn的参数并执行
    return fn.apply(this, newArgs);
  };
};
let currying2_res = currying2(add, 1)(2);
console.log("currying2:", currying2_res);

//最后再扩展一道经典面试题

// 实现一个add方法，使计算结果能够满足如下预期：
//add(1)(2)(3) = 6;
//add(1, 2, 3)(4) = 10;
//add(1)(2)(3)(4)(5) = 15;

function curry(fn) {
  // 保存预置参数
  const presetArgs = [].slice.call(arguments, 1);
  // 返回一个新函数
  function curried() {
    // 新函数调用时会继续传参
    const restArgs = [].slice.call(arguments);
    const allArgs = [...presetArgs, ...restArgs];
    return curry.call(null, fn, ...allArgs);
  }
  // 重写toString
  curried.toString = function () {
    return fn.apply(null, presetArgs);
  };
  return curried;
}
function curry2(fn) {
  const args = [...arguments].splice(1);
  function curried() {
    const _args = [...arguments];
    const allArgs = [...args, ..._args];
    return curry.call(fn, ...allArgs);
  }
  // 重写toString
  curried.toString = function () {
    return fn.apply(null, presetArgs);
  };
  return curried;
}
function dynamicAdd() {
  return [...arguments].reduce((prev, curr) => {
    return prev + curr;
  }, 0);
}
var add = curry(dynamicAdd);
// add(1)(2)(3)(4); // 10
// add(1, 2)(3, 4)(5, 6); // 21
console.log(Number(add(1)(2)(3)(4)));

function addAll() {
  let _args = [...arguments];
  let curry = function () {
    _args.push(...arguments);
    console.log(_args);
    return curry;
  };
  curry.toString = function () {
    console.log("++++++++++++++");
    return _args.reduce((a, b) => a + b);
  };
  console.log("===========");
  return curry;
}
console.log("addAll", Number(addAll(1)(2)(3)(4, 9)));
