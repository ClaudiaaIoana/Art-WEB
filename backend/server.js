const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10; 



const app = express();

app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'art'
});

const storage=multer.diskStorage({

  destination:'./upload/images',
  filename:(req,file,cb)=>
  {
      return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})


const upload=multer({storage:storage})
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('photo'),(req,res)=>{
  res.json({
      success:1,
      image_url:`http://localhost:4200/images/${req.file.filename}`
  })
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});

// Middleware function to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    console.log(`Token missing`);
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
    
  }

  try {
    const decoded = jwt.verify(token, 'backend_mesaj_secret');
    req.user = decoded; // Attach user information to request object
    
    console.log(`${req.user.id}: ${token}`);
    next();
  } catch (error) {
    console.log(`invalid token? ${token}`);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

// Middleware function to check user role
const checkUserRole = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
  };
};

// Route to handle user registration
app.post('/api/user/register', (req, res) => {
  const { Username, Password, Email, Firstname, Lastname, Type } = req.body;

  bcrypt.hash(Password, saltRounds, (err, hashedPassword) => {
    if (err) {
        res.status(500).json({ error: 'eroare la hashing' });
    } else {
      const sql = "INSERT INTO `users`(`username`, `fisrtname`, `lastname`, `email`, `password`, `Type`) VALUES (?, ?, ?, ?, ?, ?)";
      connection.query(sql, [Username, Firstname, Lastname, Email, hashedPassword, Type], (err, result) => {
        if (err) {
          console.error('Error inserting user into database: ' + err.stack);
          res.status(500).json({ message: 'Registration failed. Please try again.' });
          return;
        }
        console.log('User registered successfully');
        res.status(200).json({ message: 'Registration successful!' });
      });
    }
  });
});

app.post('/api/user/login', (req, res) => {
  const { Username, Password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  connection.query(sql, [Username], (err, result) => {
    if (err) {
      console.error('Error querying database: ' + err.stack);
      res.status(500).json({ message: 'An error occurred while logging in. Please try again.' });
      return;
    }

    if (result.length === 0) {
      // No user found with the provided username and password
      res.status(401).json({ message: 'Invalid username or password.' });
    } else {
      // User found, generate a token
      const user = result[0];
      bcrypt.compare(Password, user.password, (err, isMatch) => {
        if (err) {
          res.status(500).json({ message: 'An error occurred while comparing passwords. Please try again.' });
        } else if (isMatch) {
          const token = jwt.sign({ id: user.ID, role: user.Type }, 'backend_mesaj_secret', { expiresIn: '1d' }); // Include role in token payload
          console.log(`returned token ${token}`);
          res.status(200).json({ token: token });
        } else {
          res.status(401).json({ message: 'Incorrect username or password.' });
        }
      });
    }
  });
});


app.get('/api/user/authenticate', verifyToken, (req, res) => {
  // If the middleware reached this point, it means the user is authenticated
  res.status(200).json({ authenticated: true, user: req.user });
  console.log('Verified');
});

app.get('/api/user/isadmin', verifyToken, (req, res) => {
  // If the middleware reached this point, it means the user is authenticated
  // Check if the user role is admin
  if (req.user && req.user.role === 2) {
    console.log(`${req.user.role}`)
    res.status(200).json({ isAdmin: true });
  } else {
    res.status(200).json({ isAdmin: false });
  }
});

app.post('/api/posts/addpost', verifyToken, (req, res) => {
  const { title, selectedStyles, author, startingBid, description} = req.body;
  const userId = req.user.id;

  const postQuery = "INSERT INTO posts (ID_user, title, styles, author, startBid, description) VALUES (?, ?, ?, ?, ?, ?)";
  connection.query(postQuery, [userId, title, selectedStyles, author, startingBid, description], (err, result) => {
    if (err) {
      console.error('Error inserting post into database: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while adding the post.' });
    }

    const postId = result.insertId;
    console.log(`post ${postId}`);

    res.status(200).json({ postId: postId });

  });
});

