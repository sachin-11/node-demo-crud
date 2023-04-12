const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { userValidationSchema } = require('../validations/validation')
const User = require('../models/userModel');

//@desc Get Users
//@route GET /api/v1/users
//@access public

exports.getUsers = asyncHandler(async (req, res, next) => {
 
  let search = {
    $and: [{ status: true }],
}
if (req.query.searchKey) {
    search.$and.push({
        $or: [
            { name: { $regex: new RegExp(req.query.searchKey, 'i') } },
            { email: { $regex: new RegExp(req.query.searchKey, 'i') } },
            { department: { $regex: new RegExp(req.query.searchKey, 'i') } },
            { technical_skills: { $regex: new RegExp(req.query.searchKey, 'i') } },
        ],
    })
}
  const users = await User.find(search)
  res.status(200).json({ success: true, data: users });
});

//@desc Get single User
//@route GET /api/v1/user/:id
//@access public

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return res.status(401).json({ message: 'user with id not found'});
  }

  res.status(200).json({ success: true, count: user.length, data: user });
});

//@desc Add Users
//@route POST  /api/v1/users
//@access Private

exports.createUser = asyncHandler(async (req, res, next) => {
  const userData = req.body;
  const result = userValidationSchema.validate(userData);

  if (result.error) {
    return res.status(400).json({ error: result.error.details[0].message });
  }

  const isUserExists = await User.findOne({ email: req.body.email })
  if(isUserExists) {
    return res.status(401).json({ message: 'user with mail already exists'});
  }
  const users = await User.create(userData);
  res.status(200).json({ success: true, data: users });
});

//@desc update Users
//@route PUT  /api/v1/users/:id
//@access Private

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findByIdAndUpdate(userId, {$set: req.body}, { new: true});
  res.status(200).json({ success: true, data: user });
});

//@desc delete Users
//@route DELETE  /api/v1/users/:id
//@access Private

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
     await User.findByIdAndDelete(userId);
    res.status(200).json({ success: true, message: 'User Delete Succesfully', data: {} });
  });