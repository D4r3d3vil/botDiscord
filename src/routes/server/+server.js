import { Client, GatewayIntentBits } from 'discord.js';
import { json } from '@sveltejs/kit';
import dotenv from 'dotenv';
dotenv.config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
});
const guilds = []
client.once('ready', () => {
  client.guilds.cache.forEach(guild => {
    guilds.push({id:guild.id, name:guild.name});
  })
});
export async function GET() {
  return json(guilds)
}
export async function POST({request, cookies}) {
  const data = await request.json();
  data.guilds.forEach(guild=>{
    guild = client.guilds.cache.get(guild);
    const channels = guild.channels.cache; 
    for (let channel of channels) { 
      if (channel[1].name === data.channel) {
        channel[1].send(data.message)
      }
    }
  })
  return json({status: 200})
}
client.login(process.env.BOT_TOKEN);