app.post('/api/posts/images', (req, res) => {
  const { postID, imageURL } = req.body;
  let imageId = 0;

  const sqlInsertImage = "INSERT INTO `images`(`image`) VALUES (?)";
  connection.query(sqlInsertImage, [imageURL], (err, result) => {
    if (err) {
      console.error('Error inserting image into database: ' + err.stack);
      res.status(500).json({ message: 'Could not insert the image' });
      return;
    }
    imageId = result.insertId;
    console.log('Image inserted with ID:', imageId);

    const sqlInsertPostImage = "INSERT INTO `posts_images`(`ID_post`, `ID_image`) VALUES (?, ?)";
    connection.query(sqlInsertPostImage, [postID, imageId], (err, result) => {
      if (err) {
        console.error('Error inserting bond into database:', err);
        console.error('Post ID:', postID, 'Image ID:', imageId);
        res.status(500).json({ message: 'Could not insert bond' });
        return;
      }
      const postImageId = result.insertId;
      console.log('Bond inserted with ID:', postImageId);
      res.status(200).json({ message: 'Images added!' });
    });
  });
});

app.get('/api/user/profile', verifyToken, (req, res) => {
  const userId = req.user.id;

  const sql = "SELECT users.username, users.email, COUNT(DISTINCT CASE WHEN posts1.status = 2 THEN posts1.ID END) as sales,  COUNT(DISTINCT CASE WHEN posts2.ID IS NOT NULL AND posts2.startdate <= DATE_SUB(CURDATE(), INTERVAL 2 DAY) THEN posts2.ID END) AS acquisitions  FROM users LEFT JOIN posts AS posts1 ON posts1.ID_user = users.ID LEFT JOIN bids ON bids.ID_user = users.ID LEFT JOIN posts AS posts2 ON posts2.ID = bids.ID_post WHERE users.ID = ?  GROUP BY users.username";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user profile data: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while fetching profile data.' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(result[0]);
  });
});

app.get('/api/user/posts', verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT posts.ID, MIN(posts.title) as title, MIN(users.username) as username, Count(DISTINCT favourites.ID) as likes, MIN(images.image) as image, CASE WHEN EXISTS ( SELECT 1 FROM favourites WHERE favourites.ID_post = posts.ID AND favourites.ID_user = users.ID ) THEN TRUE ELSE FALSE END AS liked, COALESCE(MAX(bids.price), posts.startbid) AS last_bid FROM `posts` INNER JOIN users on users.ID=posts.ID_user LEFT JOIN favourites on favourites.ID_post=posts.ID INNER JOIN posts_images on posts_images.ID_post=posts.ID INNER JOIN images on images.ID=posts_images.ID_image LEFT JOIN bids on bids.ID_post=posts.ID WHERE posts.status=2 AND users.ID = ? GROUP BY posts.ID";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user profile data: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while fetching profile data.' });
    }
    res.status(200).json(result);
  });
});

app.get('/api/user/pending', verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT posts.ID, MIN(posts.title) as title, MIN(users.username) as username, Count(DISTINCT favourites.ID) as likes, MIN(images.image) as image, CASE WHEN EXISTS ( SELECT 1 FROM favourites WHERE favourites.ID_post = posts.ID AND favourites.ID_user = users.ID ) THEN TRUE ELSE FALSE END AS liked, COALESCE(MAX(bids.price), posts.startbid) AS last_bid FROM `posts` INNER JOIN users on users.ID=posts.ID_user LEFT JOIN favourites on favourites.ID_post=posts.ID INNER JOIN posts_images on posts_images.ID_post=posts.ID INNER JOIN images on images.ID=posts_images.ID_image LEFT JOIN bids on bids.ID_post=posts.ID WHERE posts.status=1 AND users.ID = ? GROUP BY posts.ID";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user profile data: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while fetching profile data.' });
    }
    res.status(200).json(result);
  });
});

app.get('/api/user/favourites', verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT posts.ID, MIN(posts.title) as title, MIN(users2.username) as username, Count(DISTINCT favourites.ID) as likes, MIN(images.image) as image, CASE WHEN EXISTS ( SELECT 1 FROM favourites WHERE favourites.ID_post = posts.ID AND favourites.ID_user = users.ID ) THEN TRUE ELSE FALSE END AS liked, COALESCE(MAX(bids.price), posts.startbid) AS last_bid FROM `posts` LEFT JOIN favourites on favourites.ID_post=posts.ID INNER JOIN posts_images on posts_images.ID_post=posts.ID INNER JOIN images on images.ID=posts_images.ID_image LEFT JOIN bids on bids.ID_post=posts.ID INNER JOIN favourites as favs on favs.ID_post=posts.ID INNER JOIN users on favs.ID_user=users.ID INNER JOIN users as users2 on users2.ID=posts.ID_user WHERE posts.status=2 AND users.ID = ? GROUP BY posts.ID";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user profile data: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while fetching profile data.' });
    }
    res.status(200).json(result);
  });
});

