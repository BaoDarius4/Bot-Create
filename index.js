const { Client } = require('discord.js');
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
    }
})

client.login(token)