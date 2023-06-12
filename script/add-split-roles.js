const { Events } = require('discord.js')
const { client } = require('../client')
const { DEFAULT_ROLE_COLOR, ROLE_NAME_HELLTIDE, ROLE_NAME_LEGION, ROLE_NAME_WORLD_BOSS } = require('../constants')

client.on(Events.ClientReady, () => {
  console.log('Finding guilds')
  client.guilds.cache.forEach(async (guild) => {
    console.log(`Guild: ${guild.name}`)
    const roles = guild.roles.cache
  
    if (!await roles.find(role => role.name === ROLE_NAME_HELLTIDE)) {
      console.log('Adding Helltide')
      await guild.roles.create({
        name: ROLE_NAME_HELLTIDE,
        color: DEFAULT_ROLE_COLOR
      })
    }
  
    if (!await roles.find(role => role.name === ROLE_NAME_LEGION)) {
      console.log('Adding Legion')
      await guild.roles.create({
        name: ROLE_NAME_LEGION,
        color: DEFAULT_ROLE_COLOR
      })
    }
  
    if (!await roles.find(role => role.name === ROLE_NAME_WORLD_BOSS)) {
      console.log('Adding World Boss')
      await guild.roles.create({
        name: ROLE_NAME_WORLD_BOSS,
        color: DEFAULT_ROLE_COLOR
      })
    }
  })
  
})
