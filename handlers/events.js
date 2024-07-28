const fs = require('fs');
var AsciiTable = require('ascii-table');
var table = new AsciiTable();
table.setHeading('Events', 'Stats').setBorder('|', '=', "0", "0");

module.exports = (client) => {
    fs.readdirSync('./events/').filter((file) => file.endsWith('.js')).forEach((eventFile) => {
        const event = require(`../events/${eventFile}`);
        if(typeof event === 'function'){
            event(client);
        }
        table.addRow(eventFile.split('.js')[0], '✅')
    });
        console.log(table.toString());
}