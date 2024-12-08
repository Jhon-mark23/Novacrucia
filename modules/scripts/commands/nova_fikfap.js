const axios = require("axios");

module.exports.config = {
  name: "fikfap",
  author: "Kenlie Jugarap",
  version: "1.0",
  category: "18+",
  description: "Fetches a video from FikFap",
  adminOnly: true,
  usePrefix: false,
  cooldown: 5,
};

module.exports.run = function ({ event }) {
  api.sendMessage("Fetching video, please wait...", event.sender.id);

  axios
    .get(
      `https://apiv2.kenliejugarap.com/fikfap`
    )
    .then((response) => {
      const res = response.data;

      if (res.status) {
        api.graph({
            recipient: {
              id: event.sender.id
            },
            message: {
              attachment: {
                type: 'video',
                payload: {
                  url: res.video,
                  is_reusable: true
                }
              }
            }
          });
      } else {
        api.sendMessage(
          "⚠️ Something went wrong, please contact Kenlie Navacilla Jugarap (https://www.facebook.com/kenlienjugarap) if this error persists.",
          event.sender.id
        );
      }
    })
    .catch((err) => {
      console.error("Error fetching video:", err);
      api.sendMessage(
        "⚠️ Something went wrong, please contact Kenlie Navacilla Jugarap (https://www.facebook.com/kenlienjugarap) if this error persists.",
        event.sender.id
      );
    });
};