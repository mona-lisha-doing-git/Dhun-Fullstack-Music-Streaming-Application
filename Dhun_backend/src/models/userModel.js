import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  securityAnswer: { type: String, required: true }, // Where do you live?
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }]
});

export default mongoose.model("User", userSchema);
