const { _ } = require('lodash')
const { parse } = require('node-html-parser')
const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv/config')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

const getBossTimers = async () => {
  const response = await fetch('https://diablo4.life/api/trackers/worldBoss/list')
  const jsonData = await response.json()

  return jsonData.event
}

const formatMessage = (event) => {
  const bossName = event.name
  const startTime = new Date(event.time);
  const location = event.location
  const formattedTime = startTime.toLocaleTimeString('en-us', {
    hour: 'numeric', minute: 'numeric', timeZone: "America/New_York"
  })
  return `
    # <a:alert:1116830883991781376> World Boss Alert <a:alert:1116830883991781376>
    ## ${bossName}
    Starts at ${formattedTime} EST in ${location}
    <@&1116831413791105034>
  `
}

client.on('ready', () => {
  const alerts = {}
  const channel = client.channels.cache.get('1086009931364315136')
  console.log(`Loaded`)
  setInterval(() => {
    console.log(`Checking timers`)
    getBossTimers().then((event) => {
      if (_.isEmpty(event)) {
        console.log("no timers found")
        return
      }

      console.log("found timer")
      const now = new Date()
      if (alerts[event.name] && (now - alerts[event.name] < 60 * 60 * 10000) ) return

      console.log(`alerting for event ${event.name} at ${now}`)
      alerts[event.name] = now
      channel.send(formatMessage(event))
    })
  }, 5 * 60 * 1000) // Every 5 minutes
})

client.login(process.env.TOKEN)
