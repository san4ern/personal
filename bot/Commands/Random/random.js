const { fullRandom, randomImage } = require('random-img-lib');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'random',
    async execute(client, message, args) {
        if(!args[0]) {
            const img = await fullRandom();

            const emb = new MessageEmbed()
                .setTitle('Your random image')
                .setColor('#75df64')
                .setImage(img)
            await message.channel.send(emb);
        } else {
            const query = args[0];
            const embed = new MessageEmbed()
            try {
                const img = await randomImage(query);
                embed.setImage(img)
                    .setTitle('Your random '+ query +' image')
                    .setColor('#75df64')
                await message.channel.send(embed);
            } catch (e) {
                embed.setTitle('An error was occurred')
                    .setDescription(e)
                    .setColor('RED')
                await message.channel.send(embed);
            }
        }

    }
}