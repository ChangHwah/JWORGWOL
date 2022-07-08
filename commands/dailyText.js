const { SlashCommandBuilder } = require('@discordjs/builders');

const Cheerio = require('cheerio');

const $ = Cheerio.load('<div><h2 class = "primary">First Header</h2><h2>Second Header</h2></div>');

const scrape = () => { 
    $('h2').each((idx, ref) => {
    const elem = $(ref);
    console.info(elem.text())
    })
};
// console.info(firstHeader.text());

module.exports = {
    data: new SlashCommandBuilder()
    .setName('scrape')
    .setDescription('Scrapes the web and returns the information.'),
    // What the Discord bot executes when the command is invoked
    async execute(interaction) {
        await interaction.reply(scrape());
    },
};