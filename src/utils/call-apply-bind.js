Function.prototype.call_me = function (obj) {
  obj.fn = this;
  //arguments是类数组 不可用数组方法 可用索引
  let args = [...arguments].splice(1);
  obj.fn(...args);
  delete obj.fn;
};
Function.prototype.apply_me = function (obj) {
  obj.fn = this;
  let args = arguments[1];
  args ? obj.fn(...args) : obj.fn();
  delete obj.fn;
};
Function.prototype.bind_me = function (obj) {
  let _this = this;
  let args = [...arguments].splice(1);
  return function () {
    let _args = arguments;
    return _this.apply(obj, [...args, ..._args]);
  };
};

//测试
let obj1 = {
  name: "tom",
  age: 12,
  myFun: function (add, sss) {
    console.log(this.name + "年龄" + this.age + "住在" + add + "和" + sss);
  }
};
let obj2 = {
  name: "jerry",
  age: 9
};
obj1.myFun();
obj1.myFun.call(obj2, "dc", "call");
obj1.myFun.call_me(obj2, "dc", "call_me");
obj1.myFun.apply_me(obj2, ["dc", "apply_me"]);
obj1.myFun.bind(obj2)("dc", "bind");
obj1.myFun.bind_me(obj2, "dc")("bind_me");
obj1.myFun.bind_me(obj2)("dc", "bind_me2");
obj1.myFun.bind_me(obj2)("dc", "bind_me2");
obj1.myFun.bind_me(obj2, "dc")("bind_me2");
