const router = require("express").Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// =============== Start Signing up ===============
router.post("/signup", async (req, res) => {
  try {
    // Start getting the user input and check for auth
    const { email, name, password, passwordVerify } = req.body;
    if ((!email, !name, !password, !passwordVerify))
      return res
        .status(400)
        .json({ errorMsg: "Please enter the required fields." });
    if (password.length < 6)
      return res
        .status(400)
        .json({ errorMsg: "Password should be not less than 6 charecters." });
    if (name.length < 3)
      return res
        .status(400)
        .json({ errorMsg: "name should be not less than 3 charecters." });
    if (password !== passwordVerify)
      return res.status(400).json({ errorMsg: "Password are not matched." });

    // Getting the user structured data from out model and check if the input email is already exist
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ errorMsg: "This user is already exist." });
    // else (if everything is fine)
    // Hash the input password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      email,
      name,
      passwordHash,
    });
    // Save the hased password in our db
    const savedUser = newUser.save();

    // Generate our token for the cookies
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT
    );

    // Sending the token as a browser cookie.
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();

    console.log("Done!");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
// =============== End Signing up ===============
// =============== Start Signing in ===============

router.post("/login", async (req, res) => {
  try {
    // Start getting the user input and check for auth.
    const { email, password } = req.body;
    if ((!email, !password))
      return res
        .status(400)
        .json({ errorMsg: "Please enter the required fields." });
    // Check if the email and the password are matched.
    const isEmailExist = await UserModel.findOne({ email });
    const passwordCorrect = await bcrypt.compare(
      password,
      isEmailExist.passwordHash
    );
    if (!isEmailExist)
      return res
        .status(401)
        .json({ errorMsg: "Email or password is not exist." });
    if (!passwordCorrect)
      return res
        .status(401)
        .json({ errorMsg: "Email or password is not exist." });

    // Generate our token for the cookies
    const token = jwt.sign(
      {
        user: isEmailExist._id,
      },
      process.env.JWT
    );

    console.log(token);
    // Sending the token as a browser cookie.
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
    console.log("User found.");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
// =============== End Signing in ===============
// =============== Start Signing out ===============

// Signing out is simply removing the cookies.
router.get("/signout", (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    console.log("Signed out");
    res.send("Signed out");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// ================== End Signing out ===============

// =============== Start Getting the Logged in Users ===============
router.get("/all_users", async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
// =============== End Getting the Logged in Users ===============

// =============== Start LoggedIn ===============
router.get("/loggedIn", (req, res) => {
  // get the cookie incoming request
  //show the saved cookies
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);
    jwt.verify(token, process.env.JWT);
    return res.json(true);
  } catch (error) {
    res.json(false);
  }
});
// =============== End LoggedIn ===============

module.exports = router;
