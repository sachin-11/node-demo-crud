const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Question = require('../models/questionMode');
const { questionsValidationSchema } = require('../validations/validation')

//@desc Get Questions
//@route GET /api/v1/questions
//@access public

exports.getQuestions = asyncHandler(async (req, res, next) => {
  let search = {
    $and: [{ status: true }],
}
if (req.query.searchKey) {
    search.$and.push({
        $or: [
            { question: { $regex: new RegExp(req.query.searchKey, 'i') } },
        ],
    })
}

const page = parseInt(req.query.page) || 1; // Get current page from query parameters, default to 1
const limit = parseInt(req.query.limit) || 10;

const totalCount = await Question.countDocuments(); // Get total count of documents in the collection
const totalPages = Math.ceil(totalCount / limit); // Calculate total number of pages based on total count and limit

  const questions = await Question.find(search).skip((page - 1) * limit).limit(limit)
  res.status(200).json({ success: true, data: questions, page, totalPages });
});

//@desc Get single Question
//@route GET /api/v1/questions/:id
//@access public

exports.getQuestion = asyncHandler(async (req, res, next) => {
  const questions = await Question.findById(req.params.id)

  if (!questions) {
    return res.status(401).json({ message: 'questions with id not found'}); ;
  }

  res.status(200).json({ success: true, count: questions.length, data: questions });
});

//@desc Add Questions
//@route POST  /api/v1/questions
//@access Private

exports.createQuestions = asyncHandler(async (req, res, next) => {

  const questionData = req.body;
  const result = questionsValidationSchema.validate(questionData);

  if (result.error) {
    return res.status(400).json({ error: result.error.details[0].message });
  }

  const questions = await Question.create(questionData);
  res.status(200).json({ success: true, data: questions });
});

//@desc update Questions
//@route PUT  /api/v1/questions/:id
//@access Private

exports.updateQuestions = asyncHandler(async (req, res, next) => {
  const { questionsId } = req.params;
  const questions = await Question.findByIdAndUpdate(questionsId, {$set: req.body}, { new: true});
  res.status(200).json({ success: true, data: questions });
});

//@desc delete Questions
//@route DELETE  /api/v1/questions/:id
//@access Private

exports.deleteQuestions = asyncHandler(async (req, res, next) => {
    const { questionsId } = req.params;
     await Question.findByIdAndDelete(questionsId);
    res.status(200).json({ success: true, message: 'Questions Delete Succesfully', data: {} });
  });