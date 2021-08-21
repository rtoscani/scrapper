# Scrapper to check for product's stock

## Build & run

Node.js 10+ needed to run the project.
To run just type npm start or npm run if you already intalled the dependencies. Cron is configured by default to run once a minute.

## Config

Config file is located in `config/config.js`. In this file you will be able to configure the stores were products will be scrapped, discord notifications and cron properties.
Main attributes are:
* searchs: array o search object.
* notification: settings for notifications.
* cron: settings for cron job.
* stores: array of store object.

## Searchs

Searchs are located inside the config file. Every search should be an object with the given properties:
* name: name of the product to search. It is used as part of the title for the notifications.
* text: text to be used on search.
* shouldContain: regex used to filter the product results. 
* webhookUrl: (optional) custom webhook url to send notification. This property will replace `notification.webhookUrl`.

## Discord notifications

Discord notifications can be turned of inside `config/config.js`. The url should be configured in the property `webhookUrl`.
Also, every different search can overwrite the webhookUrl using custom webhookUrl on search object.

## Cron job

Cron job is configured via the config file. Default is `* * * * *` (every minute).

## Stores

Stores can be configured in the config file using the following attributes:
* name: name of the store.
* enabled: if store shoulb be scrapped.
* siteParameters: parameters of the store.
* selectorParameters: locators used to get product's data.

siteParameters properties:
* baseUrl: base url of the store.
* searchUrl: url that point to general product section, use `{0}` to identify search text to be replaced.
* isAlwaysAvailable: if products are always available in the store if they are listed.
* isNotAvailableText: text to be looked at when products are not available.

selectorParameters properties:
* product: selector for product's base.
* name: selector for product name.
* price: selector for product price.
* availability: selector for availability text (only if isAlwaysAvailable is false).
* link: selector for product url.
* linkElement: link element to be used as part of the link selector's.

Feel free to contribute with new or custom modules.

Discord group to receive notifications for RTX cards: 3DGames - RTX 3080/3070 stock

Have fun :)
