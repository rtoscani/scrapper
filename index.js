'use strict';

const CronJob = require('cron').CronJob;
const scrapeStores = require('./scrape/scrape');

const searchText = "3080";

new CronJob('* * * * *', async function() {
    console.info('Searching for: ' + searchText);

    await scrapeStores.scrape(searchText);
  }, null, true).start();
