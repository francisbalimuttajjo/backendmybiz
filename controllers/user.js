const bcrypt = require("bcrypt");
const { sendResponse, signToken } = require("../utils/fns");
const db = require("../models");
const { sequelize } = require("../models");


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

//adding one user
exports.registerUser = async (req, res) => {
  const { firstName, email, lastName, password, passwordConfirm } = req.body;
  try {
    //checking if passwords match
    if (password !== passwordConfirm) {
      return sendResponse(req, res, 400, "Passwords must be the same", "fail");
    }
    const user = await db.User.findOne({ where: { email } });

    if (user) {
      return sendResponse(req, res, 400, "Account already exists", "fail");
    }
    //if new user then create one
    const newUser = await db.User.create({
      firstName,
      lastName,
      email,
      password,
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
// exports.deleteOneUser = async (req, res) => {
//   let transaction;

//   transaction = await sequelize.transaction();
//   const id = req.params.id;
//   try {
//     let user = await db.User.findOne({ where: { id } });

//     if (!user) {
//       return sendResponse(req, res, 404, "no user with provided id", "fail");
//     }

//     await db.ProductCategory.destroy(
//       { where: { user: user.email } },
//       { transaction }
//     );

//     await db.User.destroy({ where: { id } }, { transaction });

//     await transaction.commit();

//     sendResponse(req, res, 200, "deleted successfully");
//   } catch (err) {
//     if (transaction) {
//       await transaction.rollback();
//     }
//     sendResponse(
//       req,
//       res,
//       500,
//       err.message,

//       "fail"
//     );
//   }
// };

// exports.getAll = async (req, res) => {
//   try {
//     const users = await db.User.findAll({
//       include: [
//         {
//           model: db.ProductCategory,
//           as: "productCategories",
//         },

//         {
//           model: db.Transaction,
//           as: "transactions",
//         },
//         {
//           model: db.Sale,
//           as: "sales",
//         },
//         {
//           model: db.CashItem,
//           as: "cashItems",
//         },
//       ],
//     });
//     sendResponse(req, res, 200, users);
//   } catch (err) {
//     sendResponse(req, res, 400, err.message, "fail");
//   }
// }
