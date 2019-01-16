const Command = require('./Command');
const clans = require('./../../config.json').clans;
const ClanController = require('./../controller/ClanController');

class SpotsCommand extends Command {
    onCommand(event, args) {
        event.reply('Looking up clan information...').then(message => {
            let requests = [];
            for (let name of clans) {
                requests.push(ClanController.getClan(name));
            }
            
            Promise.all(requests).then(responses => {
                let lines = [];
                for (let guild of responses) {
                    let name = guild.result.guild.name;
                    let members = Object.keys(guild.result.guildMembers).length;
                    let raidLevel = guild.result.guild.currentRaidLevel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                    lines.push(`"${name}" has ${members}/10 members, raid is level ${raidLevel}`);
                }
                message.edit('**Clans Spots + Raid Level:**\n```php\n' + lines.join('\n') + '```');
            });
        });
    }
}

module.exports = SpotsCommand;
