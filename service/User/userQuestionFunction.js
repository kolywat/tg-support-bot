export default async function userQuestionFunction(ctx) {
  try {
    await ctx.reply(
      "Please write your question in the following format:\nQuestion: your_question"
    );
  } catch (error) {
    console.error("Error handling the /ask command:", error);
    await ctx.reply("An error occurred. Please try again later.");
  }
}
