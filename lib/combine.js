const path = require('path');
const Runner = require('./runner');
const formulae = require('./formulae');
const fs = require('fs');
// const formulae = require('formulae');

const { readJsonFile } = require('./utils');

const MERGED_STATS = 'merged_stats.json';
const LEAGUE_STATS = 'bball-ref-league.json';
const YEAR = '2018-19';

exports.run = async (inputDir, outputFile) => {
  console.log('running');
  const mergedPath = path.join(inputDir, MERGED_STATS);
  const leaguePath = path.join(inputDir, LEAGUE_STATS);
  const outputPath = path.join(inputDir, outputFile);
  const league = await readJsonFile(leaguePath);
  readJsonFile(mergedPath)
    .then((mergedStats) => {
      const runner = new Runner(formulae);
      const combined = runner.run(mergedStats, league);
      fs.writeFileSync(outputPath, JSON.stringify(combined));
    })
    .catch((err) => {
      console.log(err);
    });
};
