const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Example = require('../models/exampleModel');
const { exampleValidationSchema } = require('../validations/validation')

//@desc Get Example
//@route GET /api/v1/examples
//@access public

exports.getExamples = asyncHandler(async (req, res, next) => {
  
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

const totalCount = await Example.countDocuments(); // Get total count of documents in the collection
const totalPages = Math.ceil(totalCount / limit); // Calculate total number of pages based on total count and limit


  const examples = await Example.find(search).skip((page - 1) * limit).limit(limit)
  res.status(200).json({ success: true, data: examples, page, totalPages });
});

//@desc Get single example
//@route GET /api/v1/example/:id
//@access public

exports.getExample = asyncHandler(async (req, res, next) => {
  const example = await Example.findById(req.params.id)

  if (!example) {
    return next(new ErrorResponse(`No example with id ${req.params.id}`), 404);
  }

  res.status(200).json({ success: true, count: example.length, data: example });
});

//@desc Add Example
//@route POST  /api/v1/examples
//@access Private

exports.createExample= asyncHandler(async (req, res, next) => {

  const exampleData = req.body;
  const result = exampleValidationSchema.validate(exampleData);

  if (result.error) {
    return res.status(400).json({ error: result.error.details[0].message });
  }
  const examples = await Example.create(exampleData);
  res.status(200).json({ success: true, data: examples });
});

//@desc update Example
//@route PUT  /api/v1/example/:id
//@access Private

exports.updateExample = asyncHandler(async (req, res, next) => {
  const { examplesId } = req.params;
  const example = await Example.findByIdAndUpdate(examplesId, {$set: req.body}, { new: true});
  res.status(200).json({ success: true, data: example });
});

//@desc delete Example
//@route DELETE  /api/v1/example/:id
//@access Private

exports.deleteExample = asyncHandler(async (req, res, next) => {
    const { examplesId } = req.params;
     await Example.findByIdAndDelete(examplesId);
    res.status(200).json({ success: true, message: 'Example Delete Succesfully', data: {} });
  });