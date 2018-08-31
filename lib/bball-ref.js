const cheerio = require('cheerio');
const axios = require('axios');
const PageParser = require('./bball-ref-page-parser');

const bballRefBaseUrl =
  'https://www.basketball-reference.com/play-index/psl_finder.cgi?';

const bballRefQs = (page = 1) => {
  const offset = (page - 1) * 100;
  return `offset=${offset}&request=1&match=single&per_minute_base=36&type=per_poss&per_poss_base=100&season_start=1&season_end=-1&lg_id=NBA&age_min=0&age_max=99&is_playoffs=N&height_min=0&height_max=99&year_min=2018&year_max=2018&birth_country_is=Y&as_comp=gt&as_val=0&pos_is_g=Y&pos_is_gf=Y&pos_is_f=Y&pos_is_fg=Y&pos_is_fc=Y&pos_is_c=Y&pos_is_cf=Y&c1stat=mp&c1comp=gt&c1val=1&order_by=ast_per_poss`;
};

const getAllPageUrls = (pageCount = 1) => {
  let urls = [];
  let page = 1;
  while (page <= pageCount) {
    urls.push(bballRefBaseUrl + bballRefQs(page));
    page++;
  }
  return urls;
};

const getPageContent = (url) => {
  console.log(url);
  return axios
    .get(url)
    .then((res) => {
      new PageParser(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.run = () => {
  const urls = getAllPageUrls();
  urls.forEach((url) => {
    getPageContent(url);
    // const content = getPageContent(url);
    // const $ = cheerio.load(content);
  });
};
