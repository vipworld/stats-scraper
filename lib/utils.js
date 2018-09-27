const fs = require('fs');
const { promisify } = require('util');
const path = require('path');
const readFile = promisify(fs.readFile);

// gets absolute path from main directory
const getAbsPath = (relPath) => {
  return path.resolve(__dirname, `../${relPath}`);
};
exports.getAbsPath = getAbsPath;

exports.readJsonFile = async (p) => {
  const absPath = getAbsPath(p);
  const json = await readFile(absPath, 'utf8');
  return JSON.parse(json);
};
