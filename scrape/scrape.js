'use strict';

const stores = require('../config/stores');
var scrapeUtils = require('../utils/scrapeUtils');

module.exports = {
    scrape: async function (text) {
        console.info('Scrapping stores...');
        var results = [];

        // Iterate over the stores to load to scrape their products
        for (let store of stores) {
            console.info('Scraping site: ' + store.name);
            
            let result = await scrapeUtils.scrapeSite(text, store)
                .then(response => { return response; })
                .catch(err => { console.error("Unable to scrape site: " + err); });

            results = results.concat(result);
        }

        console.log(results);
        console.info('Scrapping finished. Found ' + results.length + ' products in stock')

        return results;
    }
}