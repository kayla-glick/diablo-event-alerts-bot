const { ChannelType, Colors, Events, PermissionFlagsBits } = require('discord.js')
const { DEFAULT_CHANNEL_NAME, DEFAULT_EMOJI_NAME, DEFAULT_ROLE_NAME } = require('../constants')

module.exports = {
  name: Events.GuildCreate,
  once: true,
  execute(guild) {
    if (!guild.channels.cache.find(channel => channel.name === DEFAULT_CHANNEL_NAME)) {
      guild.channels.create({
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
    }

    if (!guild.roles.cache.find(role => role.name === DEFAULT_ROLE_NAME)) {
      guild.roles.create({
        name: DEFAULT_ROLE_NAME,
        color: DEFAULT_ROLE_COLOR
      })
    }

    // Emoji creation isn't working so ignore it for now
    // if (!guild.emojis.cache.find(emoji => emoji.name === DEFAULT_EMOJI_NAME)) {
    //   guild.emojis.create({
    //     name: DEFAULT_EMOJI_NAME,
    //     attachment: 'https://cdn.discordapp.com/emojis/758844313110577162.gif',
    //   })
    // }
  }
}
