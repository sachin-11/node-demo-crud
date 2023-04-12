const express = require('express');
const router = express.Router();

const {
 createExample,
 getExample,
 getExamples,
 updateExample,
 deleteExample
} = require('../controllers/exampleController');

// const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getExamples).post(createExample)
router.put('/:examplesId', updateExample)
router.route('/:id').get(getExample);
router.route('/:examplesId').delete(deleteExample);

module.exports = router;