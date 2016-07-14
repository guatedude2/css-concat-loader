var loaderUtils = require('loader-utils');
var path = require('path');

var parseImports = require('./lib/parse-imports');

module.exports = function(content) {
  var callback = this.async();
  this.cacheable && this.cacheable();
  this.value = content;

  var config = Object.assign({
    extensions: ['.css'],
    resolveUrls: true,
    context: this.context
  }, loaderUtils.getLoaderConfig(this, 'cssConcat'));

  var url = loaderUtils.interpolateName(this, '[path][name].[ext]', {
    context: this.context,
    content: content
  });
  try {
    var result = parseImports(path.join(this.context, url), content, config);
    var cssAsString = JSON.stringify(result.css);
    cssAsString = cssAsString.replace(/___CSS_LOADER_URL___([0-9]+)___/g, function (match, id) {
      return 'url(\\"" + require("' + result.urls[id] + '") + "\\")';
    });
    callback(null, "module.exports = " + cssAsString);
  } catch (err) {
    callback(err);
  }

};
