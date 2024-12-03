require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const connection = require('./service/db');
const authentication = require('./routes/authRoutes');
const { createPost, getPosts,getUserPosts,updatePost,deletePost } = require('./controllers/postController');
const { addComment,getComments } = require('./controllers/commentController');
const { toggleLike } = require('./controllers/likeController');
const verifyToken = require('./middleware/auth');
const multer = require('multer');

// Database connection
connection();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // CORS middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/auth', authentication);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer storage configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename with timestamp
  },
});

// Multer file filter to accept only image files
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  },
}).single('image');

// Post route to create a new post
app.post('/create-post', verifyToken, (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ message: 'Multer Error', error: err.message });
    } else if (err) {
      return res.status(500).send({ message: 'File upload error', error: err.message });
    }

    // Continue with your post creation logic
    createPost(req, res);
  });
});

// Get all posts route
app.get('/all', verifyToken, getPosts);

// Get user posts route
app.get('/user', verifyToken, getUserPosts);
app.put('/edit/:id', verifyToken, updatePost);
app.delete('/delete/:id', verifyToken, deletePost);
// Comment route
app.post('/comments', verifyToken, addComment);
app.get('/comments/:postId', verifyToken, getComments);

// Like route
app.post('/likes', verifyToken, toggleLike);

// Root route for API
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).send('404: Not Found');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}...`);
});
