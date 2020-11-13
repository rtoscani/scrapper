'use strict';

const scrapeUtils = require('../utils/scrapeUtils');
const Notification = require('../notification/notification');
const Stores = require('../../config/config').stores;

module.exports = {
    scrape: async (search) => {
        console.info('Scrapping stores...');
        let results = [];

        let promises = [];

        // Iterate over the stores to load to scrape their products
        for (let store of Stores.filter(store => store.enabled)) {
            console.info('Scrapping site: ' + store.name);
            
            promises.push(scrapeUtils.scrapeSite(search.text, store)
                .then(response => { return response; })
                .catch(err => { 
                    console.error("Unable to scrape site: " + err);
                    return [];
                }));
        }

        await Promise.all(promises).then(result => {
            // Filter products using the regex
            for (let products of result) {
                for (let product of products) {
                    let regex = new RegExp(search.shouldContain, "i");
                    if (regex.test(product.name)) {
                        results.push(product);
                    }
                }
            }
        });

        console.log(results);
        console.info('Scrapping finished. Found ' + results.length + ' products in stock');

        Notification.notify(search.name, results, search.webhookUrl);

        return results;
    },
}