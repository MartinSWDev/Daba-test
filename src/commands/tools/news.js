const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('news')
    .setDescription('Returns latest database news article'),
  async execute(interaction, client) {
    let responseData = '';
    let embed = '';

    await axios
      .get(
        `https://api.daba.so/${process.env.PROJECT_ID}/${process.env.DB_KEY}/key/news`
      )
      .then(function (response) {
        if (
          interaction.createdTimestamp - response.data.data.lastFetch >
          900000
        ) {
          axios
            .get(
              `https://gnews.io/api/v4/search?q=database&apikey=${process.env.GNEWS_KEY}&max=10&sortby=publishedAt`
            )
            .then(function (response) {
              // handle success
              const nowDate = Date.now();
              const dataToUpload = {
                articles: response.data.articles,
                lastFetch: nowDate,
              };
              const url = `https://api.daba.so/${process.env.PROJECT_ID}/${process.env.DB_KEY}/key/news`;
              axios
                .post(url, { data: dataToUpload })
                .then(function (response) {
                  responseData = dataToUpload.articles;
                  embed = new EmbedBuilder()
                    .setTitle(`${responseData[0].title}`)
                    .setDescription(`${responseData[0].description}`)
                    .setColor(0x5e17eb)
                    .setImage(`${responseData[0].image}`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setURL(`${responseData[0].url}`);

                  interaction.reply({
                    embeds: [embed],
                  });
                })
                .catch(function (error) {
                  console.log(error);
                });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          responseData = response.data.data;
          embed = new EmbedBuilder()
            .setTitle(`${responseData.articles[0].title}`)
            .setDescription(`${responseData.articles[0].description}`)
            .setColor(0x5e17eb)
            .setImage(`${responseData.articles[0].image}`)
            .setThumbnail(client.user.displayAvatarURL())
            .setURL(`${responseData.articles[0].url}`);

          interaction.reply({
            embeds: [embed],
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
