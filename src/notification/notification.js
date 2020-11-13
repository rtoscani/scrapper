'use strict';

const Config = require('../../config/config');
const { Webhook, MessageBuilder } = require('discord-webhook-node');

module.exports = {
    notify: (name, result, webhookUrl) => {
        if (Config.notification.enabled && Array.isArray(result) && result.length != 0) {
            const hook = new Webhook(webhookUrl || Config.notification.webhookUrl);
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