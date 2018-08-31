const cheerio = require('cheerio');

const rowSelector = '.stats_table tbody tr';
class BballRefPageParser {
  constructor(content) {
    this.$ = cheerio.load(content);
    this.pageStats = [];
    this.parsePage();
  }

  getTableRows() {
    return this.$(rowSelector).not('.thead');
  }

  parseTableRow(i, row) {
    const $ = this.$;
    const playerStats = {};
    $(row).find('td').each((i, td) => {
      const $td = $(td);

      const statName = $td.data("stat");
      const val = $td.html();
      playerStats[statName] = val;
    });
    this.pageStats.push(playerStats);
  }

  parseTableRows(rows) {
    const parseTableRow = this.parseTableRow.bind(this);
    rows.each(parseTableRow);
    console.log(JSON.stringify(this.pageStats));
  }

  parsePage() {
    const rows = this.getTableRows();
    this.parseTableRows(rows);
  }
}

module.exports = BballRefPageParser;
