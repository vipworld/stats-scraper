const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const getFileText = (relPath) => {
  return fs.readFileSync(path.resolve(__dirname, relPath)).toString();
};

exports.iterate = (src, fn = console.log) => {
  src.each((i, ele) => {
    fn($(ele));
  });
};

const PageParser = require('../lib/bball-ref-page-parser');
const nba = require('../lib/nbacom.js');


exports.testBballRef = () => {
  const fileName = './btext.txt';
  const text = getFileText(fileName);
  const $ = cheerio.load(text);
  const parser = new PageParser($);
  console.log(parser.getStats());
};

exports.test = () => {
  const nbacomFile = './nbacom.json';
  const nbaText = getFileText(nbacomFile);
  const nbaJS = JSON.parse(nbaText);
  console.log(nba.parseNbaData(nbaJS));
};
