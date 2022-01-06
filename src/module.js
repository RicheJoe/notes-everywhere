import "./module.css";
export default function creatTitle() {
  const element = document.createElement("h2");
  let res = [1, 2, 3, 4].reduce((a, b) => a + b);
  element.textContent = `来一杯啊???${res}`;
  element.addEventListener("click", () => {
    alert("被点击了2"); //点击注释 测试自己的插件是否生效
  });
  element.classList.add("title");

  return element;
}
