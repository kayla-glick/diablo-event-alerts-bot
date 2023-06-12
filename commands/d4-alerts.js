const {
  ActionRowBuilder,
  ComponentType,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder
} = require('discord.js')
const {
  AVAILABLE_ROLES,
  ROLE_NAME_HELLTIDE,
  ROLE_NAME_LEGION,
  ROLE_NAME_WORLD_BOSS,
} = require('../constants')

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
            .setValue(ROLE_NAME_HELLTIDE),
      new StringSelectMenuOptionBuilder()
            .setLabel('Legion Alerts')
            .setDescription('Receive alerts for Legion events.')
            .setValue(ROLE_NAME_LEGION),
      new StringSelectMenuOptionBuilder()
            .setLabel('World Boss Alerts')
            .setDescription('Receive alerts for World Boss events.')
            .setValue(ROLE_NAME_WORLD_BOSS),
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
      for await (const roleName of AVAILABLE_ROLES) {
        const role = await interaction.guild.roles.cache.find(role => role.name === roleName)

        if (i.values.includes(roleName)) {
          // Give the user the roles they selected
          await interaction.member.roles.add(role)
        } else {
          // Remove the roles they did not select
          await interaction.member.roles.remove(role)
        }
      }

      i.reply({ content: 'Done', ephemeral: true })
    })
	},
}
