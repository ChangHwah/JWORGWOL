// Require the necessary discord.js classes
const { timeStamp } = require('console');
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json')

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Client on interaction create listens for interactions sent by users
client.on('interactionCreate', async interaction => {
    // Checking if interaction is a command. If it is not a command, end script.
    if (!interaction.isCommand()) return;
    // If interaction is a command, check the command name property to know which command it is
    const { commandName } = interaction;

    if (commandName === 'ping') {
        // When a user uses command 'ping', the bot replies to that interaction by saying 'Pong!'
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        // Discord servers are referred to as "guilds" in the Discord API and discord.js library. "interaction.guild" refers to the guild the interaction was sent in, which exposes the properties such as ".name" or ".memberCount"
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}\nServer creation date: ${interaction.guild.createdAt}`);
    } else if (commandName === 'user') {
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}\nAccount creation date: ${interaction.user.createdAt}`);
    }
});

// Login to Discord with your client's token
client.login(token);