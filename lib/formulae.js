

// (PTS / (FGA + 0.44 * FTA) / 2) - League TS%
// TODO: add league in later

exports.rTS = (player, league) => {
  const { PTS, FGA, FTA } = player;
  return PTS / (FGA + 0.44) / 2 - league.ts_percent;
};

exports.load = (player) => {
  const {
    ast_per_poss,
    boxCreation,
    ast_per_poss,
    fga_per_poss,
    fta_per_poss,
    tov_per_poss
  } = player;
  return (
    (ast_per_poss - 0.38 * boxCreation) * 0.144 +
    (ast_per_poss - 0.38 * boxCreation) * 0.608 +
    fga_per_poss +
    fta_per_poss * 0.44 +
    boxCreation +
    tov_per_poss
  );
};
