const path = require('path');
// const formulae = require('formulae');

const { readJsonFile } = require('./utils');

const MERGED_STATS = 'merged_stats.json';

exports.run = (inputDir) => {
  const filePath = path.join(inputDir, MERGED_STATS);
  readJsonFile(filePath)
    .then((mergedStats) => {
      console.log(mergedStats[0]);
    })
    .catch((err) => {
      console.log(err);
    });
};
