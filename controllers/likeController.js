// exports.toggleLike = async (req, res) => {
//     const { postId } = req.body;
//     try {
//       const post = await Post.findById(postId);
//       if (post.likes.includes(req.userId)) {
//         post.likes.pull(req.userId);
//       } else {
//         post.likes.push(req.userId);
//       }
//       await post.save();
//       res.json(post);
//     } catch (error) {
//       res.status(400).json({ error: 'Error toggling like' });
//     }
//   };
const Post = require('../models/Posts'); // Assuming Post is the Mongoose model for posts

exports.toggleLike = async (req, res) => {
  const { postId } = req.body;

  try {
    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Toggle like
    if (post.likes.includes(req.userId)) {
      post.likes.pull(req.userId); // Remove user from likes if already liked
    } else {
      post.likes.push(req.userId); // Add user to likes if not already liked
    }

    // Save the updated post
    await post.save();
    res.json(post); // Respond with the updated post

  } catch (error) {
    res.status(400).json({ error: 'Error toggling like' });
  }
};
