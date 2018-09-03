const axios = require('axios');
const _ = require('lodash');

const URL =
  'http://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=Totals&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2017-18&SeasonSegment=&SeasonType=Regular+Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=';

const parseNbaData = ({ resultSets }) => {
  const { headers, rowSet } = resultSets[0];
  return _.map(rowSet, (row) => {
    return _.zipObject(headers, row);
  });
};

exports.parseNbaData = parseNbaData;

exports.run = (cb) => {
  axios
    .get(URL)
    .then(({ data }) => {
      const stats = parseNbaData(data);
      cb(stats);
    })
    .catch((err) => {
      console.log(err);
    });
};
