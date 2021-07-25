module.exports = {
    name: 'stats',
    execute: async function (client, message) {
        const req = await require('node-fetch')(`http://localhost:${process.env.PORT || 8000}/stats`);
        const { ping } = client.ws;
        const ram = (process.memoryUsage().heapUsed / 1024 ** 2).toFixed(0)
        let reply = `> Bot\nPong! ${ping}ms\nRAM: ${ram}MB\nCommands: ${client.commands.size}\n\n> API\n`;

        if (req["status"] === 200) {
            reply += '✅ API is alive\n';
            const r = await req.json();
            reply += 'Per-day requests: ' + r["requests"];
        } else {
            reply += `❌ Smth bad with API\nCurrent status: ${req["status"]}`
        }
        reply += `\n\n> Guild\nMembers: ${message.guild.memberCount}`
        message.channel.send(reply);
    }
}