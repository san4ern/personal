const { Client, Collection, Intents } = require('discord.js');

module.exports = class extends Client {
    constructor() {
        super({
            ws: {
                intents: Intents.ALL
            },
            messageCacheLifetime: 100,
            messageEditHistoryMaxSize: 0,
            messageCacheMaxSize: 20,
            messageSweepInterval: 100,
            allowedMentions: { parse: [] }
        });
        this.commands = new Collection();
    };
};