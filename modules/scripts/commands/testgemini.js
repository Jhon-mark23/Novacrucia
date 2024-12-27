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
        return api.sendMessage('╭─『 𝗜𝗠𝗔𝗚𝗘 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝙂𝙪𝙞𝙙𝙚: This cmd only works in photo.\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 𝚄𝙽𝚂𝙴𝙽𝙳 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉  𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝙸𝙼𝙰𝙶𝙴 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧', event.threadID, event.messageID);
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

        return api.sendMessage(`╭─『 𝗜𝗠𝗔𝗚𝗘 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\n𝘼𝙣𝙨𝙬𝙚𝙧: ${description}\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 '𝚄𝙽𝚂𝙴𝙽𝙳' 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸'𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉  𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝙸𝙼𝙰𝙶𝙴 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧`, event.threadID, event.messageID);
    } catch (error) {
        console.error(error);
        return api.sendMessage('╭─『 𝗜𝗠𝗔𝗚𝗘 𝗕𝗢𝗧 』✧✧✧\n╰✧✧✧───────────✧\n╭✧✧✧───────────✧\nAn error occurred while processing your request.\n╰─────────────✧✧✧\n◉ 𝚁𝙴𝙿𝙻𝚈 𝚄𝙽𝚂𝙴𝙽𝙳 𝚃𝙾 𝚁𝙴𝙼𝙾𝚅𝙴 𝚃𝙷𝙴 𝙰𝙸𝚜 𝚁𝙴𝚂𝙿𝙾𝙽𝚂𝙴.\n◉  𝚃𝙷𝙴𝚂𝙴 𝙲𝙾𝙼𝙼𝙰𝙽𝙳 𝙸𝙽𝚃𝙴𝙽𝙳𝙴𝙳 𝙵𝙾𝚁 𝙸𝙼𝙰𝙶𝙴 𝙵𝙾𝚁𝙼 𝙾𝙽𝙻𝚈!\n╭✧✧✧───────────✧\n    »𝙲𝙾𝙽𝚃𝙰𝙲𝚃 𝙰𝙸 𝙾𝚆𝙽𝙴𝚁«\nhttps://www.facebook.com/geotechph.net\n╰─────────────✧✧✧', event.threadID, event.messageID);
    }
};
