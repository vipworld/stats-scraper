const aggregate = require('./aggregate');

module.exports = class Runner {
  constructor(formulae) {
    this.formulae = formulae;
  }

  run(stats, league={}) {
    const leagueTotals = aggregate(stats);
    return stats.map((player) => {
      const combined = {};
      for (let f in this.formulae) {
        const fn = this.formulae[f];
        combined[f] = fn(player, league[0], leagueTotals);
      }
      return combined;
    });
  }
}
