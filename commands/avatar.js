const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get a user's avatar")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select a user").setRequired(false)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let user = interaction.options.getUser("user") || interaction.user;
    let userAvatar = user.displayAvatarURL({ size: 512 });

    const embed = new discord.EmbedBuilder()
      .setColor("Aqua")
      .setTitle(`${user.tag}'s Avatar`)
      .setImage(`${userAvatar}`)
      .setTimestamp();

    const button = new discord.ButtonBuilder()
      .setLabel("Avatar Link")
      .setStyle(discord.ButtonStyle.Link)
      .setURL(`${user.avatarURL({ size: 512 })}`);

    const row = new discord.ActionRowBuilder().addComponents(button);

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
