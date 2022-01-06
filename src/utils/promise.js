// 手写  简单实现
// ============================
// ============================
class myPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = null;
    this.reason = null;

    let resolve = value => {
      if (this.state == "pending") {
        this.state = "fulfilled";
        this.value = value;
      }
    };
    let reject = reason => {
      if (this.state == "pending") {
        this.state = "rejected";
        this.reason = reason;
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state == "fulfilled") onFulfilled(this.value);
    if (this.state == "rejected") onRejected(this.reason);
  }
  catch(onRejected) {
    onRejected(this.reason);
  }
}
let p = new myPromise((resolve, reject) => {
  resolve("success");
});
p.then(
  res => console.log(res),
  err => console.log(err)
); //success

// 手写实现promise.all;
Promise.myAll = promises => {
  let results = [];
  let promisesCount = 0;
  let promisesLength = promises.length;

  return new Promise((resolve, reject) => {
    for (let i in promises) {
      Promise.resolve(promises[i]).then(
        //这里再套一层是为了防止传入的不是一个promise实例
        res => {
          promisesCount++;
          results[i] = res;
          if (promisesCount == promisesLength) resolve(results);
        },
        err => reject(err)
      );
    }
  });
};
//手写实现promise.race;
//思路  相比于all  race只要有一个promise状态改变就返回  所以不需要计数和判断
Promise.myRace = promises => {
  return new Promise((resolve, reject) => {
    for (let i in promises) {
      Promise.resolve(promises[i]).then(
        res => resolve(res),
        err => reject(err)
      );
    }
  });
};

let promise1 = Promise.resolve(1);
let promise2 = Promise.resolve(2);
let promise3 = Promise.resolve(3);

//手写实现promise.any
//思路 和all相反  有一个状态变为fulfilled就返回 resolve 都是rejected就reject
Promise.myAny = promises => {
  let promisesCount = 0;
  let promisesLength = promises.length;
  return new Promise((resolve, reject) => {
    for (let i in promises) {
      Promise.resolve(promises[i]).then(
        res => resolve(res),
        err => {
          promisesCount++;
          if (promisesCount == promisesLength)
            reject("All promises were rejected");
        }
      );
    }
  });
};

Promise.myAll([promise1, promise2, promise3]).then(res => console.log(res)); //[1,2,3]
Promise.myRace([promise1, promise2, promise3]).then(res => console.log(res)); //1
Promise.myAny([promise1, promise2, promise3]).then(res => console.log(res)); //1
