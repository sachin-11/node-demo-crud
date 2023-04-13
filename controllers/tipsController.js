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

const page = parseInt(req.query.page) || 1; // Get current page from query parameters, default to 1
const limit = parseInt(req.query.limit) || 10;

const totalCount = await Tips.countDocuments(); // Get total count of documents in the collection
const totalPages = Math.ceil(totalCount / limit); // Calculate total number of pages based on total count and limit

const tips = await Tips.find(search).skip((page - 1) * limit).limit(limit)

  res.status(200).json({ success: true, data: tips, page, totalPages });
});

//@desc Get single tips
//@route GET /api/v1/tips/:id
//@access public

exports.getTip = asyncHandler(async (req, res, next) => {
  const tips = await Tips.findById(req.params.id)

  if (!tips) {
    return res.status(401).json({ message: 'tips with id not found'});;
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