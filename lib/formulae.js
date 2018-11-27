// (PTS / (FGA + 0.44 * FTA) / 2) - League TS%
// TODO: add league in later

const proficiency = (player) => {
  const {fg3a_per_poss, fg3_pct} = player;
  return (2/(1+Math.exp(-fg3a_per_poss))-1)*fg3_pct;
};

const boxCreation = (player) => {
  const {
    ast_per_poss,
    pts_per_poss,
    tov_per_poss
  } = player;
  const pro = proficiency(player);
  const ast = parseFloat(ast_per_poss)
  const pts = parseFloat(pts_per_poss)
  const tov = parseFloat(tov_per_poss)
  return (
    0.1843 * ast
    +0.0969 * (pts+tov) 
    -2.3021 * pro  
    +0.0582 * (ast*(tov+pts)*pro)
    -1.1942
  );
};

const load = (player) => {
  const {
    ast_per_poss,
    fga_per_poss,
    fta_per_poss,
    tov_per_poss
  } = player;
  const boxC = boxCreation(player);
  const ast = parseFloat(ast_per_poss)
  const fga = parseFloat(fga_per_poss)
  const fta = parseFloat(fta_per_poss)
  const tov = parseFloat(tov_per_poss)
  return (
    (ast - 0.38 * boxC) * 0.144 +
    (ast - 0.38 * boxC) * 0.608 +
    fga +
    fta * 0.44 +
    boxC +
    tov
  );
};

/*
exports.proficiency = (player) => {
  return proficiency(player);
}; */

exports.boxCreation = (player) => {
  return boxCreation(player);
}

exports.load = (player) => {
  return load(player)
}

exports.rTS = (player, league) => {
  const { PTS, FGA, FTA } = player;
  const { fta_per_g, fga_per_g, pts_per_g } = league;
  const tsa = (fga_per_g + 0.44 * fta_per_g);
  const leagueTS = (pts_per_g / tsa) / 2;
  const out = (PTS / (FGA + 0.44 * FTA)) / 2 - leagueTS;
  return out;
};


exports.pts75 = (player) => {
  const {PTS, OffPoss} = player;
  return PTS / (OffPoss/75);
};

exports.mpg = (player) => {
  const {mp, g} = player;
  return mp / g;
};

exports.cTOV = (player) => {
  const {tov_per_poss, load} = player;
  return tov_per_poss/load;
};

exports.boxCreation = (player) => {
  const {
    ast_per_poss,
    pts_per_poss,
    tov_per_poss
  } = player;
  const pro = proficiency(player);
  return (
    ast_per_poss*0.1843 +
    (pts_per_poss+tov_per_poss)*0.0969 -
    pro * 2.3021 +
    (ast_per_poss*(tov_per_poss+pts_per_poss)*pro) * 0.0582 -
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
                    +1.19*(height*(ast_per_poss/load))-5.6))))*11.3
  );
};
    
exports.layupPct = (player, league) => {
  return 0;
  // const { AtRimAssists, Assists } = player;
  // return (AtRimAssists / Assists) - leagueLayupPct; //Need to sum all players AtRimAssists and Assists to calculate league Pct
};
