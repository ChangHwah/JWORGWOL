const { SlashCommandBuilder } = require('@discordjs/builders');

const cheerio = require('cheerio');
const axios = require('axios');

const scrapeData = async () => {
    const targetUrl = "https://wol.jw.org/en/wol/h/r1/lp-e";
    const pageResponse = await axios.get(targetUrl);
    const $ = cheerio.load(pageResponse.data);
    let scrapeTest = $(`<div class="tabContent active>`);
    console.log(scrapeTest.text());
    return scrapeTest.text();
}

module.exports = {
    data: new SlashCommandBuilder()
    .setName('scrape')
    .setDescription('Scrapes the web and returns the information.'),
    // What the Discord bot executes when the command is invoked
    async execute(interaction) {
        await interaction.reply(`Here is your result: ${await scrapeData()}`);
    },
};
