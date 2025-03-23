[![Tests](https://github.com/borisovg/metalsmith-inline-css/actions/workflows/tests.yaml/badge.svg)](https://github.com/borisovg/metalsmith-inline-css/actions/workflows/tests.yaml)
[![Coverage Status](https://img.shields.io/codecov/c/github/borisovg/metalsmith-inline-css/master.svg?style=flat-square)](https://codecov.io/gh/borisovg/metalsmith-inline-css/)

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
const metalsmith = require('metalsmith');
const inlineCss = require('metalsmith-inline-css');

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
<link rel="stylesheet" href="/css/style.css" inline>
- OR -
<link rel=stylesheet href=/css/style.css inline>
```

(Replace `/css/style.css` with the path to your CSS file relative to the output directory.)

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
