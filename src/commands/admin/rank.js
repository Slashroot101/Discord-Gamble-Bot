const User = require('../../api/user');

module.exports = {
  name: 'rank',
  description: 'Checks or sets the rank of the user. Ex: `!rank set <@user> 1` or `!rank get <@user>`',
  duration: 0,
  hasCooldown: false,
  requiresAdmin: true,
  generatesMoney: false,
  usages: 0,
  execute: async (client, message, args) => {
    if (args.length === 0) {
      message.reply('please include an action such as `!rank <set|get> @user <rank ID>`');
    }

    if (args[0] === 'set') {
      const rankID = Number.parseInt(args[2], 10);
      if (rankID !== 1 && rankID !== 2) {
        return message.reply('please supply a valid rank. 1 = base user, 2 = admin');
      }
      const discordID = args[1].replace(/[^0-9]/g, '');
      const user = await User.getUserByDiscordID(discordID);
      const updatedUser = await User.updateRoleID(user.user_id, rankID);
      return message.reply(`succesfully updated ${args[1]} to ${updatedUser.role_d === 1 ? 'a base user' : 'an admin user'}`);
    }

    if (args[0] === 'get') {
      const discordID = args[1].replace(/[^0-9]/g, '');
      const user = await User.getUserByDiscordID(discordID);
      if (user.length === 0) {
        message.reply('that user has never executed a command!');
      }
      return message.reply(`${args[1]} has role: ${user.rolename}`);
    }

    return message.reply('you must have provided an invalid verb. Please try the command again such as `!rank set @user <rank name>`');
  },
};