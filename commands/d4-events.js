const { SlashCommandBuilder } = require('discord.js')
const { DEFAULT_ROLE_NAME } = require('../constants')

const commandBuilder = new SlashCommandBuilder()
commandBuilder.setName('d4-alerts')
commandBuilder.setDescription('Subscribe or unsubscribe to Diablo 4 Event Alerts')

module.exports = {
	data: commandBuilder,
	async execute(interaction) {
    console.log("Received command")

    const roleSelections = [
      new StringSelectMenuOptionBuilder()
            .setLabel('Helltide Alerts')
            .setDescription('Receive alerts for Helltide events.')
            .setValue('helltide'),
      new StringSelectMenuOptionBuilder()
            .setLabel('Legion Alerts')
            .setDescription('Receive alerts for Legion events.')
            .setValue('legion'),
      new StringSelectMenuOptionBuilder()
            .setLabel('World Boss Alerts')
            .setDescription('Receive alerts for World Boss events.')
            .setValue('world_boss'),
    ]
    
    const select = new StringSelectMenuBuilder()
          .setCustomId('starter')
          .setPlaceholder('Make a selection!')
          .addOptions(...roleSelections)
          .setMinValues(0)
          .setMaxValues(roleSelections.length)
    
    const row = new ActionRowBuilder().addComponents(select)

    response = await interaction.reply({
			content: 'Choose which alerts to receive:',
			components: [row],
		});
    
    const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 60_000 });
    collector.on('collect', async i => {
      i.values
      for (const selection in i.values) {

      }
      const selection = i.values[0]
      await i.reply(`${i.user} has selected ${selection}!`)
    })

    const role = interaction.guild.roles.cache.find(role => role.name === DEFAULT_ROLE_NAME)
    const action = interaction.options.getString('action')

    if (action === 'subscribe') interaction.member.roles.add(role)
    if (action === 'unsubscribe') interaction.member.roles.remove(role)

    interaction.reply({ content: 'Done', ephemeral: true })
	},
}
