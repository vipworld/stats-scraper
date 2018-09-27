const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

exports.readJson = async (p) => {
  const absPath = path.resolve(__dirname, `../${p}`);
  const json = await readFile(absPath, 'utf8')
  return JSON.parse(json, null, 2);
};
