const asyncHandler = require("../middleware/async");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const {
  loginValidationSchema,
  registerValidationSchema,
} = require("../validations/validation");

//@desc Login User
//@route POST /api/v1/login
//@access priavte

exports.login = asyncHandler(async (req, res, next) => {
  const userData = req.body;
  const result = loginValidationSchema.validate(userData);

  if (result.error) {
    return res.status(400).json({ error: result.error.details[0].message });
  }

  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(userData.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

//@desc  Register User
//@route Post /api/v1/register
//@access public

exports.register = asyncHandler(async (req, res, next) => {

  const userData = req.body;
  const isUserExists = await User.findOne({ email: userData.email });

  if (isUserExists) {
    return res
      .status(400)
      .json({ message: "User is Already exists with same email" });
  }
  const result = registerValidationSchema.validate(userData);

  if (result.error) {
    return res.status(400).json({ error: result.error.details[0].message });
  }
  //register user
  const user = await User.create(userData);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});
