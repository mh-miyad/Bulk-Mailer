import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  // Store all other dynamic properties here
  properties: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
