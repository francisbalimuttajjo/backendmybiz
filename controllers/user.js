const bcrypt = require("bcrypt");
const { sendResponse, signToken } = require("../utils/fns");
const db = require("../models");


// //updating profile pic
exports.updateProfile = async (req, res) => {
  try {
    const { image, email } = req.body;
    if (!image) {
      return sendResponse(req, res, 400, "Please provide  an image", "fail");
    }

    await db.User.update({ photo: image }, { where: { email } });

    sendResponse(req, res, 200, "operation successfull");
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};

// //updating password
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, email } = req.body;
    if (!currentPassword || !newPassword || !email) {
      return sendResponse(
        req,
        res,
        400,
        "Please provide passwords and Email",
        "fail"
      );
    }
    const user = await db.User.findOne({ where: { email, active: true } });
    if (!user) {
      return sendResponse(
        req,
        res,
        400,
        "User with email doesnt exist",
        "fail"
      );
    }
    //verifying password
    const verifyPassword = await bcrypt.compare(currentPassword, user.password);

    if (!verifyPassword) {
      return sendResponse(req, res, 400, "invalid password provided", "fail");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.User.update({ password: hashedPassword }, { where: { email } });

    sendResponse(req, res, 200, "operation successfull");
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};



// //updating password
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, email } = req.body;
    if (!currentPassword || !newPassword || !email) {
      return sendResponse(
        req,
        res,
        400,
        "Please provide passwords and Email",
        "fail"
      );
    }
    const user = await db.User.findOne({ where: { email, active: true } });
    if (!user) {
      return sendResponse(
        req,
        res,
        400,
        "User with email doesnt exist",
        "fail"
      );
    }
    //verifying password
    const verifyPassword = await bcrypt.compare(currentPassword, user.password);

    if (!verifyPassword) {
      return sendResponse(req, res, 400, "invalid password provided", "fail");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.User.update({ password: hashedPassword }, { where: { email } });

    sendResponse(req, res, 200, "operation successfull");
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};

//adding one user
exports.registerUser = async (req, res) => {
  const { firstName, email, lastName, password, passwordConfirm } = req.body;
  console.log({ email });
  try {
    //checking if passwords match
    if (password !== passwordConfirm) {
      return sendResponse(req, res, 400, "Passwords must be the same", "fail");
    }
    const user = await db.User.findOne({ where: { email: email.trim() } });

    if (user) {
      return sendResponse(req, res, 400, "Account already exists", "fail");
    }
    //if new user then create one
    const newUser = await db.User.create({
      firstName,
      lastName,
      email: email.trim(),
      password,
      photo: "",
    });
  
    sendResponse(req, res, 201, newUser);
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};

exports.loginUser = async (req, res) => {
  try {
    //checking if not empty req body
    const { email, password } = req.body;

    if (!email || !password)
      return sendResponse(
        req,
        res,
        400,
        "Please provide email and password",
        "fail"
      );
    //confirming users existance && that the user is active ie didnt delete or hasnt activated his acc
    const user = await db.User.findOne({
      where: { email: email.trim(), active: true },
    });

    //if not user reject request to login
    if (!user)
      return sendResponse(
        req,
        res,
        400,
        "invalid credentials provided",
        "fail"
      );
    //verifying password
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword)
      return sendResponse(
        req,
        res,
        400,
        "invalid credentials provided",
        "fail"
      );
    //sign token and send it with user
    const token = await signToken(user.id);

    sendResponse(req, res, 200, { user, token });
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};
