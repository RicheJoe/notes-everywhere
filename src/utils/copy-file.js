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
    if (file.name.includes("_")) {
      fs.unlink(newSourcePath, err => {
        if (err) {
          console.log(err);
        }
        console.log("文件:" + newSourcePath + "删除成功！");
      });
    }
    if (file.name.endsWith(".pdf")) {
      console.log(file.name);
      let newPath = "D:/Project/webpack_demo/output/pdf/" + file.name;
      fs.rename(newSourcePath, newPath, err => {
        if (err) {
          console.log(err);
        }
      });
      // console.log(file.name, newSourcePath, newTargetPath);
      // fs.copyFileSync(newSourcePath, newTargetPath);
    }
  });
};
copyFile("D:/Project/webpack_demo/public", "");
