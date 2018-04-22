LazeeLlama
==========

LazeeLlama is a simple Discord bot built for [@LazeeLlama](https://twitter.com/LazeeLlama), the bot will regularly lookup tweets for a user, if any tweets are found with a certain hashtag, the tweet will be posted in a Discord channel, right now the two supported hashtags are `#YouTube` and `#Twitch`.

The bot utilizes [Discord.js](https://discord.js.org/#/) for communicating with Discord, [Twit](https://github.com/ttezel/twit) for fetching tweets, and [Knex.js](http://knexjs.org/) for local SQLite storage so the bot can keep track of tweets that have been sent before.

## Table of Content

 - [Prerequisites](#prerequisites)
 - [Installing LazeeLlama](#installing-lazeellama)
 - [Configuration](#configuration)

### Prerequisites

Since LazeeLlama is build using NodeJS, the following versions of software is required:

 - NodeJS >= 8.0
 - [NPM Yarn](https://www.npmjs.com/package/yarn)
 - [Git](https://git-scm.com/)

### Installing LazeeLlama

To get started, clone down the repository using:

    git clone https://github.com/Senither/LazeeLlama.git

Go into the `LazeeLlama` folder and install the required Node components using Yarn.

    yarn

Then rename the `config.example.json` file to `config.json` and fill out the empty quotes with your data.

### Configuration

#### discordToken

The Discord token property is the token for the bot you want to use to send the messages when a tweet matches one of our hashtags. If you don't already have a Discord bot application setup you can easily create one by going to https://discordapp.com/developers/applications/me, create a new application, give it some name, then click on "Create a Bot User", and you're good to go!

### consumerKey & consumerSecret

The consumer key and secret and our Twitter app key and secret, the two keys are used in combination to communicate with Twitters API to fetch tweets. If you don't already have a Twitter application setup you can easily create one by going to [apps.twitter.com/](https://apps.twitter.com/), create a new application, once the application has been created, go to "Keys and Access Tokens", you'll find your keys there.

### username

The username property is the username of the twitter account that the bot should lookup tweets for, re-tweets are also counted as tweets by the user.

### channelId

The channel ID property is the ID of the Discord channel that the bot should send the messages in when a tweet was found that matches one or more of our hashtags, you can get the ID of a channel by mentioning a channel like this.
    
    \#general

When you send the message it should fold out to something that looks like this `<#299205123673030658>`, in this case, `299205123673030658` is the ID of the channel.

### Running the bot

You should now be able to run the bot, to start it up run:

    yarn start

If the bot doesn't throw any weird errors after 10 seconds of running, you should have set up the configuration correctly!

## License

LazeeLlama is open-sourced software licensed under the [MIT License](https://opensource.org/licenses/MIT).
