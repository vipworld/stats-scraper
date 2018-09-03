const fs = require('fs');
const path = require('path');
const fileName = './btext.txt';
const nbacomFile = './nbacom.json';
const cheerio = require('cheerio');

const text = fs.readFileSync(path.resolve(__dirname, fileName)).toString();

const getFileText = (relPath) => {
  return fs.readFileSync(path.resolve(__dirname, relPath)).toString();
};

$ = cheerio.load(text);
exports.$ = $;

exports.iterate = (src, fn = console.log) => {
  src.each((i, ele) => {
    fn($(ele));
  });
};

const PageParser = require('../lib/bball-ref-page-parser');
const nba = require('../lib/nbacom.js');

const nbaText = getFileText(nbacomFile);
const nbaJS = JSON.parse(nbaText);

exports.test = () => {
  // new PageParser(text);
  console.log(nba.parseNbaData(nbaJS));
};
