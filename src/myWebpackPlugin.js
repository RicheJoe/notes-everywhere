module.exports = class myWebpackPlugin {
  apply(compiler) {
    console.log("我得webpack插件开始执行");

    compiler.hooks.emit.tap("myWebpackPlugin", compilation => {
      for (const name in compilation.assets) {
        if (name.endsWith(".js")) {
          const contents = compilation.assets[name].source();
          const widthoutComments = contents.replace(/\/\*\*+\*\//g, "");
          compilation.assets[name] = {
            source: () => widthoutComments,
            size: () => widthoutComments.length
          };
        }
      }
    });
  }
};
