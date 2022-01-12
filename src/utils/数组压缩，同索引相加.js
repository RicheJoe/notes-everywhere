let arr = [
  [1, 10, 100],
  [2, 20, 200, 99]
];
// 1
const unzipWith = (arr, fn) =>
  arr
    .reduce(
      (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
      Array.from({
        length: Math.max(...arr.map(x => x.length))
      }).map(x => [])
    )
    .map(val => fn(...val));

let res = unzipWith(arr, (...args) => args.reduce((acc, v) => acc + v, 0));
console.log("res1:", res); //res1: [ 3, 30, 300, 99 ]

// 2
const unzipWith2 = (arr, fn) =>
  arr
    .reduce(
      (acc, val) => {
        val.forEach((v, i) => acc[i].push(v));
        return acc;
      },
      Array.from({
        length: Math.max(...arr.map(x => x.length))
      }).map(x => [])
    )
    .map(val => fn(...val));
let res2 = unzipWith2(arr, (...args) => args.reduce((acc, v) => acc + v, 0));
console.log("res2:", res2); //res2: [ 3, 30, 300, 99 ]

// 3
let temp = Array.from({
  length: Math.max(...arr.map(x => x.length))
}).map(x => []);

arr.forEach(a => {
  a.forEach((v, i) => {
    temp[i].push(v);
  });
});
console.log(temp); //[ [ 1, 2 ], [ 10, 20 ], [ 100, 200 ] ,[ 99 ]]

//BUBBLE_SORT
const BUBBLE_SORT = arr => {
  console.time("bubble");
  let temp = [...arr];
  for (let i = 1; i < temp.length; i++) {
    for (let j = 0; j < temp.length - i; j++) {
      if (temp[j + 1] < temp[j]) {
        [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
      }
    }
  }
  console.timeEnd("bubble");
  return temp;
};
let bubble_res = BUBBLE_SORT([4, 2, 5, 6, 1, 3]);
console.log(bubble_res); //[ 1, 2, 3, 4, 5, 6 ]

//QUICK_SORT 普通循环
const QUICK_SORT = arr => {
  console.time("quick");
  const a = [...arr];
  if (a.length < 2) return a;
  let pivotIndex = Math.floor(a.length / 2);
  let pivot = a[pivotIndex];
  let arr1 = [],
    arr2 = [];
  a.forEach(val => {
    if (val < pivot) {
      // if (val < pivot || (val === pivot && i != pivotIndex))  重复的数据  不然会丢失
      arr1.push(val);
    } else if (val > pivot) {
      arr2.push(val);
    }
  });
  console.timeEnd("quick");
  return [...QUICK_SORT(arr1), pivot, ...QUICK_SORT(arr2)];
};
let quick_res = QUICK_SORT([4, 2, 9, 5, 6, 1, 3]);
console.log(quick_res);

// quickSort   reduce 不好理解
const quickSort = arr => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

//reduce使用 计算数组中每个元素出现的次数
let names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];
const countName = names.reduce((pre, cur) => {
  if (pre[cur]) {
    pre[cur]++;
  } else {
    pre[cur] = 1;
  }
  return pre;
}, {});
console.log(countName);
//按属性对object分类
let people = [
  { name: "Alice", age: 21 },
  { name: "Max", age: 20 },
  { name: "Jane", age: 20 }
];
// {
//   '20': [ { name: 'Max', age: 20 }, { name: 'Jane', age: 20 } ],
//   '21': [ { name: 'Alice', age: 21 } ]
// }
function growBy(objectArray, key) {
  return objectArray.reduce((pre, cur) => {
    if (!pre[cur[key]]) {
      pre[cur[key]] = [];
    }
    pre[cur[key]].push(cur);
    return pre;
  }, {});
}

console.log(growBy(people, "age"));

// reduce 按顺序运行Promise
function runPromiseInSequence(arr, input) {
  return arr.reduce(
    (promiseChain, currentFunction) => promiseChain.then(currentFunction),
    Promise.resolve(input)
  );
}

// promise function 1
function p1(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 5);
  });
}

// promise function 2
function p2(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 2);
  });
}

// function 3  - will be wrapped in a resolved promise by .then()
function f3(a) {
  return a * 3;
}

// promise function 4
function p4(a) {
  return new Promise((resolve, reject) => {
    resolve(a * 4);
  });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(res => {
  console.log(res);
}); // 1200

// 如果华陀再世
// 崇洋都被医治
// 外邦来学汉字
// 激发我民族意识
// 马钱子 决明子
// 苍耳子 还有莲子
// 黄药子 苦豆子
// 川楝子 我要面子
// 用我的方式
// 改写一部历史
// 没什么别的事
// 跟着我念几个字
// 山药 当归 枸杞
// Go
// 山药 当归 枸杞
// Go
// 看我抓一把中药
// 服下一帖骄傲

const square = v => v * v;
const double = v => v * 2;
const addOne = v => v + 1;

const res = pipe(square, double, addOne);
res(3); // 19;

// 实现 pipe

function pipe() {
  const args = Array.from(arguments);
  const n = args.length;

  return function (num) {
    if (!n) return null;
    return args.reduce((prev, cur) => cur(prev), num);
  };
}
