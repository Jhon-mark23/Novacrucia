module.exports.config = {
  name: "id",
  author: "Kenlie Jugarap",
  version: "1.0",
  category: "utility", // description of the command
  description: "Sends the user's ID",
  adminOnly: false, // if false all users can use this command but if true only the admin id lists on config.json can use
  usePrefix: true, // if true it uses the command with the prefix example /testsendimage-url but if false no need prefix can direct use testsendimage-url
  cooldown: 5, // cooldown on how many command to be used
};

module.exports.run = function ({ event, args }) {
  if (event.type === "message") {
    api.sendMessage("This is your ID: " + event.sender.id, event.sender.id);
  };

  if (event.type === "message_reply") {
    api.sendMessage(`This your ID: ${event.sender.id}`, event.sender.id);
  }
};
