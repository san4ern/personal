const { readdirSync } = require('fs');

module.exports = async client => {
    const dirs = readdirSync('./bot/Commands')

    if(!dirs.length) return console.log('CMDS   | No commands were found');
    for(const dir of dirs) {
        const files = readdirSync(`./bot/Commands/${dir}`)
        for (const file of files) {
            const command = require(`../Commands/${dir}/${file}`);
            command.dir = dir;
            client.commands.set(command.name, command);

            console.log(`CMDS   | ${command.name} was loaded`);
        }
    }
}