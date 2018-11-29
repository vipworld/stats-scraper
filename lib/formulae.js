// TODO: calculate leage layup Pct

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
  return (
    0.1843 * ast_per_poss
    +0.0969 * (pts_per_poss+tov_per_poss) 
    -2.3021 * pro  
    +0.0582 * (ast_per_poss*(tov_per_poss+pts_per_poss)*pro)
    -1.1942
  );
};

const non3Creation = (player) => {
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

const load = (player) => {
  const {
    ast_per_poss,
    fga_per_poss,
    fta_per_poss,
    tov_per_poss
  } = player;
  const boxC = boxCreation(player);
  return (
    (ast_per_poss - 0.38 * boxC) * 0.144 +
    (ast_per_poss - 0.38 * boxC) * 0.608 +
    fga_per_poss +
    fta_per_poss * 0.44 +
    boxC +
    tov_per_poss
  );
};

/*
exports.layupPct = (player) => {
  const { AtRimAssists, Assists } = player;
  const sum = Assists.reduce((total, amount) => total + amount);
  console.log(sum)
  return (AtRimAssists / Assists); //Need to sum all players AtRimAssists and Assists to calculate league Pct
}; */

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

//league object needs to be converted from strings
exports.rTS = (player, league) => {
  const { PTS, FGA, FTA } = player;
  const { fta_per_g, fga_per_g, pts_per_g } = league;
  const tsa = (parseFloat(fga_per_g) + 0.44 * parseFloat(fta_per_g));
  const leagueTS = (parseFloat(pts_per_g) / tsa) / 2;
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
  const {tov_per_poss} = player;
  const Oload = load(player);
  return tov_per_poss/Oload;
};

/*
exports.passerRating = (player) => {
  const {
    tov_per_poss,
    ast_per_poss,
    height
  } = player;
  const lPct = layupPct(player);
  const oLoad = load(player);
  const n3Box = non3Creation(player);
  return (
    1/(1+Math.exp(-1*Math.log10(2.5)*
                  ((4.79
                    +6.48*lPct
                    +0.19*Oload-76.71*(ast_per_poss/oLoad)
                    -0.07*height
                    -0.08*tov_per_poss^2-2.71*(n3Box/ast_per_poss)
                    +1.19*(height*(ast_per_poss/load))-5.6))))*11.3
  );
}; */
  
