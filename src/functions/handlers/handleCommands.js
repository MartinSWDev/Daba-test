const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const { discord_bot_token, clientId } = process.env;
const fs = require('fs');

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync('./src/commands');
    const { commands, commandArray } = client;
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith('.js'));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(
          `Command: ${command.data.name} has been passed through the handler`
        );
      }
    }

    const rest = new REST({ version: '10' }).setToken(discord_bot_token);
    try {
      console.log('Started refreshing application (/) commands.');

      await rest.put(Routes.applicationCommands(clientId), {
        body: commandArray,
      });

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.log(error);
    }
  };
};
