const {Client} = require('discord.js');
const decode = require('unescape');
const Config = require('./src/config');
const Twitter = require('./src/twitter');
const Database = require('./src/database');

const commands = require('./src/commands');

const config = new Config;
if (!config.isValid()) {
    console.error('The config is not valid, please follow the correct format and fill out all the fields in the config.');
    process.exit(1);
}

process.on('unhandledRejection', err => {
    console.error(err);
    process.exit(1);
});

const client = new Client;
const twitter = new Twitter(config);
const database = new Database('./tweets.sqlite');

database.migrate().then(() => {
    client.on('ready', () => console.log(`Logged into Discord using: ${client.user.tag}`));
    client.on('message', event => {
        let parts = event.content.trim().split(' ');
        if (parts.length === 0) {
            return;
        }

        for (let trigger of Object.keys(commands)) {
            if (parts[0].toLowerCase() == trigger) {
                return commands[trigger].onCommand(event, parts.slice(1));
            }
        }
    });
    client.login(config.discordToken);

    // setInterval(() => {
    //     let channel = client.channels.find(c => c.id === config.channelId);
    //     if (channel === null || typeof channel === 'undefined') {
    //         console.log('Update loop was called with an invalid channel ID of: ' + config.channelId);
    //         return;
    //     }

    //     twitter.fetchTweets().then(tweets => {
    //         if (tweets.length === 0) {
    //             return;
    //         }

    //         for (let tweet of tweets) {
    //             database.hasId(tweet.id_str).then(result => {
    //                 if (result) {
    //                     return;
    //                 }

    //                 let url = tweet.entities.urls.length === 0 ? null :
    //                     tweet.entities.urls[0].expanded_url;

    //                 channel.send({embed: {
    //                     color: tweet.type,
    //                     description: decode(tweet.text),
    //                     author: {
    //                         url,
    //                         name: tweet.user.name,
    //                         icon_url: tweet.user.profile_image_url_https
    //                     },
    //                     timestamp: new Date,
    //                     ur: url
    //                 }}).then(() => {
    //                     database.addId(tweet.id_str);
    //                     channel.send('@here').then(hereMessage => hereMessage.delete());
    //                 });
    //             });
    //         }
    //     });
    // }, 10000);
});
