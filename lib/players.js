const _ = require('lodash');
const axios = require('axios');

const YEARS = ['2018', '2017'];

const getRequests = () => {
  return YEARS.map((year) => {
    const url = `http://data.nba.net/prod/v1/${year}/players.json`;
    console.log(url);
    return axios.get(url);
  });
};

const processResponses = (responses) => {
  const playerData = responses.map(({ data }) => {
    return _.get(data, 'league.standard', []);
  });
  return _.zipObject(YEARS, playerData);
};

exports.run = (cb) => {
  axios
    .all(getRequests())
    .then((responses) => {
      cb(processResponses(responses));
    })
    .catch((err) => {
      console.log(err);
    });
};
