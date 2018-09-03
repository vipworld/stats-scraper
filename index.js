const fs = require('fs');
const path = require('path');
const bballRef = require('./lib/bball-ref');
const pbpstats = require('./lib/pbpstats');
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

fs.mkdir(OUT_PATH, (err) => {
  bballRef.run(writeTo('bball-ref.json'));
  bballRef.runPace(writeTo('bball-ref-pace.json'));
  pbpstats.run(writeTo('pbpstats.json'));
});
