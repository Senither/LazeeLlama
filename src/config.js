const loadProperty = Symbol('loadProperty');

try {
    var config = require('../config.json');
} catch (err) {
    console.log('\nFailed to load the config.json file, does it exists? Is it formatted correctly?');
    throw err;
}

class Config {
    get username() {
        return this[loadProperty]('username');
    }

    get consumerKey() {
        return this[loadProperty]('consumerKey');
    }

    get consumerSecret() {
        return this[loadProperty]('consumerSecret');
    }

    get discordToken() {
        return this[loadProperty]('discordToken');
    }

    get channelId() {
        return this[loadProperty]('channelId');
    }

    isValid() {
        return ! (
               this.username == null
            || this.consumerKey == null
            || this.consumerSecret == null
            || this.discordToken == null
        );
    }

    [loadProperty](name) {
        if (! config.hasOwnProperty('username')) {
            return null;
        }
        if (typeof config[name] != 'string') {
            return null;
        }
        if (config[name].trim().length == 0) {
            return null;
        }
        return config[name];
    }
}

module.exports = Config;