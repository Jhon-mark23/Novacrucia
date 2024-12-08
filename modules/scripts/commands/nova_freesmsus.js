const axios = require('axios');

module.exports.config = {
  name: "freesmsus",
  author: "Kenlie Jugarap",
  version: "1.0",
  category: "sms",
  description: "Sends a free SMS message in US (United States).",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5,
};

module.exports.run = function ({ event, args }) {
  if (args.length < 2) { 
    return api.sendMessage(
      "Usage: freesmsus <number> <message>\nExample: freesmsus 12345678910 Hello, this is a test message!",
      event.sender.id
    );
  }

  const number = args[0];
  const message = args.slice(1).join(" ");

  if (!/^1\d{10}$/.test(number)) {
    return api.sendMessage(
      "❌ Number must start with 1 and must be 11 digits, example:\n12345678910",
      event.sender.id
    );
  }

  api.sendMessage("Sending message, please wait...", event.sender.id);

  axios
    .get(`https://api.kenliejugarap.com/freesmslbc-us/?number=${number}&message=${encodeURIComponent(message)}`)
    .then((response) => {
      const res = response.data;

      if (res.status) {
        api.sendButton(
          `📩 FreeSMS United States Response\n\n✅ Response: ${res.response}\n📶 Sim Network: ${res.sim_network.replace("USA_", "")}`,
          [
            {
              type: "web_url",
              url: "https://api.kenliejugarap.com/",
              title: "Check Free API Here",
            },
          ],
          event.sender.id
        );
      } else {
        api.sendMessage(
          "⚠️ Something went wrong, please contact Kenlie Navacilla Jugarap (https://www.facebook.com/kenlienjugarap) to get this fixed.",
          event.sender.id
        );
      }
    })
    .catch((err) => {
      api.sendMessage(
        "⚠️ Something went wrong, please contact Kenlie Navacilla Jugarap (https://www.facebook.com/kenlienjugarap) to get this fixed.",
        event.sender.id
      );
    });
};