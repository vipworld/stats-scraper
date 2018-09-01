const rowSelector = '.stats_table tbody tr';
const pagingSel = '.p402_premium > p a';

class BballRefPageParser {
  constructor($) {
    this.$ = $;
    this.pageStats = [];
    this.parsePage();
  }

  getTableRows() {
    return this.$(rowSelector).not('.thead');
  }

  parseTableRow(i, row) {
    const $ = this.$;
    const playerStats = {};
    $(row)
      .find('td')
      .each((i, td) => {
        const $td = $(td);

        const statName = $td.data('stat');
        const val = $td.html();
        playerStats[statName] = val;
      });
    this.pageStats.push(playerStats);
  }

  parseTableRows(rows) {
    const parseTableRow = this.parseTableRow.bind(this);
    rows.each(parseTableRow);
  }

  parsePage() {
    const rows = this.getTableRows();
    this.parseTableRows(rows);
  }

  hasNext() {
    const paging = this.$(pagingSel);
    if (paging.length === 0) return false;
    return !(paging.length === 1 && paging.text().trim() === 'Previous Page');
  }

  getStats() {
    return this.pageStats;
  }

  getJSON() {
    return JSON.stringify(this.pageStats);
  }
}

module.exports = BballRefPageParser;
