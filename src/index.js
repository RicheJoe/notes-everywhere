import "./index.css";
import creatTitle from "./module";
import logo from "../public/北极熊.png";

const title = creatTitle();
document.body.appendChild(title);

const img = new Image();
img.src = logo;
document.body.appendChild(img);
let res222 = [1, 2, 3, 4].reduce((a, b) => a + b);
console.log("res222", res222);
