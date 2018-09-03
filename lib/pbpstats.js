const axios = require('axios');

const URL =
  'https://api.pbpstats.com/get-totals/nba?Season=2017-18&SeasonType=Regular+Season&Type=Player';

exports.run = (cb) => {
  axios
    .get(URL)
    .then(({ data }) => {
      cb(data.multi_row_table_data);
    })
    .catch((err) => {
      console.log(err);
    });
};
