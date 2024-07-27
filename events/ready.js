const client = require('..');
const { ActivityType } = require('discord.js');
const { getUptime } = require('../function/uptime');

client.on("ready", async () => {
    client.user.setActivity('lustcord.com', { type: ActivityType.Watching});
    console.log("Started", getUptime().fromNow())

    // SHORTER INTERVAL -> 10 seconds
    setInterval(() => {
        client.user.setActivity('lustcord.com', { type: ActivityType.Watching});
        
    }, 10000);
    console.log(`Logged in as ${client.user.tag}!`)
})