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
  const response = await fetch('https://diablo4.life/trackers/world-bosses')
    .then((response) => {
      const reader = response.body.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump() {
            return reader.read().then(({ done, value }) => {
              // When no more data needs to be consumed, close the stream
              if (done) {
                controller.close();
                return;
              }
              // Enqueue the next data chunk into our target stream
              controller.enqueue(value);
              return pump();
            });
          }
        },
      });
    })
    // Create a new response out of the stream
    .then((stream) => new Response(stream))
    .then((response) => response.text())
  
  const root = parse(response)
  root.querySelectorAll('[class*="EventCountdown_content"]')
  return('Sorry! I\'m not ready yet.')
}

client.on('ready', () => {
  console.log('Bot is ready')
})

client.on('messageCreate', message => {
  if (message.content === '!bosstimer') {
    getBossTimers().then((timers) => {
      console.log(timers)
      message.reply(timers)
    })
  }
})

client.login(process.env.TOKEN)
