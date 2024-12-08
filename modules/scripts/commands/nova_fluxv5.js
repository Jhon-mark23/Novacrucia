const axios = require("axios");

module.exports.config = {
  name: "fluxv5",
  author: "Kenlie Jugarap",
  version: "1.0",
  category: "image-gen-ai",
  description: "Generate an AI image (flux-anime)",
  adminOnly: false,
  usePrefix: true,
  cooldown: 5,
};

module.exports.run = async function ({ event, args }) {
  if (args.length < 1) {
    return api.sendMessage(
      "Usage: fluxv5 <prompt>\nExample: fluxv5 beautiful girl",
      event.sender.id
    );
  }

  const prompt = args.join(" ");

  api.sendMessage("Generating image, please wait...", event.sender.id);

  try {
    const response = await axios.get(`https://api.kenliejugarap.com/flux-anime/?prompt=${encodeURIComponent(prompt)}`);
    const res = response.data;

    if (res.status) {
      await api.sendAttachment("url", res.response, event.sender.id);
    } else {
      api.sendMessage(
        "⚠️ Something went wrong, please contact Kenlie Navacilla Jugarap (https://www.facebook.com/kenlienjugarap) if this error persists.",
        event.sender.id
      );
    }
  } catch (err) {
    api.sendMessage(
      "⚠️ Something went wrong, please contact Kenlie Navacilla Jugarap (https://www.facebook.com/kenlienjugarap) if this error persists.",
      event.sender.id
    );
  }
};