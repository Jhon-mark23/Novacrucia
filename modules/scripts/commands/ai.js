const axios = require("axios");
const { sendMessage } = require('../handles/sendMessage');


module.exports.config = {
    name: "aitest", // Command name
    author: "mark",
    version: "1.0",
    category: "test",
    description: "Get Reply Message Data",
    adminOnly: false, // if false all users can use this command but if true only the admin id lists on config.json can use
    usePrefix: true, // if true it uses the command with the prefix example /testsendimage-url but if false no need prefix can direct use testsendimage-url
    cooldown: 5, // cooldown on how many command to be used
};

module.exports.run = async function ({ bot, args, authToken, event }) {
    if (!event?.sender?.id) {
      console.error('Invalid event object: Missing sender ID.');
      sendMessage(bot, { text: 'Error: Missing sender ID.' }, authToken);
      return;
    }

    const senderId = event.sender.id;
    const userPrompt = args.join(" ");
    const repliedMessage = event.message.reply_to?.message || ""; // Get the replied message content
    const finalPrompt = repliedMessage ? `${repliedMessage} ${userPrompt}`.trim() : userPrompt; // Combine reply + user input

    if (!finalPrompt) {
      return sendMessage(bot, { text: "Please enter your question or reply with an image to analyze." }, authToken);
    }

    try {
      const imageUrl = await extractImageUrl(event, authToken);

      if (imageUrl) {
        // If an image is detected, use Gemini Vision API
        const apiUrl = `https://kaiz-apis.gleeze.com/api/gemini-vision`;
        const response = await handleImageRecognition(apiUrl, finalPrompt, imageUrl, senderId);
        const result = response.response;

        const visionResponse = `🌌 𝐆𝐞𝐦𝐢𝐧𝐢 𝐀𝐧𝐚𝐥𝐲𝐬𝐢𝐬\n━━━━━━━━━━━━━━━━━━\n${result}`;
        sendLongMessage(bot, visionResponse, authToken);
      } else {
        // If no image, use GPT API
        const apiUrl = "https://rest-api-french3.onrender.com/api/clarencev2";
        const response = await axios.get(apiUrl, {
          params: {
            prompt: finalPrompt,
            uid: senderId
          }
        });
        const gptMessage = response.data.response;

        const gptResponse = `${gptMessage}`;
        sendLongMessage(bot, gptResponse, authToken);
      }
    } catch (error) {
      console.error("Error in AI command:", error);
      sendMessage(bot, { text: `Error: ${error.message || "Something went wrong."}` }, authToken);
    }
  }
};

async function handleImageRecognition(apiUrl, prompt, imageUrl, senderId) {
  try {
    const { data } = await axios.get(apiUrl, {
      params: {
        q: prompt,
        uid: senderId,
        imageUrl: imageUrl || ""
      }
    });
    return data;
  } catch (error) {
    throw new Error("Failed to connect to the Gemini Vision API.");
  }
}

async function extractImageUrl(event, authToken) {
  try {
    if (event.message?.reply_to?.mid) {
      return await getRepliedImage(event.message.reply_to.mid, authToken);
    } else if (event.message?.attachments?.[0]?.type === 'image') {
      return event.message.attachments[0].payload.url;
    }
  } catch (error) {
    console.error("Failed to extract image URL:", error);
  }
  return "";
}

async function getRepliedImage(mid, authToken) {
  try {
    const { data } = await axios.get(`https://graph.facebook.com/v21.0/${mid}/attachments`, {
      params: { access_token: authToken }
    });
    return data?.data[0]?.image_data?.url || "";
  } catch (error) {
    throw new Error("Failed to retrieve replied image.");
  }
}

function sendLongMessage(bot, text, authToken) {
  const maxMessageLength = 2000;
  const delayBetweenMessages = 1000;

  if (text.length > maxMessageLength) {
    const messages = splitMessageIntoChunks(text, maxMessageLength);
    sendMessage(bot, { text: messages[0] }, authToken);

    messages.slice(1).forEach((message, index) => {
      setTimeout(() => sendMessage(bot, { text: message }, authToken), (index + 1) * delayBetweenMessages);
    });
  } else {
    sendMessage(bot, { text }, authToken);
  }
}

function splitMessageIntoChunks(message, chunkSize) {
  const regex = new RegExp(`.{1,${chunkSize}}`, 'g');
  return message.match(regex);
}