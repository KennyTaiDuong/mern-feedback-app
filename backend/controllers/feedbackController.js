const Feedback = require("../models/feedbackModel");
const mongoose = require("mongoose");

// get all feedbacks
const getFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });

  res.status(200).json(feedbacks);
};

// get a single feedback
const getFeedback = async (req, res) => {
  const { id } = req.params;

  const feedback = await Feedback.findById(id);

  if (!feedback) {
    return res.status(404).json({ error: "Feedback does not exist" });
  }

  res.status(200).json(feedback);
};

// create new feedback
const createFeedback = async (req, res) => {
  const {
    id,
    title,
    category,
    upvotes,
    status,
    description,
    upvoted,
    comments,
  } = req.body;

  // add doc to db
  try {
    const feedback = await Feedback.create({
      id,
      title,
      category,
      upvotes,
      status,
      description,
      upvoted,
      comments,
    });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a feedback
const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Feedback does not exist" });
  }

  const feedback = await Feedback.findOneAndDelete({ _id: id });

  if (!feedback) {
    return res.status(400).json({ error: "Feedback does not exist" });
  }

  res.status(200).json(feedback);
};

// update a feedback
const updateFeedback = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Feedback does not exist" });
  }

  const feedback = await Feedback.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!feedback) {
    return res.status(400).json({ error: "Feedback does not exist" });
  }

  res.status(200).json(feedback);
};

module.exports = {
  getFeedbacks,
  getFeedback,
  createFeedback,
  deleteFeedback,
  updateFeedback,
};
