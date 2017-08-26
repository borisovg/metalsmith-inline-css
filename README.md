# metalsmith-inline-css

This is a [Metalsmith](http://www.metalsmith.io/) plugin to inline CSS files.
It is compatible with CSS preprocessor plugins (e.g. [metalsmith-sass](https://github.com/stevenschobert/metalsmith-sass)).

## Usage

Install the package:
```
npm install metalsmith-inline-css
```

Add the plugin to your Metalsmith build chain:
```
var metalsmith = require('metalsmith');
var inlineCss = require('metalsmith-inline-css');

metalsmith(__dirname)
    .source('./src')
    .destination('./public')
    .use(inlineCss());
    .build(function (err) {
        if (err) {
            throw err;
        }

        console.log('Build complete');
    });
```

This plugin avoids the complexity of parsing the HTML tree by instead using simple RegEx search and replace.

The downside is that you must format your `<link>` tag in one of the following two ways, or the plugin will not inline your CSS file:
```
<link rel="stylesheet" href="css/style.css" inline>
- OR -
<link rel=stylesheet href=css/style.css inline>
```

(Replace `style.css` with the name of your CSS file.)

## Example

To build the example page run:

```
make example
```

Inspect files in `example/` for more information.

## Debug Logging

Set the `DEBUG` variable to see what the plugin is doing.
```
DEBUG=metalsmith-inline-css:* node build.js
```
