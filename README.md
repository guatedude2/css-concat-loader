# css-concat-loader
This webpack loader concatenates CSS files into a single file. 

## What's the difference between just usin css-loader?
This loader does concatenation without parsing, so you can combine CSS, Less, Sass or any other @imports you might want to use.

## Usage

Adds support for multiple file extensions.

```javascript
module.exports = {
  module: {
    {
      test: /\.css$/,
      loader: 'style!css-concat')
    }]
  },
  cssConcat: {
    extensions: ['.css', '.less']
  }
}
```

