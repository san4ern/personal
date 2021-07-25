const { readdirSync } = require('fs');

module.exports = {
    name: 'help',
    execute(client, message) {
        let reply = 'Bot commands:\n'
        const dirs = readdirSync('./bot/Commands');

        for(const dir of dirs) {
        if(dir !== 'Dev') {
            reply += `> ${dir}\n`;
            const files = readdirSync(`./bot/Commands/${dir}`);

            for(const file of files) {
                const cmd = require(`../${dir}/${file}`);
                reply += `  - ${cmd.name}\n`;
                }
            }
        }

        message.channel.send(reply);
    }
}