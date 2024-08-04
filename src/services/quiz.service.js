import mongoose, { Types } from "mongoose";
import AnswerModel from "../models/answer.model.js";
import QuizModel from "../models/quiz.model.js";

const getQuizTest = async () => {
  const quiz = await QuizModel.find();
  const result = [];
  for (let i = 0; i < quiz.length; i++) {
    const test = await AnswerModel.find({ quiz_id: quiz[i]._id });
    result.push({ quiz: quiz[i], test });
  }
  return result;
};
const getQuizById = async (id) => {
  const quiz = await QuizModel.findById(Types.ObjectId.createFromHexString(id));
  console.log(quiz);
  const test = await AnswerModel.find({
    quiz_id: Types.ObjectId.createFromHexString(id),
  });
  return { quiz, test };
};
const getQuizByUserId = async (user_id) => {
  const quiz = await QuizModel.find({ user_id });
  const test = await AnswerModel.find({ quiz_id: quiz._id });
  return { quiz, test };
};
const createQuiz = async (id, { title, description, ListQuestion }) => {
  const newQuiz = new QuizModel({ title, description, user_id: id });
  await newQuiz.save();
  for (let i = 0; i < ListQuestion.length; i++) {
    const {
      content,
      point,
      answer1,
      answer2,
      answer3,
      isCorrect_1,
      isCorrect_2,
      isCorrect_3,
    } = ListQuestion[i];
    const newAnswer = new AnswerModel({
      quiz_id: newQuiz._id,
      point,
      content,
      answer1,
      answer2,
      answer3,
      isCorrect_1,
      isCorrect_2,
      isCorrect_3,
    });
    await newAnswer.save();
  }
  return { newQuiz };
};
const updateQuiz = async ({ id, title, description, ListQuestion }) => {
  const quiz = await QuizModel.findById(id);
  if (!quiz) {
    throw new Error("Quiz not found");
  }
  const newQuiz = await QuizModel.findByIdAndUpdate(id, {
    title,
    description,
  });
  for (let i = 0; i < ListQuestion.length; i++) {
    const {
      content,
      point,
      answer1,
      answer2,
      answer3,
      isCorrect_1,
      isCorrect_2,
      isCorrect_3,
    } = ListQuestion[i];
    const newAnswer = await AnswerModel.findByIdAndUpdate(ListQuestion[i]._id, {
      point,
      content,
      answer1,
      answer2,
      answer3,
      isCorrect_1,
      isCorrect_2,
      isCorrect_3,
    });
  }
};

const deleteQuiz = async (id) => {
  const quiz = await QuizModel.findById(Types.ObjectId.createFromHexString(id));
  if (!quiz) {
    throw new Error("Quiz not found");
  }
  const question = await AnswerModel.deleteMany({ quiz_id: quiz._id });
  return await QuizModel.findByIdAndDelete(
    Types.ObjectId.createFromHexString(id)
  );
};

export const QuizService = {
  getQuizTest,
  getQuizById,
  getQuizByUserId,
  createQuiz,
  updateQuiz,
  deleteQuiz,
};
