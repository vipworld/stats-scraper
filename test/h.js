
const fs = require('fs');
const path = require('path');
const fileName = './btext.txt';
const cheerio = require('cheerio');

const text = fs.readFileSync(path.resolve(__dirname, fileName)).toString();
exports.$ = cheerio.load(text);
