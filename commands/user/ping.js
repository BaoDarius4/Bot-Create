module.exports = {
    name: 'Ping',
    category: 'user',
    alises: ['P'],
    run: (client, Message, args) => {
        message.channel.send(`Ping: \`${client.ws.ping}\` ms`)
    }
}