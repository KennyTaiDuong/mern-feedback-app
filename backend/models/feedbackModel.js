const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    upvotes: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    upvoted: {
      type: Boolean,
      required: true,
    },
    comments: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("feedback", feedbackSchema);
