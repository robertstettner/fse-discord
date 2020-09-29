const request = require("axios");
const xml2js = require("xml2js");
const Discord = require("discord.js");

const { parseStringPromise } = new xml2js.Parser({ explicitArray: false });

const userkey = process.env.USER_KEY;
const readaccesskey = process.env.GROUP_KEY;

const url = "https://server.fseconomy.net/data";

const defaultParams = {
  format: "xml",
  query: "aircraft",
  search: "key",
};

const getAircraft = async () => {
  const { data: xml } = await request.get(url, {
    params: {
      userkey,
      readaccesskey,
      ...defaultParams,
    },
  });
  return await parseAircraft(xml);
};

const parseAircraft = async (xml) => {
  const json = await parseStringPromise(xml);
  return [].concat(json.AircraftItems.Aircraft);
};

if (require.main === module) {
  const client = new Discord.Client();

  client.on("ready", () => {
    console.log("I am ready!");
  });

  client.on("message", async (message) => {
    if (message.content === "/getac") {
      const aircraft = await getAircraft();
      const aircraftEmbed = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Some title")
        .setURL("https://discord.js.org/")
        .setAuthor(
          "Some name",
          "https://i.imgur.com/wSTFkRM.png",
          "https://discord.js.org"
        )
        .setDescription("Some description here")
        .setThumbnail("https://i.imgur.com/wSTFkRM.png")
        .addFields(
          { name: "Regular field title", value: "Some value here" },
          { name: "\u200B", value: "\u200B" },
          {
            name: "Inline field title",
            value: "Some value here",
            inline: true,
          },
          { name: "Inline field title", value: "Some value here", inline: true }
        )
        .addField("Inline field title", "Some value here", true)
        .setImage("https://i.imgur.com/wSTFkRM.png")
        .setTimestamp()
        .setFooter("Some footer text here", "https://i.imgur.com/wSTFkRM.png");

      message.channel.send(aircraftEmbed);
    }
  });

  client.login(process.env.DISCORD_TOKEN);
}

module.exports = {
  parseAircraft,
};
