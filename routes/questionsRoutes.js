const express = require('express');
const router = express.Router();

const {
 createQuestions,
 updateQuestions,
 getQuestion,
 getQuestions,
 deleteQuestions
} = require('../controllers/questionController');

// const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getQuestions).post(createQuestions)
router.put('/:questionsId', updateQuestions)
router.route('/:id').get(getQuestion);
router.route('/:questionsId').delete(deleteQuestions);

module.exports = router;