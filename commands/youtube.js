const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("youtube")
    .setDescription("Returns with a YouTube link"),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    await interaction.reply({
      content: "https://youtube.com/c/AshusCoding",
    });
  },
};
