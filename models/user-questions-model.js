import {Schema, model} from "mongoose";

const UserQuestionSchema = new Schema({
    username: { type: String, required: true },
    chatId: { type: Number, required: true },
    question: { type: String, required: true },
    isAnswered: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
})

export default model("UserQuestion", UserQuestionSchema);
