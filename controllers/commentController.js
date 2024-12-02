const Post = require('../models/Posts');  // Assuming Post is the Mongoose model for posts
const Comment = require('../models/coments');  // Assuming Comment is the Mongoose model for comments

// Add Comment to a post
exports.addComment = async (req, res) => {
  const { postId, content } = req.body;
  try {
    const newComment = await Comment.create({
      post: postId,
      user: req.userId,
      content,
    });

    // Add comment ID to the post's comments array
    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });

    res.status(201).json(newComment); // Respond with the created comment
  } catch (error) {
    res.status(400).json({ error: 'Error adding comment' });
  }
};

// Get All Comments for a Post
exports.getComments = async (req, res) => {
  const { postId } = req.params;  // Assuming postId is passed as a URL parameter
  try {
    // Find all comments for the given postId
    const comments = await Comment.find({ post: postId })
      .populate('user', 'username')  // Optional: Populate user details like username (if you have User model)
      .sort({ createdAt: -1 });  // Optional: Sort comments by creation date, descending order

    if (!comments) {
      return res.status(404).json({ error: 'No comments found for this post' });
    }

    res.status(200).json(comments);  // Respond with all comments
  } catch (error) {
    res.status(400).json({ error: 'Error fetching comments' });
  }
};
