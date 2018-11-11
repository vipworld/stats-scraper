

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

exports.pts75 = (player) => {
  const {PTS, OffPoss} = player;
  return PTS / (OffPoss/75);
};

exports.mpg = (player) => {
  const {mp, g} = player;
  return mp / g;
};

exports.proficiency = (player) => {
  const {fga3_per_poss, fg3_pct} = player;
  return (2/(1+Math.exp(-fga3_per_poss))-1)*fg3_pct;
};

exports.cTOV = (player) => {
  const {tov_per_poss, load} = player;
  return tov_per_poss/load;
};

exports.boxCreation = (player) => {
  const {
    ast_per_poss,
    pts_per_poss,
    proficiency,
    tov_per_poss
  } = player;
  return (
    ast_per_poss*0.1843 +
    (pts_per_poss+tov_per_poss)*0.0969 -
    proficiency * 2.3021 +
    (ast_per_poss*(tov_per_poss+pts_per_poss)*proficiency) * 0.0582 -
    1.1942
  );
};

exports.non3Creation = (player) => {
  const {
    ast_per_poss,
    pts_per_poss,
    tov_per_poss
  } = player;
  return (
    ast_per_poss*-0.1091 +
    (pts_per_poss+tov_per_poss) * 0.05304 +
    (ast_per_poss*(pts_per_poss+tov_per_poss)) * 0.02864
    -0.8724
  );
};

exports.passerRating = (player) => {
  const {
    layupPct,
    load,
    tov_per_poss,
    ast_per_poss,
    height,
    non3Creation
  } = player;
  return (
    1/(1+Math.exp(-1*Math.log10(2.5)*
                  ((4.79
                    +6.48*layupPct
                    +0.19*load-76.71*(ast_per_poss/load)
                    -0.07*height
                    -0.08*tov_per_poss^2-2.71*(non3Creation/ast_per_poss)
                    +1.19*(height*(ast_per_poss/load))-5.6)))*11.3
  );
};
    
exports.layupPct = (player, league) => {
  const {AtRimAssists, Assists} = player;
  return (AtRimAssists / Assists) - leagueLayupPct; //Need to sum all players AtRimAssists and Assists to calculate league Pct
};
