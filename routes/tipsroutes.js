const express = require('express');
const router = express.Router();

const {
 createTips,
 getTip,
 getTips,
 updateTips,
 deleteTips
} = require('../controllers/tipsController');

// const { protect, authorize } = require('../middleware/auth');

router.route('/').get(getTips).post(createTips)
router.put('/:tipsId', updateTips)
router.route('/:id').get(getTip);
router.route('/:tipsId').delete(deleteTips);

module.exports = router;