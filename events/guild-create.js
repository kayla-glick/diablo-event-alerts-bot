const { ChannelType, Events, PermissionFlagsBits } = require('discord.js')
const {
  DEFAULT_CHANNEL_NAME,
  DEFAULT_CHANNEL_TOPIC,
  DEFAULT_ROLE_COLOR,
  ROLE_NAME_HELLTIDE,
  ROLE_NAME_LEGION,
  ROLE_NAME_WORLD_BOSS
} = require('../constants')

module.exports = {
  name: Events.GuildCreate,
  once: true,
  async execute(guild) {
    console.log(`Invited to server ${guild.name}`)
    if (!await guild.channels.cache.find(channel => channel.name === DEFAULT_CHANNEL_NAME)) {
      await guild.channels.create({
        name: DEFAULT_CHANNEL_NAME,
        topic: DEFAULT_CHANNEL_TOPIC,
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

    const roles = guild.roles.cache

    if (!await roles.find(role => role.name === ROLE_NAME_HELLTIDE)) {
      await guild.roles.create({
        name: ROLE_NAME_HELLTIDE,
        color: DEFAULT_ROLE_COLOR
      })
    }
  
    if (!await roles.find(role => role.name === ROLE_NAME_LEGION)) {
      await guild.roles.create({
        name: ROLE_NAME_LEGION,
        color: DEFAULT_ROLE_COLOR
      })
    }
  
    if (!await roles.find(role => role.name === ROLE_NAME_WORLD_BOSS)) {
      await guild.roles.create({
        name: ROLE_NAME_WORLD_BOSS,
        color: DEFAULT_ROLE_COLOR
      })
    }

    console.log(`Created roles in ${guild.name}`)
  }
}
