'use strict';

const scrapeUtils = require('../utils/scrapeUtils');
const Notification = require('../notification/notification');
const Stores = require('../../config/config').stores;

module.exports = {
    scrape: async (search) => {
        console.info('Scrapping stores...');
        let results = [];

        // Iterate over the stores to load to scrape their products
        for (let store of Stores.filter(store => store.enabled)) {
            console.info('Scrapping site: ' + store.name);
            
            let result = await scrapeUtils.scrapeSite(search.text, store)
                .then(response => { return response; })
                .catch(err => { console.error("Unable to scrape site: " + err); });

            // Filter products using the regex
            for (let product of result) {
                let regex = new RegExp(search.shouldContain, "i");
                if (regex.test(product.name)) {
                    results.push(product);
                }
            }
        }

        console.log(results);
        console.info('Scrapping finished. Found ' + results.length + ' products in stock');

        Notification.notify(search.name, results);

        return results;
    },
}