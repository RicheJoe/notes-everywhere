const marked = require("marked");
module.exports = source => {
  return marked.parse(source);
};
