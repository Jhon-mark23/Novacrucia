const axios = require('axios');

module.exports.config = {
  name: "freesmsph",
  author: "Kenlie Jugarap",
  version: "1.0",
  category: "sms",
  description: "Sends a free SMS message.",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5,
};

module.exports.run = function ({ event, args }) {
  if (args.length < 2) { 
    return api.sendMessage(
      "Usage: freesmsph <number> <message>\nExample: freesmsph 09123456789 Hello, this is a test message!",
      event.sender.id
    );
  }

  const number = args[0];
  const message = args.slice(1).join(" ");

  if (!/^0[89]\d{9}$/.test(number)) {
    return api.sendMessage(
      "❌ Number must start with 09 or 08 and must be 11 digits, example:\n09123456789",
      event.sender.id
    );
  }

  api.sendMessage("Sending message, please wait...", event.sender.id);

  axios
    .get(`https://api.kenliejugarap.com/freesmslbc/?number=${number}&message=${encodeURIComponent(message)}`)
    .then((response) => {
      const res = response.data;

      if (res.status) {
        api.sendButton(
          `📩 FreeSMS Philippines Response\n\n✅ Response: ${res.response}\n📶 Sim Network: ${res.sim_network.replace("PHL_", "")}`,
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