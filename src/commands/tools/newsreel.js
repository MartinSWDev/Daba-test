const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();
const { Pagination } = require('pagination.djs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('newsreel')
    .setDescription('Returns latest 10 database news articles'),
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
                  console.log(responseData);
                  const pagination = new Pagination(interaction);

                  const embeds = [];

                  for (let i = 0; i < 10; i++) {
                    const newEmbed = new EmbedBuilder()
                      .setTitle(`${responseData[i].title}`)
                      .setDescription(`${responseData[i].description}`)
                      .setColor(0x5e17eb)
                      .setImage(`${responseData[i].image}`)
                      .setThumbnail(client.user.displayAvatarURL())
                      .setURL(`${responseData[i].url}`);
                    embeds.push(newEmbed);
                  }
                  pagination.setEmbeds(embeds);

                  pagination.render();
                })
                .catch(function (error) {
                  console.log(error);
                });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          responseData = response.data.data.articles;

          const pagination = new Pagination(interaction);

          const embeds = [];

          for (let i = 0; i < 10; i++) {
            const newEmbed = new EmbedBuilder()
              .setTitle(`${responseData[i].title}`)
              .setDescription(`${responseData[i].description}`)
              .setColor(0x5e17eb)
              .setImage(`${responseData[i].image}`)
              .setThumbnail(client.user.displayAvatarURL())
              .setURL(`${responseData[i].url}`);
            embeds.push(newEmbed);
          }

          pagination.setEmbeds(embeds);

          pagination.render();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
