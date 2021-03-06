const { Client, MessageEmbed, Util, Collection} = require('discord.js');
const client = new Client
const { token } = require('./config.json');
const { parse } = require('twemoji-parser');

client.on("ready", () => {
    console.log(`${client.user.username} Ready`)

    client.user.setPresence({
        activity: {
            name: "Test",
            type: "PLAYING",
        },
        status: "online",
    })
})

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client)
});

client.on("message", async message => {
    if (message.author.bot) return
    if (!message.guild) return
    const prefix = 't!'
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return
    let command = client.commands.set(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd))
    if (command) command.run(client, message, args)
    /*
    switch (cmd) {
        case 'ping':
            message.channel.send(`Ping: ${client.ws.ping} ms`);
            break;
        case 'say': 
            if(message.deletable) message.delete()
            message.channel.send(args.join(' '))
            break;
        case 'avatar': {
            const members = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
            const URL = members.user.avatarURL({format: 'jpg', dynamics: true, size: 1024})
            const avatarEmbed = new MessageEmbed()
                .setImage(URL)
                .setURL(URL)
                .setTitle('Download Ở đây')
            message.channel.send(avatarEmbed)
        }
        break
        case 'emoji': {
            const emoji = args[0]
            if (!emoji) return message.channel.send("Nhập gì đó đi!")

            let custom = Util.parseEmoji(emoji)
            const embed = new MessageEmbed()
                .setTitle(`Phiên bản phóng to của emoji: ${emoji}`)
                .setColor("RANDOM")

            if (custom.is) {
                let link = `https://cdn.discord.com/emoji/${custom.id}.${custom.animated ? "gif" : "png"}`
                embed.setimage(link)
                    .setFooter(`Emoji ID: ${custom.id}`)
                return message.channel.send(embed)
            } else {
                let parsed = parse(emoji, { assetType: 'png' })
                if (!parsed[0]) return message.channel.send('Emoji Không hợp lệ')
                embed.setImage(parsed[0].url)
                return message.channel.send(embed)
            }
            break
        }

        
    }
    */
})

client.login(token)