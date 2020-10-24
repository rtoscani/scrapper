'use strict';

const Config = require('../../config/config');
const Scrape = require('../scrape/scrape');
const CronJob = require('cron').CronJob;

const cron = new CronJob(Config.cron.pattern, async function() {
    for (let search of Config.searchs) {
        console.info('Searching for: ' + search.name);

        await Scrape.scrape(search.name, search.text);
    }
  }, null, true);

if (Config.cron.enabled) {
    cron.start()
}