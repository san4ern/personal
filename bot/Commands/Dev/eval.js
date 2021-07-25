const { inspect } = require('util');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'eval',
    async execute(client, message, args) {
        let code = args.join(" ");
        try {
            let preEval = process.hrtime.bigint();
            let evaled = await eval(code);
            let lastEval = process.hrtime.bigint();
            if (typeof evaled !== "string") evaled = inspect(evaled);
            message.reply(["Code completed in " + `${(parseInt(String(lastEval - preEval)) / 1000000).toFixed(3)}` + "ms\n" + evaled.slice(0, 1900)], { code: "js" });
        } catch(e) {
            if (typeof(e) == "string") e = e.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            let evalerror = new MessageEmbed()
                .setTitle("Произошла ошибка")
                .setDescription("```" + e + "```")
                .setColor("RED")
            message.reply(evalerror);

        }
    }
}