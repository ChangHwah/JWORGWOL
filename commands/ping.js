// The slash command builder from "@discordjs/builders" is used to build the data for your commands
const { SlashCommandBuilder } = require('@discordjs/builders');

// "module.exports" is how you export data in Node.js so that you can "require()" it in other files. If you need to access your client instance from inside a command file, you can access it via "interaction.client". If you need to access external files, packages, etc., you should "require()"" them at the top of the file.
module.exports = {
    data: new SlashCommandBuilder()
    // Name of command
    .setName('ping')
    // Description of command
    .setDescription('Replies with Pong!'),
    // What the Discord bot executes when the command is invoked
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};