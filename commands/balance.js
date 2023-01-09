const schema = require("../schemas/currencySchema");
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("balance")
    .setDescription("Shows the balance of an user")
    .addUserOption((option) =>
      option.setName("user").setDescription("Select an user").setRequired(false)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(client, interaction) {
    let user = interaction.options.getUser("user") || interaction.user;

    let data;
    try {
      data = await schema.findOne({
        userId: user.id,
        guildId: interaction.guild.id,
      });

      if (!data) {
        data = await schema.create({
          userId: user.id,
          guildId: interaction.guild.id,
        });
      }
    } catch (err) {
      console.log(err);
    }

    const balanceEmbed = new discord.EmbedBuilder()
      .setColor("Blurple")
      .setThumbnail(
        user.displayAvatarURL({
          size: 256,
        })
      )
      .setTitle(`__${user.username}'s Balance__`)
      .setDescription(
        `:coin: Wallet: **${data.wallet.toLocaleString()}**\n:coin: Bank: **${data.bank.toLocaleString()}**`
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [balanceEmbed],
    });
  },
};
