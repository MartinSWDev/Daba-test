const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Returns an embed'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`This is an embed!`)
      .setDescription(`This is a very cool description`)
      .setColor(0x18e1ee)
      .setImage(client.user.displayAvatarURL())
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp(Date.now())
      .setAuthor({
        url: `https://google.com`,
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setURL('https://google.com')
      .addFields([
        {
          name: 'name 1',
          value: 'value 1',
          inline: true,
        },
        {
          name: 'name 2',
          value: 'value 2',
          inline: true,
        },
        {
          name: 'name 3',
          value: 'value 3',
          inline: false,
        },
        {
          name: 'name 4',
          value: 'value 4',
          inline: false,
        },
      ]);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
