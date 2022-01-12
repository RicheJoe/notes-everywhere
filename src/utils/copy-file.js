//这是一个复制文件带相应目录得脚本
//使用方法  修改代码内文件路径和后缀
const path = require("path");
const fs = require("fs");
const copyFile = (sourcePath, targetPath) => {
  const sourceFile = fs.readdirSync(sourcePath, { withFileTypes: true });

  sourceFile.forEach(file => {
    const newSourcePath = path.resolve(sourcePath, file.name);
    const newTargetPath = path.resolve(targetPath, file.name);

    if (file.isDirectory()) {
      // isExist(newTargetPath);
      copyFile(newSourcePath, newTargetPath);
    }
    //删除文件名带_的文件
    // if (file.name.includes("_")) {
    //   fs.unlink(newSourcePath, err => {
    //     if (err) {
    //       console.log(err);
    //     }
    //     console.log("文件:" + newSourcePath + "删除成功！");
    //   });
    // }
    //复制文件  rename会移动文件
    if (file.name.endsWith(".pdf")) {
      console.log(file.name);
      let newPath = "D:/Project/webpack_demo/output/pdf/" + file.name;
      fs.rename(newSourcePath, newPath, err => {
        if (err) {
          console.log(err);
        }
      });
      // console.log(file.name, newSourcePath, newTargetPath);
      // 这个会复制文件  但是必须有相应的目录
      // fs.copyFileSync(newSourcePath, newTargetPath);
    }
  });
};
copyFile("D:/Project/webpack_demo/public", "");
