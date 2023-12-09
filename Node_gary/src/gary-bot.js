// gary-bot.js
require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const { handleOpenAIRequest } = require('./needed_openai');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

// Function to handle a soft reset
async function softReset() {
  console.log('Soft reset initiated. Saving data or performing cleanup tasks...');
}

// Use values from the .env file
const yourServerID = process.env.YOUR_SERVER_ID;
const specificChannelID = process.env.SPECIFIC_CHANNEL_ID;
const yourOwnerID = process.env.YOUR_OWNER_ID;

const commandFiles = ['respond']; // Add more command file names here if needed

for (const file of commandFiles) {
  const command = require(`./commands/${file}.js`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!Gary')) {
    const prompt = message.content.slice('!Gary'.length).trim();
    try {
      const response = await handleOpenAIRequest(prompt);
      // Reply to the user with the generated response
      message.reply(response);
    } catch (error) {
      console.error('Error handling OpenAI request:', error);
      message.reply('There was an error handling the OpenAI request!');
    }
  }

  // Check if the message is from the specific channel and server
  if (message.guild && message.guild.id === yourServerID && message.channel.id === specificChannelID) {
    if (message.content.toLowerCase().includes('who is your creator') || message.content.toLowerCase().includes('who is your owner')) {
      // Respond with the creator's ID
      message.reply(`I was created by <@${yourOwnerID}>!`);
    } else if (message.author.id === yourOwnerID) {
      // This is your owner's message in the specific channel
      // You can add your specific logic here
    } else {
      // Handle other user messages in the specific channel
      // You can add additional logic here if needed
    }
  }
});

client.login(process.env.YOUR_BOT_TOKEN_HERE);
