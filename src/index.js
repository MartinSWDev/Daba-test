// dotenv
require('dotenv').config();
const { discord_bot_token } = process.env;

//discord
const { Client, Collection, GatewayIntentBits } = require('discord.js');
// fs
const fs = require('fs');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith('.js'));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.login(discord_bot_token);
