import UserQuestion from "../../models/user-questions-model.js";

export default async function adminAnswerFunction(ctx) {
  try {
    const questionId = ctx.match[1];
    const question = await UserQuestion.findById(questionId);

    if (!question) {
      await ctx.reply("Question not found.");
      return;
    }

    if (!ctx.session) {
      ctx.session = {};
    }

    ctx.session.currentQuestion = {
      questionId,
      username: question.username,
      chatId: question.chatId,
      question: question.question,
    };

    const message =
      `Reply to question:\n\n` +
      `<b>User:</b> ${question.username}\n` +
      `<b>Question:</b> ${question.question}\n\n` +
      `Please type your reply below.`;
    await ctx.reply(message, { parse_mode: "HTML" });
  } catch (error) {
    console.error('Error while handling "Reply" button:', error);
    await ctx.reply("An error occurred. Please try again later.", {
      show_alert: true,
    });
  }
}
