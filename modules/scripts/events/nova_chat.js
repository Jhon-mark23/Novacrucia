const axios = require('axios');

module.exports.config = {
  name: 'ChatGPT4o',
  author: 'Kenlie Jugarap',
  version: '1.0',
  description: 'ChatGPT4o Chat',
  selfListen: false,
};

module.exports.run = async function({ event }) {
  if (event.type === 'message') {
    try {
      const response = await axios.get(`https://api.kenliejugarap.com/blackbox-gpt4o/?text=${encodeURIComponent(event.message.text)}`);
      const res = response.data;

      if (res.status) {
        api.sendMessage(res.response, event.sender.id);
      } else {
        api.sendMessage(
          "Something went wrong, please contact Kenlie Navacilla Jugarap (https://www.facebook.com/kenlienjugarap) to get this fixed.",
          event.sender.id
        );
      }
    } catch (err) {
      api.sendMessage(
        "Something went wrong, please contact Kenlie Navacilla Jugarap (https://www.facebook.com/kenlienjugarap) to get this fixed.",
        event.sender.id
      );
    }
  }
};