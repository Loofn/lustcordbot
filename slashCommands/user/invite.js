const { ApplicationCommandType, EmbedBuilder, PermissionsBitField } = require("discord.js");
const { botLacksPerms } = require("../../data/embeds");

module.exports = {
    name: 'invite',
    description: 'Change your servers invite link.',
    cooldown: 3000,
    type: ApplicationCommandType.ChatInput,
    scope: 'dev',
    options: [
        {
            name: 'link',
            description: 'If you have link already, type it here.',
            type: 3,
            required: false
        }
    ],

    run: async (client, interaction) => {
        const { member, channelId, guildId, applicationId, 
            commandName, deferred, replied, ephemeral, 
            options, id, createdTimestamp 
        } = interaction; 
        const { guild } = member;

        const link = options.getString('link');

        if(!link){
            if(interaction.channel.permissionsFor(interaction.client.user).has(PermissionsBitField.Flags.CreateInstantInvite)){
                try {
                    const invite = await interaction.channel.createInvite({maxAge: 0, maxUses: 0, unique: true, reason: `New invite generated and added to Lustcord by ${member.displayName}`})
                    
                    const embed = new EmbedBuilder()
                        .setTitle(`Success!`)
                        .setDescription(`<lustcord_white:1267088046889762837> You successfully created new invite and linked it to your Lustcord ad.\nGenerated invite: \`${invite.url}\``)
                        .setColor("White")

                    await interaction.reply({embeds: [embed]});
                } catch (err){
                    console.error(err);
                    await interaction.reply({embeds: [botLacksPerms]})
                }
            } else {
                await interaction.reply({embeds: [botLacksPerms]})
            }
        }

    }
}