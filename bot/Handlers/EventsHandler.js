const { readdirSync } = require('fs');

module.exports = async(client) => {
    const eventsFiles = readdirSync('./bot/events')
        .filter(file => file.endsWith(".js"));

    if(!eventsFiles.length) return console.log('EVENTS   | No events were found');

    for (const file of eventsFiles) {
        const event = require(`../events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, event.bind(null, client, eventName));
        delete require.cache[require.resolve(`../events/${file}`)];

        console.log(`EVENTS   | Loaded ${eventName} event`);
    }
}