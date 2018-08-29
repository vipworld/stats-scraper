const cheerio = require('cheerio');

const rowSelector = '.stats_table tbody tr';
class BballRefPageParser {
  constructor(content) {
    this.$ = cheerio.load(content);
    this.parsePage();
  }

  getTableRows() {
    return this.$(rowSelector).not('.thead');
  }

  parseTableRow(i, row) {
    const $ = this.$;
    $(row).find('td').each((i, td) => {
      console.log($(td).html());
    });
  }

  parseTableRows(rows) {
    const parseTableRow = this.parseTableRow.bind(this);
    rows.each(parseTableRow);
  }

  parsePage() {
    const rows = this.getTableRows();
    this.parseTableRows(rows);
  }
}

module.exports = BballRefPageParser;
