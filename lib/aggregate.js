const _ = require('lodash');
module.exports = (mergedData) => {
  const leagueTotals = {
    Assists: 0,
    AtRimAssists: 0
  };
  const aggregates = mergedData.reduce((totals, player) => {
    for (let attr in leagueTotals) {
      if (!_.isUndefined(player[attr])) {
        totals[attr] += player[attr];
      }
    }
    return totals;
  }, leagueTotals);
  return aggregates;
};
