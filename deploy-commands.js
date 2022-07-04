// "fs" is Node's native file system module.
const fs = require('node:fs');
// "path" is Node's native path utility module. It helps construct paths to access files and directories. Instead of manually writing './currentDirectory/fileYouWant' everywhere, one can instead use "path.join()"" and pass each path segment as an argument. Note however, you should omit '/' or other path segment joiners as these may be different depending on the operating system running your code. One of the advantages of the "path" module is that it automatically detects the operating system and uses the appropriate joiners.
const path = require('node:path');

// REST API specifically for Discord's library
const { REST } = require('@discordjs/rest');
// You can only import this module by specifying the API version you want to target. Append /v* to the import path, where the * represents the API version. More info: https://github.com/discordjs/discord-api-types/
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require ('./config.json');

const commands = [];
// You'll need to get the path to the directory that stores your command files. The node core module 'path' and it's "join()" method will help to construct a path and store it in a constant so you can reference it later.
const commandsPath = path.join(__dirname, 'commands');
// the "fs.readdirSync()" (aka read-directory-synchronously) method will return an array of all the file names in the directory, e.g. ['ping.js', 'beep.js']. To ensure only command files get returned, use "Array.filter()" to leave out any non-JavaScript files from the array.
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// We use Use the same approach in our "deploy-commands.js" file as our "index.js", but instead we ".push()" to the "commands" array with the JSON data for each command.
for(const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // We ".push()" to the "commands" array with the JSON data for each command.
    commands.push(command.data.toJSON());
}

const rest = new REST ({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);