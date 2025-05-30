import mongoose, { Schema } from "mongoose";

const UploadEmail = new Schema({
  userEmail: { type: String },
  createdDate: { type: String },
  html: { type: String },
  templateName: { type: String },
  json: { type: String },
});

export const EmailUpload =
  mongoose.models.Email || mongoose.model("Email", UploadEmail);
