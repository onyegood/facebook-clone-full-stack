const User = require('../../models/User');
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../../helpers/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');
const { generateToken } = require('../../helpers/tokens');
// const { sendVerificationEmail } = require('../../helpers/mailer');

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    /**
     * @Param email
     * check that email address is valid email.
     * valid email must look like example@example.com
     */

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email address.',
      });
    }

    /**
     * @Param email
     * Check the database to the provided email address
     * If email exist return an error and stop code execution
     */
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      /**
       * @Param email
       * For security reasons, do not give a detailed reason this error occurred.
       * Instead log the reason in your log db
       */
      console.log(
        `${email} already exist, try with a different email address.`
      );
      return res.status(400).json({
        message: 'Oops, something went wrong',
      });
    }

    if (validateLength(first_name, 2, 30)) {
      return res.status(400).json({
        message: 'First name must be between 2 and 30 characters.',
      });
    }

    if (validateLength(last_name, 2, 30)) {
      return res.status(400).json({
        message: 'Las name must be between 2 and 30 characters.',
      });
    }

    if (validateLength(password, 2, 30)) {
      return res.status(400).json({
        message: 'Password must be between 2 and 30 characters.',
      });
    }

    if (validateLength(gender, 4, 6)) {
      return res.status(400).json({
        message: 'Gender must be between 4 and 6 characters.',
      });
    }

    /**
     * Hash password before saving it to the db
     */
    const bcryptPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = new User({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: bcryptPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    });

    await user.save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    );

    const url = `${process.env.REDIRECT_DOMAIN}/auth/activate/${emailVerificationToken}`;
    console.log(url);
    /**
     * TODO: Sort out the email not sending issues
     * sendVerificationEmail(user.email, user.first_name, url);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'devkachi92@gmail.com',
        pass: '',
      },
    });

    var mailOptions = {
      from: 'devkachi92@gmail.com',
      to: 'goodmomen@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
*/
    const token = generateToken({ id: user._id.toString() }, '7d');

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      token,
      image: user.image,
      cover: user.cover,
      verified: user.verified,
      message: 'Register successfully, please activate you email to start.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);

    if (validUser !== user.id) {
      return res.status(301).json({
        message: "You don't have the authorization to perform this action.",
      });
    }

    const check = await User.findById(user.id);
    if (check.verified) {
      return res
        .status(400)
        .json({ message: 'this email is already activated.' });
    }

    await User.findByIdAndUpdate(user.id, { verified: true });
    return res
      .status(200)
      .json({ message: 'Account has been activated successfully.' });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message:
          'the email address you entered is not connected to an account.',
      });
    }

    if (!user.verified) {
      return res.status(400).json({ message: 'Account not verified' });
    }

    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: 'invalid credentials. Please try again.',
      });
    }

    const token = generateToken({ id: user._id.toString() }, '7d');

    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      image: user.image,
      cover: user.cover,
      token,
      verified: user.verified,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.sendVerification = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (user.verified) {
      return res.status(400).json({
        message: 'This account is already activated.',
      });
    }

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    );

    /**
     * TODO: send this url via email
     */
    const url = `${process.env.REDIRECT_DOMAIN}/auth/activate/${emailVerificationToken}`;
    console.log(url);

    return res.status(200).json({
      message: 'Email verification link has been sent to your email.',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
