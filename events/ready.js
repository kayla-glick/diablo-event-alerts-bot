const { Events } = require('discord.js')
const { _ } = require('lodash')
const { DEFAULT_CHANNEL_NAME, DEFAULT_ROLE_NAME } = require('../constants')

const eventName = {
  'worldBoss': 'World Boss'
}

const getTimers = async (type) => {
  const response = await fetch(`https://diablo4.life/api/trackers/${type}/list`)
  const jsonData = await response.json()

  return jsonData.event
}

const formatMessage = (event, guild) => {
  const bossName = event.name
  const location = event.location
  const role = guild.roles.cache.find(role => role.name === DEFAULT_ROLE_NAME ) ?? ""
  // Convert ms to s for Discord's formatting
  const formattedStartTime = (event.time / 1000)

  return `
# ${bossName}
Starts at <t:${formattedStartTime}:t> ${location}
${role}
  `
}

const listenForTimers = (client, eventType) => {
  console.log(`Listening for ${eventType} timers`)
  const alerts = {}
  setInterval(() => {
    console.log(`Checking for ${eventType} timers`)
    getTimers(eventType).then((event) => {
      if (_.isEmpty(event)) {
        console.log("no timers found")
        return
      }

      if (event.name === "Unknown World Boss") return

      console.log(`Found ${eventType} timer`)
      const now = new Date()

      // Don't alert if we already alerted for this event within the past hour
      if (alerts[event.name] && (now - alerts[event.name] < 60 * 60 * 10000) ) return

      console.log(`Alerting for event ${event.name} at ${new Date(event.time)} EST`)

      // Keep a record of when the event was last alerted to prevent spam
      alerts[event.name] = now

      client.guilds.cache.forEach(async (guild) => {
        const channel = guild.channels.cache.find(channel => channel.name === DEFAULT_CHANNEL_NAME)

        if (channel) channel.send(formatMessage(event, guild))
      })
    })
  }, 5 * 60 * 1000) // Every 5 minutes
}

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log("D4 Events Bot loaded")
    listenForTimers(client, 'worldBoss')
    listenForTimers(client, 'zoneEvent')
    listenForTimers(client, 'helltide')
  }
}
