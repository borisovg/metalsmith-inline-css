/*jshint node:true, esversion:6*/
'use strict';

/**
* Metalsmith build file
*
* @author George Borisov <git@gir.me.uk>
*/

const debug = require('debug');
const htmlMinifier = require('metalsmith-html-minifier');
const layouts = require('@metalsmith/layouts');
const markdown = require('metalsmith-markdown-remarkable');
const metalsmith = require('metalsmith');
const sass = require('metalsmith-sass');

// in real life require('metalsmith-inline-css')
const inlineCss = require('../index.js');

const log = debug('metalsmith-inline-css:example');

log('Build started');

metalsmith(__dirname)
    .metadata({
        site: {
            name: 'Example Static Site'
        }
    })
    .source('./src')
    .destination('./public')
    .use(markdown('commonmark', {
        html: true
    }))
    .use(sass({
        outputStyle: 'compressed'
    }))
    .use(layouts())
    .use(inlineCss())
    .use(htmlMinifier())
    .build(function (err) {
        if (err) {
            log('Build failed: %O', err);

        } else {
            log('Build finished');
        }
    });
