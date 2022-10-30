const discord = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("meme")
    .setDescription("Get a random meme from Reddit"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const url = "https://meme-api.herokuapp.com/gimme";

    axios
      .get(url)
      .then(async (res) => {
        const embed = new discord.EmbedBuilder()
          .setColor("Blurple")
          .setTitle(`${res.data.title}`)
          .addFields(
            {
              name: "Author",
              value: `${res.data.author}`,
              inline: true,
            },
            {
              name: "Ups",
              value: `${res.data.ups.toLocaleString()}`,
              inline: true,
            }
          )
          .setImage(`${res.data.url}`)
          .setFooter({
            text: `Subreddit - ${res.data.subreddit}`,
          });

        const row = new discord.ActionRowBuilder().addComponents(
          new discord.ButtonBuilder()
            .setLabel("Post Link")
            .setStyle(discord.ButtonStyle.Link)
            .setURL(`${res.data.postLink}`)
        );

        await interaction.reply({
          embeds: [embed],
          components: [row],
        });
      })
      .catch(async (err) => {
        console.log(err);
        await interaction.reply({
          content: "There was an error while executing this command...",
          ephemeral: true,
        });
      });
  },
};
