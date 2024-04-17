import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  authorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  short_description: {
    type: String,
    required: true,
  },
  publish_date: {
    type: Date,
    required: true,
  },
  // picture: {
  //   type: String,
  // },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
