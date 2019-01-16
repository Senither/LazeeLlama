const http = require('http');

class ClanController {
    constructor() {
        this.cache = {};
    }

    getClan(name) {
        if (! this.cache.hasOwnProperty(name)) {
            return this.getClanFromAPI(name);
        }

        // Caches the data for five minutes
        if (this.cache[name].lastUpdate > (Date.now() - 5 * 60 * 1000)) {
            return Promise.resolve(this.cache[name].data);
        }
        return this.getClanFromAPI(name);
    }

    getClanFromAPI(name) {
        return new Promise((resolve, reject) => {
            http.get(this.buildRequestUrl(name), response => {
                let data = '';
                response.on('data', chunk => data += chunk);
                response.on('end', () => {
                    try {
                        let response = JSON.parse(data);
                        
                        this.cache[name] = {
                            lastUpdate: Date.now(),
                            data: response
                        };

                        return resolve(response);
                    } catch (error) {
                        return reject(error);
                    }
                });
            }).on('error', error => reject(error));
        });
    }

    buildRequestUrl(name) {
        return 'http://ClickerHeroes-SavedGames3-747864888.us-east-1.elb.amazonaws.com/clans/findGuild.php?uid=0&passwordHash=0&highestZoneReached=0&guildName='
            + name.replace(/\s/g, '+');
    }
}

module.exports = new ClanController;
