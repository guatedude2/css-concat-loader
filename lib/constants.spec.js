const constants = require('./constants');

const {
  URL_REGEX,
  IMPORT_REGEX,
} = constants;

describe('constants', () => {
  describe('IMPORT_REGEX', () => {
    it('should match an import with single quotes', () => {
      const less = `@import 'foo-bar';`
      expect(IMPORT_REGEX().test(less)).toBe(true);
    });

    it('should match an import with double quotes', () => {
      const less = `@import "foo-bar";`
      expect(IMPORT_REGEX().test(less)).toBe(true);
    });
  });

  describe('URL_REGEX', () => {
    it('should match a url with single quotes', () => {
      const less = `background: url('http://google.com/jeff.gif');`
      expect(URL_REGEX().test(less)).toBe(true);
      expect(URL_REGEX().exec(less)[2]).toBe('http://google.com/jeff.gif');
    });

    it('should match a url with double quotes', () => {
      const less = `background: url("http://google.com/jeff.gif");`
      expect(URL_REGEX().test(less)).toBe(true);
      expect(URL_REGEX().exec(less)[2]).toBe('http://google.com/jeff.gif');
    });

    it('should match a url with relative paths', () => {
      const less = `background: url('../../foo');`
      expect(URL_REGEX().test(less)).toBe(true);
      expect(URL_REGEX().exec(less)[2]).toBe('../../foo');
    });

    it('should url with lots of whitespace', () => {
      const less = `background: url   (  'http://google.com/jeff.gif'  );`
      expect(URL_REGEX().test(less)).toBe(true);
      expect(URL_REGEX().exec(less)[2]).toBe('http://google.com/jeff.gif');
    });

    it('should not match data uri', () => {
      const less = `background: url('data:image/gif;base64;LKSJDF');`
      expect(URL_REGEX().test(less)).toBe(false);
    });

    it('should not match data uri with spaces', () => {
      const less = `background: url('   data:image/gif;base64;LKSJDF');`
      expect(URL_REGEX().test(less)).toBe(false);
    });

    it('should not match url variables', () => {
      const less = `background-image: url(@logo);`;
      expect(URL_REGEX().test(less)).toBe(false);
    });
  });
});

