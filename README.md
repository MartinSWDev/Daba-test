# Daba-test
Testing out the [daba.so](https://www.daba.so/) database with a database news bot

## Daba
A simple database that has a built in api to GET data and POST data into your database in JSON format. 

To test the database I built a quick a discord bot to get database related news, store it in a database, and return that data to discord on request

Utilises base discord bot code from [TestBot](https://github.com/MartinSWDev/martinsoftwaredev_test_bot)

Gets data from [GNEWS](https://gnews.io)

## Deployed Version
You can see the discord bot in action in [my server](https://discord.gg/dKuPQN7SwV)

or view the widget results over on [my page](https://martinswdev.github.io/#discord)

## Local Copy ##
If you are looking to build your own discord bot I would recommend starting by reading the [Discord.js Guide](https://discordjs.guide) which helped me in building this bot. 

## Prerequisites ##
- **daba.so:** This bot utilises [daba.so](https://www.daba.so/) in order to hold data such as the news. In order to replicate this repo you will need your own database. 
- **node.js:** Make sure you have [node.js](https://nodejs.org/en/) installed 
- **GNEWS-api:** You will need a [GNEWS](https://gnews.io) account if you wish to use that api

## Set Up ##
1. Run 
    ```
    npm install
    ```
2. Create `.env` file to hold your tokens

Set .env variables for the following
- discord_bot_token (from discord developers once you have set up a bot)
- DB_KEY (from daba.so)
- PROJECT_ID (from daba.so)
- guildId (the id for the discord server)
- clientId (the id for the discord bot)
- GNEWS_KEY (from GNEWS)

3. Bring discord bot online
```
npm run start
```

# Usage #
 ## Current Commands ## 
- /news - shows latest news article with "database" keyword, as embed
- /newsreel - shows latest 10 news articles with "database" keyword, as embed with pagination
 
