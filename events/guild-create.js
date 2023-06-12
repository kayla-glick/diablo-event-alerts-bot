const { ChannelType, Colors, Events, PermissionFlagsBits } = require('discord.js')
const { DEFAULT_CHANNEL_NAME, DEFAULT_ROLE_COLOR, DEFAULT_ROLE_NAME } = require('../constants')

module.exports = {
  name: Events.GuildCreate,
  once: true,
  async execute(guild) {
    console.log(`Invited to server ${guild.name}`)
    if (!guild.channels.cache.find(channel => channel.name === DEFAULT_CHANNEL_NAME)) {
      await guild.channels.create({
        name: DEFAULT_CHANNEL_NAME,
        type: ChannelType.GuildText,
        permission_overwrites: [
          {
            id: guild.roles.everyone,
            deny: [PermissionFlagsBits.SendMessages],
          },
          {
            id: guild.client.user.id,
            allow: [PermissionFlagsBits.SendMessages]
          },
        ]
      })
      console.log(`Created channel in ${guild.name}`)
    }

    await guild.roles.create({
      name: DEFAULT_ROLE_NAME,
      color: DEFAULT_ROLE_COLOR
    })

    console.log(`Created role in ${guild.name}`)
  }
}
