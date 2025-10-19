const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.registerUser = async ({ name, email, password, role }) => {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) throw new Error("User already exists");

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ name, email: email.toLowerCase(), passwordHash, role });
    await user.save();

    return {
        user,
        token: generateToken(user)
    };
};
exports.loginUser = async ({ email, password }) => {
    console.log("Login attempt for:", email);

    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) throw new Error("Invalid credentials");

    console.log("Login successful for:", email);

    return {
        user,
        token: generateToken(user)
    };
};
