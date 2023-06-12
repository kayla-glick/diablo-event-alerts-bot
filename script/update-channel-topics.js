const { Events } = require('discord.js')
const { client } = require('../client')
const { DEFAULT_CHANNEL_NAME, DEFAULT_CHANNEL_TOPIC } = require('../constants')

client.on(Events.ClientReady, () => {
  client.guilds.cache.forEach(async (guild) => {
    console.log(`Updating guild ${guild.name}`)

    const channel = guild.channels.cache.find(c => c.name === DEFAULT_CHANNEL_NAME)

    if (channel) {
      await channel.setTopic(DEFAULT_CHANNEL_TOPIC)
      console.log("Updated channel")
    }
  })
})
