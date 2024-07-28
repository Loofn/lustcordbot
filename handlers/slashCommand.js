const fs = require('fs');

const { PermissionsBitField } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');

const AsciiTable = require('ascii-table');
const table = new AsciiTable().setHeading('Slash Commands', 'Stats', 'Scope').setBorder('|', '=', "0", "0");

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({ version: '9' }).setToken(TOKEN);

const DEBUG_MODE = true;

module.exports = (client) => {
    const globalCommands = [];
    const guildCommands = [];

    fs.readdirSync('./slashCommands/').forEach(async dir => {
        const files = fs.readdirSync(`./slashCommands/${dir}/`).filter(file => file.endsWith('.js'));

        try {
            for(const file of files){
                const slashCommand = require(`../slashCommands/${dir}/${file}`);
                const commandData = {
                    name: slashCommand.name,
                    description: slashCommand.description,
                    type: slashCommand.type,
                    options: slashCommand.options ? slashCommand.options : null,
                    default_permission: slashCommand.default_permission ? slashCommand.default_permission : null,
                    default_member_permission: slashCommand.default_member_permission ? slashCommand.default_member_permissions : null
                };

                if(slashCommand.scope === 'global'){
                    globalCommands.push(commandData);
                } else {
                    guildCommands.push(commandData);
                }

                if(slashCommand.name){
                    client.slashCommands.set(slashCommand.name, slashCommand)
                    table.addRow(file.split('.js')[0], '✅', slashCommand.scope ? slashCommand.scope.toUpperCase() : 'GUILD')
                } else {
                    table.addRow(file.split('.js')[0], '❌', slashCommand.scope ? slashCommand.scope.toUpperCase() : 'GUILD')
                }
            }
        } catch (err) {
            console.log(err);
        }
    });

    console.log(table.toString());

    (async () => {
        try {
            if(DEBUG_MODE){
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: guildCommands })
                console.log("DEBUG DEBUG, ONLY UPDATING COMMANDS TO DEV SERVER!")
            } else {
                await rest.put(Routes.applicationCommands(CLIENT_ID), { body: globalCommands });
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: guildCommands })
                console.log("UPDATING SLASH COMMANDS GLOBALLY AND TO GUILD, MAY TAKE FEW HOURS!");
            }

            console.log('Slash Commands * Registered');
        } catch (err) {
            console.log(err);
        }
    })();
}