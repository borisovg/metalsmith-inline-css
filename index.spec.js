/*jshint mocha:true*/
"use strict";

/**
 * Tests for index.js
 *
 * @author George Borisov <git@gir.me.uk>
 * @copyright George Borisov 2017
 * @license LGPL-3.0
 */

const { strictEqual } = require("assert");
const subject = require("./index.js");

describe("index.js", function () {
  const contents = {
    "css/style1.css": "body { font-size: 12px; }",
    "css/style2.css": "body { padding: 1em; }",

    // tests the two different types of link definition and multiple stylesheets
    "test1.html":
      '<link rel="stylesheet" href="/css/style1.css" inline><link rel=stylesheet href=/css/style2.css inline>',

    // tests multiple unavailable stylesheets
    "test2.html":
      '<link rel="stylesheet" href="/css/style3.css" inline><link rel="stylesheet" href="/css/style4.css" inline>',

    // tests that non-matching link definition is ignored
    "test3.html": '<link rel="stylesheet" href="/css/style1.css">',
  };
  const files = {
    // tests that non HTML / CSS file is ignored
    "foo.png": {},
  };
  const plugin = subject();
  let file;

  Object.keys(contents).forEach((file) => {
    files[file] = {
      contents: new Buffer.from(contents[file]),
      path: file,
    };
  });

  it("return a function", function () {
    strictEqual(typeof plugin, "function");
  });

  plugin(files, undefined, function () {
    it("inlines things that should be inlined", function () {
      strictEqual(
        files["test1.html"].contents.toString(),
        "<style>" +
          contents["css/style1.css"] +
          "</style>" +
          "<style>" +
          contents["css/style2.css"] +
          "</style>"
      );
    });

    it("does not inline things that should not be inlined", function () {
      strictEqual(
        files["test2.html"].contents.toString(),
        contents["test2.html"]
      );
      strictEqual(
        files["test3.html"].contents.toString(),
        contents["test3.html"]
      );
    });
  });
});
