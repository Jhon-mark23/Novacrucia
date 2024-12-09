const axios = require('axios');
 
module.exports.config = {
    name: "testgemini", // Command name
    author: "mark",
    version: "1.0",
    category: "test",
    description: "gemini",
    adminOnly: false, // if false all users can use this command but if true only the admin id lists on config.json can use
    usePrefix: true, // if true it uses the command with the prefix example /testsendimage-url but if false no need prefix can direct use testsendimage-url
    cooldown: 5, // cooldown on how many command to be used
};

module.exports.run = async function ({ api, event, args }) {
    const prompt = args.join(" ");

    if (!prompt) {
        return api.sendMessage('only works in photo', event.threadID, event.messageID);
    }

    if (event.type !== "message_reply" || !event.messageReply.attachments[0] || event.messageReply.attachments[0].type !== "photo") {
        return api.sendMessage('Please reply to a photo with this command.', event.threadID, event.messageID);
    }

    const url = encodeURIComponent(event.messageReply.attachments[0].url);
    api.sendTypingIndicator(event.threadID);

    try {
        await api.sendMessage('💬 Recognizing...', event.threadID);

        const response = await axios.get(`https://api.joshweb.click/gemini?prompt=${encodeURIComponent(prompt)}&url=${url}`);
        const description = response.data.gemini;

        return api.sendMessage(`RESPONS ${description}\n`, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage('Return error\n', event.threadID, event.messageID);
    }
};
