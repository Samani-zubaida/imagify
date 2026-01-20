import mongoose from "mongoose";
import monogoose from "mongoose";

const userSchema = new monogoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  creditsBalance: { type: Number, default: 5 },
});


const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
