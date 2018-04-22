const Twit = require('twit');

class Twitter {
    constructor(config) {
        this.username = config.username;
        this.twit = new Twit({
            consumer_key: config.consumerKey,
            consumer_secret: config.consumerSecret,
            app_only_auth: true
        });
    }

    fetchTweets(count = 5, hasHashTags = {youtube: 0xFF0000, twitch: 0x392E5C}) {
        return new Promise((resolve, reject) => {
            this.twit.get('statuses/user_timeline', {
                screen_name: this.username,
                count
            }, (err, data, response) => {
                if (err) {
                    return reject(err);
                }

                if (hasHashTags === null || hasHashTags.length === 0) {
                    return resolve(data.map(tweet => {
                        tweet.type = null;
                        return tweet;
                    }));
                }

                let hashtags = Object.keys(hasHashTags);
                return resolve(data.map(tweet => {
                    tweet.type = null;
                    for (let tag of tweet.entities.hashtags) {
                        if (hashtags.indexOf(tag.text.toLowerCase()) > -1) {
                            tweet.type = hasHashTags[tag.text.toLowerCase()];
                        }
                    }
                    return tweet;
                }).filter(tweet => tweet.type !== null));
            });
        });
    }
}

module.exports = Twitter;
