module.exports = async(client, eventName, message) => {
    if(message.author.bot || message.channel.type === 'dm') return;
    const prefix = '!';

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
    if(!command) return;

    if(command.dir === 'Dev' && message.author.id !== '607148903833403422') return

    try {
        command.execute(client, message, args);
    } catch(e) {
        console.log(e);
    }

}