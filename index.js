const request = require("axios");
const util = require("util");
const parseString = util.promisify(require("xml2js").parseString);
const Discord = require("discord.js");
const client = new Discord.Client();

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
  const json = await parseString(xml, { explicitArray: false });
  return [].concat(json.AircraftItems.Aircraft);
};

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", async (message) => {
  if (message.content === "/getac") {
    const aircraft = await getAircraft();
    message.channel.send(`Aircraft available:
\`\`\`
${JSON.stringify(aircraft, null, 2)}
\`\`\`
  `);
  }
});

client.login(process.env.DISCORD_TOKEN);
