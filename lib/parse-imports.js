var Promise = require('es6-promise').Promise;
var _ = require('lodash');
var path = require('path');
var fs = require('fs');

//TODO: add response of map file
module.exports = function (filename, content, config) {

  function readFile(filename) {
    try {
      return fs.readFileSync(filename, {'encoding': 'utf-8'});
    } catch (err) {
      return null;
    }
  }

  function findImportMatch(filename, source) {
    var match = true;
    var imports = [];
    var basePath = path.dirname(filename);
    var importRegExp = /^\s*@import\s+(\([^\)]+\)\s+)?(url\()?\s*("|')(.+)\s*("|')(\))?\s*;.*$/gm;

    while(match) {
      match = importRegExp.exec(source);

      if (match) {
        var importUrl = match[4];
        var importFile = path.resolve(basePath, importUrl)
        var optional = /optional/.test(match[1]);
        var found = false;
        var fileLookup = [];
        if (path.extname(importFile) !== '') {
          fileLookup.push(importFile);
        } else {
          fileLookup = _.map(config.extensions, function (ext) {
            return importFile + ext;
          });
        }

        for (var i = 0; i < fileLookup.length && !found; i++) {
          var content = readFile(fileLookup[i]);
          if (content !== null) {
            var output = findImportMatch(fileLookup[i], content);
            source = source.substr(0, match.index) + output + source.substr(match.index + match[0].length);
            importRegExp.lastIndex = match.index + output.length;
            found = true;
          }
        }

        if (!found && !optional) {
          throw new Error(importUrl + ' wasn\'t found in ' + filename + '. Tried - ' + fileLookup.join(', '));
        }
      }
    }
    return source;
  }

  return findImportMatch(filename, content);
};