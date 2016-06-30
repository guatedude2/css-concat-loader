var loaderUtils = require('loader-utils');
var path = require('path');

var parseImports = require('./lib/parse-imports');

module.exports = function(content) {
  var callback = this.async();
  this.cacheable && this.cacheable();
  this.value = content;

  var config = Object.assign({
    extensions: ['.css'],
    resolveUrls: true
  }, loaderUtils.getLoaderConfig(this, 'cssConcat'));

  var url = loaderUtils.interpolateName(this, '[path][name].[ext]', {
    context: this.context,
    content: content
  });
  try {
    var result = parseImports(path.join(this.context, url), content, config);
    callback(null, "module.exports = " + JSON.stringify(result));
  } catch (err) {
    callback(err);
  }

};
