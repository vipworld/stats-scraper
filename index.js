const fs = require('fs');
const path = require('path');
const bballRef = require('./lib/bball-ref');
const pbpstats = require('./lib/pbpstats');
const nbacom = require('./lib/nbacom');
const players = require('./lib/players');
const merge = require('./lib/merge');
const combine = require('./lib/combine');
const dateStr = new Date().toISOString().split('T')[0];

//const OUT_DIR = `data_output/${dateStr}`;
const OUT_PATH = path.resolve(__dirname, `data_output/${dateStr}`);

const writeTo = (filename) => {
  return (content) => {
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    fs.writeFile(path.join(OUT_PATH, filename), content, (err) => {
      if (err) throw err;
      console.log(`data written to ${filename}`);
    });
  };
};

const cmdArgs = process.argv.slice(2);
const pathRequired = () => {
  if (typeof cmdArgs[1] === 'undefined') {
    console.log('input path to data_output directory');
    return false;
  } else {
    return true;
  }
};

const fetchStats = () => {
  fs.mkdir(OUT_PATH, (err) => {
    bballRef.run(writeTo('bball-ref.json'));
    bballRef.runPace(writeTo('bball-ref-pace.json'));
    bballRef.runLeague(writeTo('bball-ref-league.json'));
    pbpstats.run(writeTo('pbpstats.json'));
    nbacom.run(writeTo('nbacom.json'));
    players.run(writeTo('players.json'));
  });
};

if (cmdArgs.length === 0) {
  fetchStats();
} else if (cmdArgs[0] === 'merge') {
  if (typeof cmdArgs[1] === 'undefined') {
    console.log('input path to data_output directory');
  } else {
    console.log(`merging data from ${cmdArgs[1]}`);
    merge
      .run(cmdArgs[1])
      .then((mergedData) => {
        writeTo('merged_stats.json')(mergedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
} else if (cmdArgs[0] === 'combine') {
  pathRequired() && combine.run(cmdArgs[1], 'combined.json');
}
