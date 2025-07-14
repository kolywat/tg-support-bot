import { Markup } from "telegraf";

export default async function startFunction(ctx) {
  await ctx.reply(
    `Welcome to the technical support bot for the ${process.env.SERVER_NAME} server!\n\n` +
      "You can view the available commands by clicking the button below:\n" +
      "👉 /help",
    Markup.inlineKeyboard([
      [Markup.button.callback("📋 Available Commands", "help_command")],
    ])
  );
}
