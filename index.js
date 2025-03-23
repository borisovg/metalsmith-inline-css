"use strict";

/**
 * Metalsmith plugin to inline CSS files
 *
 * @author George Borisov <git@gir.me.uk>
 * @copyright George Borisov 2017
 * @license LGPL-3.0
 */

const debug = require("debug");

const debugMain = debug("metalsmith-inline-css:main");
const debugParser = debug("metalsmith-inline-css:parser");

const linkRe = new RegExp(
  /<link rel="?stylesheet"? href="?\/?([\S]+\.css)"? inline>/
);

function parse(file, cssFiles) {
  let html = file.data.contents.toString();
  let idx = 0;
  let match = html.match(linkRe);
  let cssFile, changed;

  while (match) {
    cssFile = cssFiles[match[1]];
    debugParser("match: %s => %s", match[0], match[1]);

    if (cssFile) {
      html = html.replace(
        match[0],
        "<style>" + cssFile.contents.toString() + "</style>"
      );
      debugParser("%s <= %s", file.name, match[1]);
      changed = true;
    } else {
      debugParser("%s not found, wanted by %s", match[1], file.name);
      idx += match.index + match[0].length;
    }

    match = html.substr(idx).match(linkRe);
  }

  if (changed) {
    file.data.contents = new Buffer.from(html);
  }
}

function plugin() {
  return function (files, metalsmith, done) {
    const cssFiles = {};
    const cssRe = new RegExp(".css$");
    const htmlFiles = [];
    const htmlRe = new RegExp(".html$");
    let i, name;

    for (name in files) {
      /* istanbul ignore else*/
      if (files.hasOwnProperty(name)) {
        if (name.match(htmlRe)) {
          htmlFiles.push({ name: name, data: files[name] });
        } else if (name.match(cssRe)) {
          cssFiles[name] = files[name];
        }
      }
    }

    debugMain("available CSS files: %O", Object.keys(cssFiles));
    debugMain("parse start");

    for (i = 0; i < htmlFiles.length; i += 1) {
      parse(htmlFiles[i], cssFiles);
    }

    debugMain("parse end");

    done();
  };
}

module.exports = plugin;
