const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { readJsonFile } = require('../lib/utils');

const getFileText = (relPath) => {
  return fs.readFileSync(path.resolve(__dirname, relPath)).toString();
};

exports.iterate = (src, fn = console.log) => {
  src.each((i, ele) => {
    fn($(ele));
  });
};

const PageParser = require('../lib/bball-ref-page-parser');
const nba = require('../lib/nbacom');

exports.testBballRef = () => {
  const fileName = './btext.txt';
  const text = getFileText(fileName);
  const $ = cheerio.load(text);
  const parser = new PageParser($);
  console.log(parser.getStats());
};

const { runLeague } = require('../lib/bball-ref');
exports.testLeaguePull = () => {
  runLeague((ret) => {
    // console.log(ret);
  });
};

exports.test = () => {
  const nbacomFile = './nbacom.json';
  const nbaText = getFileText(nbacomFile);
  const nbaJS = JSON.parse(nbaText);
  console.log(nba.parseNbaData(nbaJS));
};

const DATE_STR = '2018-09-27'; // update this
exports.testReadJson = async () => {
  const samplePath = `/data_output/${DATE_STR}/pbpstats.json`;
  const ret = await readJsonFile(samplePath);
  console.log(ret);
};

const merge = require('../lib/merge');
exports.testMerge = async () => {
  const mergeDir = `/data_output/${DATE_STR}/`;
  const merged = await merge.run(mergeDir);
  // console.log(merged);
};

const aggregateMerged = require('../lib/aggregate');
// path should be merged json
exports.testAggregate = async (path) => {
  const mergedData = await readJsonFile(path);
  const totals = aggregateMerged(mergedData);
  console.log(totals);
};
