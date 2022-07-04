// "fs" is Node's native file system module.
const fs = require('node:fs');

// "path" is Node's native path utility module. It helps construct paths to access files and directories. Instead of manually writing './currentDirectory/fileYouWant' everywhere, one can instead use "path.join()"" and pass each path segment as an argument. Note however, you should omit '/' or other path segment joiners as these may be different depending on the operating system running your code. One of the advantages of the "path" module is that it automatically detects the operating system and uses the appropriate joiners.
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json')

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Attaching a ".commands" property to your client instance so that you can access your commands in other files. "Collection" is a class that extends JavaScript's native "Map" class, and includes more extensive, useful functionality.
client.commands = new Collection()

// You'll need to get the path to the directory that stores your command files. The node core module 'path' and it's "join()" method will help to construct a path and store it in a constant so you can reference it later.
const commandsPath = path.join(__dirname, 'commands');
// the "fs.readdirSync()" (aka read-directory-synchronously) method will return an array of all the file names in the commands directory, e.g. ['ping.js', 'beep.js']. To ensure only command files get returned, use "Array.filter()" to leave out any non-JavaScript files from the array.
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
// With that array, loop over it and dynamically set your commands to the "client.commands" Collection.
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}


const eventsPath = path.join(__dirname, 'events');
// the "fs.readdirSync()" (aka read-directory-synchronously) method will return an array of all the file names in the events directory, e.g. ['ready.js', 'interactionCreate.js']. To ensure only command files get returned, use "Array.filter()" to leave out any non-JavaScript files from the array.
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        // The "Client" class in discord.js extends the "EventEmitter" class. Therefore, the "client" object exposes the ".on()" and ".once()" methods that you can use to register event listeners. These methods take two arguments: the event name and a callback function.
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        // The callback function passed takes argument(s) returned by its respective event, collects them in an "args" array using the ((...) "rest parameter syntax")
        // Then calls "event.execute()" while passing in the "args" array using the ((...) "spread syntax")
        client.on(event.name, (...args) => event.execute(...args));
        // They are used here because different events in discord.js have different numbers of arguments. The rest parameter (event.name, (...args)) collects these variable number of arguments into a single array, and the spread syntax (event.execute(...args)) then takes these elements and passes them to the "execute" function.
        // In most cases, you can access your "client" instance in other files by obtaining it from one of the other discord.js structures, e.g. "interaction.client" in the "interactionCreate" event.
    }
}

// Client on interaction create listens for interactions sent by users
client.on('interactionCreate', async interaction => {
    // Checking if interaction is a command. If it is not a command, return.
    if (!interaction.isCommand()) return;
    
    // First, fetch the command in the Collection with that name and assign it to the variable "command".
    const command = client.commands.get(interaction.commandName);

    // If the command doesn't exist, it will return undefined, so exit early with return.
    if (!command) return;

    // If the command does exist, call the command's ".execute()" method, and pass in the interaction variable as its argument.
    try {
        await command.execute(interaction);
    } catch (error) {
        // In case something goes wrong, log the error and report back to the member to let them know.
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true});
    }
    // Whenever you want to add a new command, make a new file in your "commands" directory, name it the same as the slash command, and then do what you did for the other commands. Remember to run "node deploy-commands.js" to register your commands!
});

// Login to Discord with your client's token
client.login(token);