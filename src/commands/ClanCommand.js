const Command = require('./Command');
const clans = require('./../../config.json').clans;
const ClanController = require('./../controller/ClanController');

class ClanCommand extends Command {
    onCommand(event, args) {
        if (clans.length == 0) {
            return;
        }

        if (args.length == 0) {
            return this.showClans(event)
        }

        let id = parseInt(args[0], 10);
        if (isNaN(id) || id < 0 || id > clans.length) {
            return this.invalidArgumentGiven(event);
        }

        return this.showClan(event, clans[id - 1]);
    }

    showClans(event) {
        let index = 1;
        let message = 'Select the clan you want to show the members of by using the clan ID.\n```apache\n';
        for (let clan of clans) {
            message += `${index++}: ${clan}\n`;
        }
        return event.reply(message + '```');
    }

    showClan(event, name) {
        ClanController.getClan(name).then(data => {
            let members = [];
            let guildMembers = data.result.guildMembers;
            for (let id of Object.keys(guildMembers)) {
                let member = guildMembers[id];
                members.push([member.nickname, {
                    zone: member.highestZone,
                    status: data.result.guild.memberUids[member.uid],
                }]);
            }

            members.sort((a, b) => b[1].zone - a[1].zone);

            let message = '**' + name + '** ```\n         USER         |   ZONE    |   STATUS\n';
            for (let user of members) {
                let name = user[0];
                let zone = user[1].zone;
                let status = user[1].status;
                let line = '';

                let addSpace = '         USER         '.length - name.length;
                line += ' ' + name;
                for (let i = addSpace - 1; i > 0; --i) {
                    line += ' ';
                }
                line += '|  ' + zone.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                addSpace = '         USER         |   ZONE    |'.length - line.length;
                for (let i = addSpace - 1; i > 0; --i) {
                    line += ' ';
                }
                line += '|  ' + status.charAt(0).toUpperCase() + status.slice(1);

                message += line + '\n';
            }
            event.reply(message + '```');
        }).catch(error => event.reply('Error ' + error.message));
    }

    invalidArgumentGiven(event) {
        return event.reply(`Invalid ID given, the ID must be between **1** and **${clans.length}**`);
    }
}

module.exports = ClanCommand;
