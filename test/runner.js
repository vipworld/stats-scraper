const h = require('./h');
const { getAbsPath } = require('../lib/utils');
// h.test();
// h.testBballRef();
// h.testReadJson();
// h.testMerge();
// h.testLeaguePull();
const mergedPath = 'data_output/2018-11-27/merged_stats.json';
h.testAggregate(mergedPath);
