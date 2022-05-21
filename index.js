const { Client, MessageEmbed } = require('discord.js');
const client = new Client
const { token } = require('./config.json');

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

client.on("message", message => {
    const args = message.content.split(' ');
    const cmd = args.shift().toLocaleLowerCase();
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
    }
})

client.login(token)