app.get('/api/user/bids', verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT posts.ID, MIN(posts.title) as title, MIN(users2.username) as username, Count(DISTINCT favourites.ID) as likes, MIN(images.image) as image, CASE WHEN EXISTS ( SELECT 1 FROM favourites WHERE favourites.ID_post = posts.ID AND favourites.ID_user = users.ID ) THEN TRUE ELSE FALSE END AS liked, COALESCE(MAX(bids.price), posts.startbid) AS last_bid FROM `posts` LEFT JOIN favourites on favourites.ID_post=posts.ID INNER JOIN posts_images on posts_images.ID_post=posts.ID INNER JOIN images on images.ID=posts_images.ID_image LEFT JOIN bids on bids.ID_post=posts.ID INNER JOIN users on bids.ID_user=users.ID INNER JOIN users as users2 on users2.ID=posts.ID_user WHERE posts.status=2  AND users.ID = ?  AND posts.startDate > DATE_SUB(CURDATE(), INTERVAL 2 DAY) GROUP BY posts.ID";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user profile data: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while fetching profile data.' });
    }
    res.status(200).json(result);
  });
});

app.get('/api/user/acquisitions', verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT posts.ID, MIN(posts.title) as title, MIN(users2.username) as username, Count(DISTINCT favourites.ID) as likes, MIN(images.image) as image, CASE WHEN EXISTS ( SELECT 1 FROM favourites WHERE favourites.ID_post = posts.ID AND favourites.ID_user = users.ID ) THEN TRUE ELSE FALSE END AS liked, COALESCE(MAX(bids.price), posts.startbid) AS last_bid FROM `posts` LEFT JOIN favourites on favourites.ID_post=posts.ID INNER JOIN posts_images on posts_images.ID_post=posts.ID INNER JOIN images on images.ID=posts_images.ID_image LEFT JOIN bids on bids.ID_post=posts.ID INNER JOIN users on bids.ID_user=users.ID INNER JOIN users as users2 on users2.ID=posts.ID_user WHERE posts.status=2  AND users.ID = ?  AND posts.startDate <= DATE_SUB(CURDATE(), INTERVAL 2 DAY) GROUP BY posts.ID";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user profile data: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while fetching profile data.' });
    }
    res.status(200).json(result);
  });
});

app.post('/api/user/add_favourite', verifyToken, (req, res) => {
  const userId = req.user.id;
  const { postId } = req.body;

  console.log(postId);

  const sql = "INSERT INTO `favourites`(`ID_post`, `ID_user`) VALUES (?,?)";
  connection.query(sql, [postId,userId], (err, result) => {
    if (err) {
      console.error('Error adding to favourites: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while adding to favourites.' });
    }
    res.status(200).json({ message: 'Added to favourites!' });
  });
});

app.post('/api/user/delete_favourite', verifyToken, (req, res) => {
  const userId = req.user.id;
  const { postId } = req.body;

  const sql = "DELETE FROM `favourites` WHERE ID_post =? AND ID_user=?";
  connection.query(sql, [postId,userId], (err, result) => {
    if (err) {
      console.error('Error deleteing favourites: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while deleting favourites.' });
    }
    res.status(200).json({ message: 'Deleted from favourites!' });
  });
});

app.get('/api/user/details', verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT `username`, `fisrtname`, `lastname`, `email` FROM `users` WHERE ID=?";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user details: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while fetching user details.' });
    }
    res.status(200).json(result[0]);
  });
});

app.post('/api/user/modif_details', verifyToken, (req, res) => {
  const userId = req.user.id;
  const { username,firstname,lastname,email } = req.body;

  const sql = "UPDATE `users` SET `username`=?,`fisrtname`=?,`lastname`=?,`email`=? WHERE ID=?";
  connection.query(sql, [username,firstname,lastname,email,userId], (err, result) => {
    if (err) {
      console.error('Error deleteing favourites: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while deleting favourites.' });
    }
    res.status(200).json({ message: 'Updates details!' });
  });
});

