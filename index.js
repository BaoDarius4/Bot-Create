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
    switch (message.content.toLowerCase()) {
        case 'ping':
            message.channel.send(`Ping: ${client.ws.ping} ms`)
    }
})

client.login(token)