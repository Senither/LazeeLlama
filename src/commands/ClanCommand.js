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
                members.push([member.nickname, member.highestZone]);
            }

            members.sort((a, b) => b[1] - a[1]);

            let message = '**' + name + '** ```\n         USER         |  ZONE\n';
            for (let user of members) {
                let name = user[0];
                let zone = user[1];

                let addSpace = '         USER         '.length - name.length;
                message += ' ' + name;
                for (let i = addSpace - 1; i > 0; --i) {
                    message += ' ';
                }
                message += '| ' + zone.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '\n';
            }
            event.reply(message + '```');
        }).catch(error => event.reply('Error ' + error.message));
    }

    invalidArgumentGiven(event) {
        return event.reply(`Invalid ID given, the ID must be between **1** and **${clans.length}**`);
    }
}

module.exports = ClanCommand;
