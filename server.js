const { response } = require('express');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
// Initialize our app variable by setting it to the value of express()
const app = express();
// listens to server port or if no server use localhost 3001
const PORT = process.env.PORT || 3001;

// middleware
// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Plotinuss2!',
    database: 'movie_db'
  },
  console.log(`Connected to the movie_db database.`)
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// SELECT movies.id, title, movie_reviews
// FROM movies
// JOIN reviews ON reviews.movie_id = movies.id;

// Query database


// Get movie names
app.get("/api/movies", (req, res) => {
  db.query('SELECT * FROM movies', 
    function (err, results) {
      res.json(results);
    });
});

// Add movie
app.post("/api/add-movies", ({body}, res) => {
  const sql = "INSERT INTO movies (title) VALUES (?)";
  const params = [body.title];

  db.query(sql, params, (err, result) => {
    res.json(result);
  })
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
