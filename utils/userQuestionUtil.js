import UserQuestion from "../models/user-questions-model.js";

export const saveUserQuestion = async (username, chatId, question) => {
  try {
    const newQuestion = new UserQuestion({
      username,
      chatId,
      question,
    });
    await newQuestion.save();
    return newQuestion;
  } catch (error) {
    console.error("Error saving user question:", error);
    return null;
  }
};
