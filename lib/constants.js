module.exports = {
  // These are functions because technically regexes are stateful https://twitter.com/jondelamotte/status/836615739746344961
  URL_REGEX: () => /url\s*\(\s*(['"]?)((?!\s*(data:|@))[^"'\)]*)\1\s*\)/gi,
  IMPORT_REGEX: () => /^\s*@import\s+(\([^\)]+\)\s+)?(url\()?\s*("|')(.+)\s*("|')(\))?\s*;.*$/gm,
};
