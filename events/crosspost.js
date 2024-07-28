const { ChannelType } = require('discord.js');
const client = require('..');

client.on('messageCreate', async message => {
    if(message.channel.type === ChannelType.GuildAnnouncement){
        try {
            if(message.crosspostable){
                message.crosspost()
            }
        } catch(e){
            console.error(e);
        }
    }
})
