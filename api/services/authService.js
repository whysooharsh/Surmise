const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const getSecret = () => process.env.JWT_SECRET;
const getSalt = () => bcrypt.genSaltSync(10);

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 24 * 60 * 60 * 1000
};

const CLEAR_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 0
};

class AuthService {
  async login({ username, password }) {
    if (!username || !password) {
      const error = new Error("Username and password are required");
      error.status = 400;
      throw error;
    }

    const usernameToCheck = username.toLowerCase();
    const userDoc = await User.findOne({ username: usernameToCheck });
    if (!userDoc) {
      const error = new Error("User not found");
      error.status = 400;
      throw error;
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      const error = new Error("Wrong credentials");
      error.status = 400;
      throw error;
    }

    const token = jwt.sign(
      { username: usernameToCheck, id: userDoc._id },
      getSecret(),
      {}
    );

    return {
      user: {
        id: userDoc._id,
        username: usernameToCheck,
        token
      },
      token,
      cookieOptions: COOKIE_OPTIONS
    };
  }

  async register({ username, password }) {
    if (!username || !password) {
      const error = new Error("Username and password are required");
      error.status = 400;
      throw error;
    }

    const usernameToSave = username.toLowerCase();
    const hashedPassword = bcrypt.hashSync(password, getSalt());

    const userDoc = await User.create({
      username: usernameToSave,
      password: hashedPassword
    });

    return userDoc;
  }

  verifyToken(token) {
    if (!token) {
      const error = new Error("NOT LOGIN");
      error.status = 401;
      throw error;
    }

    try {
      return jwt.verify(token, getSecret());
    } catch (err) {
      const error = new Error("Invalid token");
      error.status = 401;
      throw error;
    }
  }

  getLogoutCookieOptions() {
    return CLEAR_COOKIE_OPTIONS;
  }
}

module.exports = new AuthService();