app.get('/api/admin/users', verifyToken, checkUserRole(2), (req, res) => {
  const sql = "SELECT users.ID as id, users.username, users.email, CASE WHEN users.Type=2 THEN TRUE ELSE FALSE END as isAdmin FROM `users` ";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving users from database' });
    }
    res.status(200).json(results);
  });
});

app.get('/api/admin/sellers', verifyToken, checkUserRole(2), (req, res) => {
  const sql = "SELECT users.ID, MIN(users.username) as username,  MIN(users.email) as email, COUNT(DISTINCT CASE WHEN posts.status = 2 THEN posts.ID ELSE NULL END) as post_count FROM  users LEFT JOIN  posts ON posts.ID_user = users.ID GROUP BY users.ID ORDER BY post_count DESC LIMIT 5;";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving users from database' });
    }
    res.status(200).json(results);
  });
});

app.get('/api/admin/bidders', verifyToken, checkUserRole(2), (req, res) => {
  const sql = "SELECT users.ID, MIN(users.username) as username, MIN(users.email) as email, COUNT(DISTINCT posts.ID) AS bids FROM `posts` LEFT JOIN bids on bids.ID_post=posts.ID INNER JOIN users on bids.ID_user=users.ID INNER JOIN users as users2 on users2.ID=posts.ID_user WHERE posts.status=2 GROUP BY users.ID ORDER BY bids DESC LIMIT 5;";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving users from database' });
    }
    res.status(200).json(results);
  });
});

app.get('/api/admin/exp_art', verifyToken, checkUserRole(2), (req, res) => {
  const sql = "SELECT posts.ID, MIN(posts.title) as title,MIN(users.username) as username, MAX(bids.price) as highest_bid FROM posts INNER JOIN bids on bids.ID_post=posts.ID INNER JOIN users on users.Id=posts.ID_user GROUP BY posts.ID ORDER BY highest_bid DESC LIMIT 5;";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving users from database' });
    }
    res.status(200).json(results);
  });
});

app.post('/api/admin/delete_user', verifyToken, checkUserRole(2), (req, res) => {
  const { userId } = req.body;
  
  const sql = "DELETE FROM `users` WHERE ID = ?";
  connection.query(sql,[userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving users from database' });
    }
    res.status(200).json({ message: 'Deleted user!' });
  });
});

app.post('/api/admin/delete_post', verifyToken, checkUserRole(2), (req, res) => {
  const { postId } = req.body;
  
  const sql = "DELETE FROM `posts` WHERE ID = ?";
  connection.query(sql,[postId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting post' });
    }
    res.status(200).json({ message: 'Deleted post!' });
  });
});

app.post('/api/admin/make_user_admin', verifyToken, checkUserRole(2), (req, res) => {
  const { userId } = req.body;
  
  const sql = "UPDATE `users` SET `Type`=2 WHERE users.ID= ? ";
  connection.query(sql,[userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving changind status' });
    }
    res.status(200).json({ message: 'Changing user status!' });
  });
});

app.get('/api/admin/posts', verifyToken, checkUserRole(2), (req, res) => {
  const sql = "SELECT posts.ID, posts.title, users.username as author, CASE WHEN posts.startDate > NOW() - INTERVAL 2 DAY THEN 'Active' ELSE 'Closed' END AS status FROM `posts` INNER JOIN users on posts.ID_user=users.ID where posts.status=2";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving users from database' });
    }
    res.status(200).json(results);
  });
});

app.get('/api/admin/pending', verifyToken, checkUserRole(2), (req, res) => {
  const sql = "SELECT posts.ID, posts.title, users.username as author, CASE WHEN posts.startDate > NOW() - INTERVAL 2 DAY THEN 'Active' ELSE 'Closed' END AS status FROM `posts` INNER JOIN users on posts.ID_user=users.ID where posts.status=1";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving users from database' });
    }
    res.status(200).json(results);
  });
});

app.post('/api/admin/pending_decline', verifyToken, checkUserRole(2), (req, res) => {
  const {postId}=req.body;

  const sql = "UPDATE `posts` SET `status`=0 WHERE posts.ID=?";
  connection.query(sql,[postId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving users from database' });
    }
    res.status(200).json(results);
  });
});

