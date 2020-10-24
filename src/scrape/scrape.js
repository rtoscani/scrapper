'use strict';

const scrapeUtils = require('../utils/scrapeUtils');
const Notification = require('../notification/notification');
const Stores = require('../../config/config').stores;

module.exports = {
    scrape: async (name, text) => {
        console.info('Scrapping stores...');
        let results = [];

        // Iterate over the stores to load to scrape their products
        for (let store of Stores) {
            console.info('Scraping site: ' + store.name);
            
            let result = await scrapeUtils.scrapeSite(text, store)
                .then(response => { return response; })
                .catch(err => { console.error("Unable to scrape site: " + err); });

            results = results.concat(result);
        }

        console.log(results);
        console.info('Scrapping finished. Found ' + results.length + ' products in stock');

        Notification.notify(name, results);

        return results;
    },
}