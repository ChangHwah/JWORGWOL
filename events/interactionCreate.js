// "module.exports" is how you export data in Node.js so that you can "require()" it in other files. If you need to access your client instance from inside a command file, you can access it via "interaction.client". If you need to access external files, packages, etc., you should "require()"" them at the top of the file.
module.exports = {
    // The "name" property states which event this file is for. The "execute" function is for your event logic, which will be called by the event handler whenever the event emits.
    name: 'interactionCreate',
    execute(interaction) {
        console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
    },
};