'use strict';

const request = require('request');
const utils = require('./utils');
const cheerio = require('cheerio');

const req = request.defaults({
    jar: false,
    rejectUnauthorized: false,
    followAllRedirects: false,
});

/**
 * Return string url replacing {0} (search text) and {1} (page number)
 * @param {string} search 
 * @param {Object} parameters 
 * @param {int} pageNumber 
 */
function getUrl (search, parameters, pageNumber) {
    if (!parameters.paginatorParameters.hasPaginator) {
        return parameters.siteParameters.baseUrl + String.format(parameters.siteParameters.searchUrl, search);
    }

    return parameters.siteParameters.baseUrl + String.format(parameters.siteParameters.searchUrl, search, pageNumber);
}

/**
 * Returns max page from the paginators of the current cheerio Object
 * @param {Object} $ 
 * @param {Object} parameters 
 * @param {int} pageMax 
 */
function getMaxPageQuantity ($, parameters, pageMax) {
    if (parameters.hasPaginator) {

        let pages = $(parameters.paginatorSelector);
        let pageQuantity = pages.length;

        if (parameters.hasArrows) {
            pageQuantity = pageQuantity - parameters.skipArrows;
        }

        if (parameters.isPaginatorDuplicate) {
            pageQuantity = pageQuantity / 2;
        }

        if (pageQuantity < 1) {
            return 1;
        }

        let maxPage = utils.parsePrice(pages.slice(pageQuantity - 1, pageQuantity).text());

        if (maxPage >= pageMax) {
            return maxPage;
        }
    }

    return pageMax;
}

/**
 * Scrape site to obtain the available products based on the search text
 * @param {string} search
 * @param {Object} parameters 
 * @param {[]Object} products 
 * @param {int} pageNumber 
 */
function scrapeSite (search, parameters, products, pageNumber) {
    pageNumber = pageNumber ? pageNumber : 1;
    products = Array.isArray(products) ? products : [];

    // Assemble the url
    const url = getUrl(search, parameters, pageNumber);
    
    const options = {
        url: url,
        timeout: 5000
    };

    return new Promise(function (resolve, reject) {
        req.get(options, function (error, response, html) {
            if (!error) {

                // Load the html
                let $ = cheerio.load(html);

                let pages = getMaxPageQuantity($, parameters.paginatorParameters, pageNumber);

                // Find all the products
                $(parameters.selectorParameters.product).each(function () {
                    try {
                        // Find the elements needed
                        let name = $(parameters.selectorParameters.name, this).text();
                        let price = $(parameters.selectorParameters.price, this).text();
                        let link = parameters.selectorParameters.linkUseBaseUrl 
                            ? parameters.siteParameters.baseUrl + $(parameters.selectorParameters.link, this).attr(parameters.selectorParameters.linkElement) 
                            : $(parameters.selectorParameters.link, this).attr(parameters.selectorParameters.linkElement);
                        let stock = parameters.siteParameters.isAlwaysAvailable ? true : $(parameters.selectorParameters.availability, this).text().toLowerCase() != parameters.siteParameters.isNotAvailableText.toLowerCase();

                        if (link && link[0] == "/") {
                            link = parameters.siteParameters.baseUrl + link;
                        }

                        if (stock) {
                            products.push({
                                name: utils.cleanText(name), 
                                price: utils.parsePrice(price), 
                                link: link,
                            });
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                });

                if (pageNumber == pages) {
                    // Cut the recursion
                    resolve(products);
                } else {
                    // Recursivelly search for products in the next page
                    resolve(getDataInPage(parameters, search, products, pageNumber++));
                }

            } else {
                reject("Cannot obtain the data in the page: " + error);
            }
        })
    });
}

module.exports = {
    scrapeSite,
}