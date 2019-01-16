const SpotsCommand = require('./SpotsCommand');
const ClanCommand = require('./ClanCommand');

module.exports = {
    '!clan': new ClanCommand,
    '!spots': new SpotsCommand,
};
