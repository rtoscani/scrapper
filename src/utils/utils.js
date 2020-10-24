'use strict';

/**
 * Cleans unwanted characters from a string.
 * @param {string} text
 */
function cleanText (text) {
    return text.trim().replace(/\s{2,}/g, ' ').replace(/[\n|\t]/g, '');
}

/**
 * Converts and returns a string to a Number.
 * @param {string} price 
 * @returns {number}
 */
function cleanPrice (price) {
    return Number(price.match(/[-]{0,1}[\d]*[\.]{0,1}[\d]+/g));
}

/**
 * Parse and convert a string value to a Number value. Accepts multiple comma and dot strings
 * Examples:
 *      ARS$ 123,123.05 -> 123123.05
 *      USD 123,05      -> 123.05
 * @param {string} price
 * @returns {number}
 */
function parsePrice (price) {
    try {
        price = price.replace(/[^\d,.-]/g, '');
    } catch (error) {
        console.error(error.message);
    }

    if (price.indexOf(',') == -1 && price.indexOf('.') == -1) {
        return cleanPrice(price);
    }

    if (price.indexOf(',') != -1 && price.indexOf('.') != -1) {
        if (price.indexOf('.') > price.indexOf(',')) {
            return cleanPrice(price.replace(',', ''));
        } else {
            return cleanPrice(price.replace('.', '').replace(',', '.'));
        }
    }

    if (price.indexOf(',') != -1) {
        if (price.split(',')[1].length > 2)
            return price.replace(',', '');
        return cleanPrice(price.replace(',', '.'));
    }

    if (price.indexOf('.') != -1) {
        if (price.split('.')[1].length > 2)
            return price.replace('.', '');
        return cleanPrice(price);
    }

    return cleanPrice(price);
}

/**
 * Replace blank spaces with '%20'
 * @param {string} url
 */
function parseUri (url) {
    return url.toString().replace(/ /g, '%20');
}

/**
 * Format string like in .NET
 */
if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

module.exports = {
    cleanText,
    parsePrice,
    parseUri,
}