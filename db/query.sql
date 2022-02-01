SELECT movies.id, title, movie_reviews
FROM movies
JOIN reviews ON reviews.movie_id = movies.id;