export default async function helpFunction(ctx) {
  ctx.reply(
    "📋 Available Commands:\n" +
      "/start - Restart the bot\n" +
      "/help - Show the list of commands\n" +
      "/ask - Contact technical support\n" +
      "/faq - Frequently Asked Questions"
  );
}
