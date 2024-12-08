const axios = require('axios');

module.exports.config = {
  name: "claude",
  author: "Kenlie Jugarap",
  version: "1.0",
  category: "ai",
  description: "Get answers from the ai (blackbox-claude).",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5,
};

module.exports.run = function ({ event, args }) {
  if (args.length < 1) { 
    return api.sendMessage(
      "Usage: Claude <question>\nExample: Claude what is life?",
      event.sender.id
    );
  }

  const question = args.join(" ");

  api.sendMessage("Answering your questions, please wait...", event.sender.id);

  axios
    .get(`https://api.kenliejugarap.com/blackbox-claude/?text=${encodeURIComponent(question)}`)
    .then((response) => {
      const res = response.data;

      if (res.status) {
        api.sendMessage(res.response, event.sender.id);
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