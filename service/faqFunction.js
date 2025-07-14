export default async function faqFunction(ctx) {
  await ctx.reply(
    "📌 Frequently Asked Questions:\n\n" +
      "❓ How can I report a bug or issue?\n" +
      "— You can report issues directly through the bot by sending a message with the /report command.\n\n" +
      "💬 Can I contact an admin directly?\n" +
      "— Yes, simply send your message here and an admin will respond as soon as possible.\n\n" +
      "🔒 How is my data stored and protected?\n" +
      "— All user data is securely stored and is never shared with third parties.\n\n" +
      "🕒 What are your support hours?\n" +
      "— Our team usually responds within 24 hours. In urgent cases, response times may be faster.\n\n" +
      "📥 The most common questions and answers will continue to be added here over time."
  );
}
