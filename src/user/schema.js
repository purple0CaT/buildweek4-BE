import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, model } = mongoose;

// const { Schema, model } = mongoose;

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: function () {
        return !Boolean(this.googleId || this.fbId);
      },
    },
    password: {
      type: String,
      required: function () {
        return !Boolean(this.googleId || this.fbId);
      },
    },
    avatar: { type: String },
    refreshToken: { type: String },
    googleId: {
      type: String,
      required: function () {
        return !Boolean(this.fbId || this.password);
      },
    },
    fbId: {
      type: String,
      required: function () {
        return !Boolean(this.googleId || this.password);
      },
    },
  },
  { timestamps: true }
);
//
UserSchema.pre("save", async function () {
  const newUser = this;
  const pass = newUser.password;
  if (newUser.isModified("password")) {
    newUser.password = await bcrypt.hash(pass, 10);
  }
});
//
UserSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.__v;
  delete userObj.refreshToken;
  return userObj;
};
//
UserSchema.statics.CheckCredentials = async function (email, pass) {
  const user = await this.findOne({ email });
  if (user) {
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      return user;
    } else {
      return null;
    }
  } else {
    return null;
  }
};
//
// export default model("users", UserSchema);
