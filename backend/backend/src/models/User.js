// models/User.ts
const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true, index: true },
    passwordHash: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    lastActiveAt: Date
}, { timestamps: true });
module.exports= model("User", UserSchema);
