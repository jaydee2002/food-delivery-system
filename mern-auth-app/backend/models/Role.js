import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Role", roleSchema);
