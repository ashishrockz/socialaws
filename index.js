require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const connection = require('./service/db');
const authentication = require('./routes/authRoutes');
const { createPost, getPosts,getUserPosts } = require('./controllers/postController');
const { addComment } = require('./controllers/commentController');
const { toggleLike } = require('./controllers/likeController');
const verifyToken = require('./middleware/auth');
const multer = require('multer');
const fs = require('fs');  // Import fs

// Database connection
connection();

// Initialize Express app
const app = express();

// Middlewares
app.use(cors()); // CORS middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/auth', authentication);

// Post routes
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename with timestamp
  },
});

// Initialize `upload` middleware using the defined `storage`
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
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

// Enhanced error handling in the post route
app.post('/create-post', verifyToken, (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).send({ message: 'Multer Error', error: err.message });
    } else if (err) {
      return res.status(500).send({ message: 'File upload error', error: err.message });
    }
    // Continue with your post creation
    createPost(req, res);
  });
});app.get('/all', verifyToken, getPosts);
app.get('/user', verifyToken, getUserPosts);

// Comment route
app.post('/comments', verifyToken, addComment);

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

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});