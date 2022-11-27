const config = require("../config.json");
const discord = require("discord.js");
const axios = require("axios");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("gif")
    .setDescription("Search for a GIF on Tenor")
    .addStringOption((option) =>
      option
        .setName("search_query")
        .setDescription("Enter the search query")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    const searchQuery = interaction.options.getString("search_query");
    const url = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(
      searchQuery
    )}&key=${config.tenor_api_key}&limit=10`;

    axios
      .get(url)
      .then(async (res) => {
        const content = res.data.results[Math.floor(Math.random() * 10)].url;

        const row = new discord.ActionRowBuilder().addComponents(
          new discord.ButtonBuilder()
            .setLabel("GIF Link")
            .setStyle(discord.ButtonStyle.Link)
            .setURL(content)
        );

        await interaction.reply({
          content: content,
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
