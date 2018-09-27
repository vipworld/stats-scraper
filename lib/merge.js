const path = require('path');
const { readJsonFile } = require('./utils');
const _ = require('lodash');

const MERGABLES = [
  ['nbacom.json', 'PLAYER_NAME'],
  ['pbpstats.json', 'Name'],
  ['bball-ref.json', 'player']
];

const NAME_REGEX = /[.\s]/g;
const normalizePlayerName = (name) => {
  return name.toLowerCase().replace(NAME_REGEX, '');
};

const warn = (srcKey, src, destKey, dest, errorCount) => {
  const playerName = src[srcKey];
  console.warn(`missing data for ${playerName}`);
};

const mergePlayerStats = (srcKey, destKey, src, dest) => {
  let errorCount = 0;
  return src.map((playerStats, idx) => {
    const srcName = normalizePlayerName(playerStats[srcKey]);
    const destStats = _.find(dest, (d) => {
      const destName = normalizePlayerName(d[destKey]);
      return srcName === destName;
    });
    if (_.isUndefined(destStats)) {
      errorCount++;
      warn(srcKey, src, destKey, dest, errorCount);
    }
    return Object.assign({}, playerStats, destStats);
  });
};

exports.run = async (inputDir) => {
  const statsDatasets = [];
  for (const fileInfo of MERGABLES) {
    const [file, keyName] = fileInfo;
    const filePath = path.join(inputDir, file);
    const stats = await readJsonFile(filePath);
    statsDatasets.push(stats);
  }

  const srcKey = MERGABLES[0][1];
  return statsDatasets.reduce((acc, dataset, idx) => {
    // if (idx === 0) return acc;
    const mergeKey = MERGABLES[idx][1];
    return mergePlayerStats(srcKey, mergeKey, acc, dataset);
  });
};
