const { SlashCommandBuilder } = require('discord.js')
const { DEFAULT_ROLE_NAME } = require('../constants')

const commandBuilder = new SlashCommandBuilder()
commandBuilder.setName('d4-alerts')
commandBuilder.setDescription('Subscribe or unsubscribe to Diablo 4 Event Alerts')
commandBuilder.addStringOption(option => {
  return option.setName('action').setDescription('Subscribe or unsubscribe').addChoices(
    { name: 'subscribe', value: 'subscribe' },
    { name: 'unsubscribe', value: 'unsubscribe' }
  )
})

module.exports = {
	data: commandBuilder,
	execute(interaction) {
    console.log("Received command")
    const role = interaction.guild.roles.cache.find(role => role.name === DEFAULT_ROLE_NAME)
    const action = interaction.options.getString('action')

    if (action === 'subscribe') interaction.member.roles.add(role)
    if (action === 'unsubscribe') interaction.member.roles.remove(role)

    interaction.reply({ content: 'Done', ephemeral: true })
	},
}
