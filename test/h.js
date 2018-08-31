const fs = require('fs');
const path = require('path');
const fileName = './btext.txt';
const cheerio = require('cheerio');

const text = fs.readFileSync(path.resolve(__dirname, fileName)).toString();
$ = cheerio.load(text);
exports.$ = $;

exports.iterate = (src, fn = console.log) => {
  src.each((i, ele) => {
    fn($(ele));
  });
};

const PageParser = require('../lib/bball-ref-page-parser');

exports.test = () => {
  new PageParser(text);
};
