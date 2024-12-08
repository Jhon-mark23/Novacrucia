const axios = require('axios');

module.exports.config = {
  name: "shoti",
  author: "Kenlie Jugarap",
  version: "1.0",
  category: "downloader",
  description: "Fetches a video using the Shoti API.",
  adminOnly: false,
  usePrefix: false,
  cooldown: 5,
};

module.exports.run = function ({ event }) {
  api.sendMessage("Fetching video, please wait...", event.sender.id);

  axios
    .get(`https://shoti.kenliejugarap.com/getvideo.php?apikey=shoti-4706a458623311b8fe0976a60d8fbc18326f0bfa67404039e457078865a4670581f14fbb4c886e4b882239fcea2954a0f6274aa9111bc02bfd2bd6e26879aad9adb2ee45c3c380a8ec1c4348970c3da5addcb89d04`)
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
                url: res.videoDownloadLink,
                is_reusable: true
              }
            },
            quick_replies: [
              {
                content_type: "text",
                title: "More Shoti",
                payload: "MORE_SHOTI"
              }
            ]
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
      api.sendMessage(
        "⚠️ Something went wrong, please contact Kenlie Navacilla Jugarap (https://www.facebook.com/kenlienjugarap) if this error persists.",
        event.sender.id
      );
    });
};