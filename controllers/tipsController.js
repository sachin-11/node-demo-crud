const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Tips = require('../models/tipsModel');
const { tipsValidationSchema } = require('../validations/validation')

//@desc Get tips
//@route GET /api/v1/tips
//@access public

exports.getTips = asyncHandler(async (req, res, next) => {
let search = {
    $and: [{ status: true }],
}
if (req.query.searchKey) {
    search.$and.push({
        $or: [
            { title: { $regex: new RegExp(req.query.searchKey, 'i') } },
        ],
    })
}
  const tips = await Tips.find(search)

  res.status(200).json({ success: true, data: tips });
});

//@desc Get single tips
//@route GET /api/v1/tips/:id
//@access public

exports.getTip = asyncHandler(async (req, res, next) => {
  const tips = await Tips.findById(req.params.id)

  if (!tips) {
    return next(new ErrorResponse(`No tips with id ${req.params.id}`), 404);
  }

  res.status(200).json({ success: true, count: tips.length, data: tips });
});

//@desc Add Tips
//@route POST  /api/v1/tips
//@access Private

exports.createTips = asyncHandler(async (req, res, next) => {
  const tipsData = req.body;
  const result = tipsValidationSchema.validate(tipsData);

  if (result.error) {
    return res.status(400).json({ error: result.error.details[0].message });
  }
  const tips = await Tips.create(tipsData);
  res.status(200).json({ success: true, data: tips });
});

//@desc update Tips
//@route PUT  /api/v1/tips/:id
//@access Private

exports.updateTips = asyncHandler(async (req, res, next) => {
  const { tipsId } = req.params;
  const tips = await Tips.findByIdAndUpdate(tipsId, {$set: req.body}, { new: true});
  res.status(200).json({ success: true, data: tips });
});

//@desc delete Tips
//@route DELETE  /api/v1/tips/:id
//@access Private

exports.deleteTips = asyncHandler(async (req, res, next) => {
    const { tipsId } = req.params;
     await Tips.findByIdAndDelete(tipsId);
    res.status(200).json({ success: true, message: 'Tips Delete Succesfully', data: {} });
  });