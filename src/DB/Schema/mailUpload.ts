import mongoose, { Schema } from "mongoose";

const UploadEmail = new Schema({
  html: { type: String },
  templateName: { type: String },
});

export const EmailUpload =
  mongoose.models.Email || mongoose.model("Email", UploadEmail);
