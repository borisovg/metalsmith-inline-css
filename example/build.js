/*jshint node:true, esversion:6*/
"use strict";

/**
 * Metalsmith build file
 *
 * @author George Borisov <git@gir.me.uk>
 */

const debug = require("debug");
const inPlace = require("@metalsmith/in-place");
const layouts = require("@metalsmith/layouts");
const metalsmith = require("metalsmith");
const sass = require("@metalsmith/sass");

// in real life require('metalsmith-inline-css')
const inlineCss = require("../index.js");

const log = debug("metalsmith-inline-css:example");

log("Build started");

metalsmith(__dirname)
  .env("DEBUG", "metalsmith-inline-css:*")
  .metadata({
    site: {
      name: "Example Static Site",
    },
  })
  .source("./src")
  .destination("./public")
  .use(
    inPlace({
      extname: ".pug",
      transform: "markdown-it",
      engineOptions: {
        html: true,
      },
    })
  )
  .use(
    layouts({
      transform: "pug",
    })
  )
  .use(
    sass({
      outputStyle: "compressed",
    })
  )
  .use(inlineCss())
  .build(function (err) {
    if (err) {
      log("Build failed: %O", err);
    } else {
      log("Build finished");
    }
  });
