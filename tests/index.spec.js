/*jshint mocha:true*/
'use strict';

/**
* Tests for index.js
*
* @author George Borisov <git@gir.me.uk>
* @copyright George Borisov 2017
* @license LGPL-3.0
*/

var expect = require('chai').expect;
var subject = require('../index.js');

describe('index.js', function () {
    var contents = {
        'css/style1.css': 'body { font-size: 12px; }',
        'css/style2.css': 'body { padding: 1em; }',

        // tests the two different types of link definition and multiple stylesheets
        'test1.html': '<link rel="stylesheet" href="/css/style1.css" inline><link rel=stylesheet href=/css/style2.css inline>',

        // tests multiple unavailable stylesheets
        'test2.html': '<link rel="stylesheet" href="/css/style3.css" inline><link rel="stylesheet" href="/css/style4.css" inline>',

        // tests that non-matching link definition is ignored
        'test3.html': '<link rel="stylesheet" href="/css/style1.css">'
    };
    var files = {
        // tests that non HTML / CSS file is ignored
        'foo.png': {}
    };
    var plugin = subject();
    var file;

    for (file in contents) {
        if (contents.hasOwnProperty(file)) {
            files[file] = {
                contents: new Buffer.from(contents[file]),
                path: file
            };
        }
    }

    it('return a function', function () {
        expect(typeof plugin).to.equal('function');
    });

    plugin(files, undefined, function () {
        it('inlines things that should be inlined', function () {
            expect(files['test1.html'].contents.toString()).to.equal('<style>' + contents['css/style1.css'] + '</style>' + '<style>' + contents['css/style2.css'] + '</style>');
        });

        it('does not inline things that should not be inlined', function () {
            expect(files['test2.html'].contents.toString()).to.equal(contents['test2.html']);
            expect(files['test3.html'].contents.toString()).to.equal(contents['test3.html']);
        });
    });
});
