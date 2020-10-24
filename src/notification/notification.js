'use strict';

const Config = require('../../config/config');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(Config.notification.webhookUrl);

module.exports = {
    notify: (name, result) => {
        if (Config.notification.enabled && Array.isArray(result) && result.length != 0) {
            let message = new MessageBuilder()
                .setTitle(Config.notification.title + name)
                .setTimestamp();

            result.forEach(elem => {
                message.addField(elem.name + ": " + elem.price, elem.link);
            })
            
            hook.send(message);
        }
    },
}