app.post('/api/admin/pending_confirm', verifyToken, checkUserRole(2), (req, res) => {
  const {postId}=req.body;

  const sql = "UPDATE `posts` SET `status`=2 WHERE posts.ID=?";
  connection.query(sql,[postId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving users from database' });
    }
    res.status(200).json(results);
  });
});

app.get('/api/post/details', (req, res) => {
  const { postId } = req.query; // Changed from req.body to req.query
  console.log(req.query);

  const sql = "SELECT posts.title, posts.author, posts.description, posts.styles, COALESCE(MAX(bids.price), posts.startbid) AS lastBid, (SELECT users.username FROM bids LEFT JOIN users ON bids.ID_user = users.ID WHERE bids.ID_post = posts.ID ORDER BY bids.price DESC LIMIT 1) AS lastBidder, DATE_ADD(posts.startDate, INTERVAL 2 DAY) AS endTime FROM posts LEFT JOIN bids on bids.ID_post = posts.ID LEFT JOIN users on bids.ID_user = users.ID WHERE posts.ID = ?";
  connection.query(sql, [postId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving post from database' });
    }
    res.status(200).json(results[0]);
  });
});

app.get('/api/post/images',(req, res) => {
  const {postId}=req.query;
  console.log(postId);

  const sql = "SELECT images.image FROM posts INNER JOIN posts_images ON posts_images.ID_post = posts.ID INNER JOIN images ON images.ID = posts_images.ID_image WHERE posts.ID = ?";
  connection.query(sql,[postId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error retrieving post s images from database' });
    }
    res.status(200).json(results);
  });
});

app.post('/api/post/bid', verifyToken, (req, res) => {
  const { postId, bid } = req.body;
  const userId = req.user.id;

  console.log('Post ID:', postId);
  console.log('User ID:', userId);

  const sql = "INSERT INTO `bids`(`ID_user`, `ID_post`, `price`) VALUES (?, ?, ?)";
  connection.query(sql, [userId, postId, bid], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Error making bid' });
    }
    res.status(200).json({ message: 'Bid inserted!' });
  });
});

app.get('/api/post/valid',(req, res) => {
  const {postId}=req.query;

  const sql = "SELECT * from posts where status=2 AND ID = ?";
  connection.query(sql,[postId] ,(err, result) => {
    if (err) {
      console.error('Error fetching user profile data: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while fetching profile data.' });
    }
    if (result.length === 0)
      res.status(200).json({ valid: false });
    else
    res.status(200).json({ valid: true });
  });
});

app.get('/api/allposts_u', verifyToken, (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT posts.ID, MIN(posts.title) as title, MIN(users.username) as username, Count(DISTINCT favourites.ID) as likes, MIN(images.image) as image, CASE WHEN EXISTS ( SELECT 1 FROM favourites WHERE favourites.ID_post = posts.ID AND favourites.ID_user = ? ) THEN TRUE ELSE FALSE END AS liked, COALESCE(MAX(bids.price), posts.startbid) AS last_bid FROM `posts` LEFT JOIN favourites on favourites.ID_post=posts.ID INNER JOIN posts_images on posts_images.ID_post=posts.ID INNER JOIN images on images.ID=posts_images.ID_image LEFT JOIN bids on bids.ID_post=posts.ID  INNER JOIN users on posts.ID_user=users.ID WHERE posts.status=2 GROUP BY posts.ID";
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error fetching user profile data: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while fetching profile data.' });
    }
    res.status(200).json(result);
  });
});

app.get('/api/allposts_g', (req, res) => {
  const sql = "SELECT posts.ID, MIN(posts.title) as title, MIN(users.username) as username, Count(DISTINCT favourites.ID) as likes, MIN(images.image) as image, FALSE AS liked, COALESCE(MAX(bids.price), posts.startbid) AS last_bid FROM `posts` LEFT JOIN favourites on favourites.ID_post=posts.ID INNER JOIN posts_images on posts_images.ID_post=posts.ID INNER JOIN images on images.ID=posts_images.ID_image LEFT JOIN bids on bids.ID_post=posts.ID  INNER JOIN users on posts.ID_user=users.ID WHERE posts.status=2 GROUP BY posts.ID";
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching user profile data: ' + err.stack);
      return res.status(500).json({ message: 'An error occurred while fetching profile data.' });
    }
    res.status(200).json(result);
  });
});


// Start the server
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
