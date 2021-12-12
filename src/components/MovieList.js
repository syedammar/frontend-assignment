import React from 'react';
import { SECURE_IMAGE_BASE_URL, POSTER_SIZE} from '../utils/constants';
import noImage from '../images/no-image.png';

const MovieList = (props) => {
	const imageBaseUrl = `${SECURE_IMAGE_BASE_URL}/${POSTER_SIZE}`;

	return (
		props.movies.map((movie) => {
			let movieRating = movie.vote_average;
			if (!isNaN(movieRating)) {
				movieRating = movieRating.toFixed(1);
			}
			
			return 	<div key={movie.id} className="box pointer-cursor" onClick={() => props.getMovieDetail(movie)}>
						<span className="movie-rating">{movieRating}</span>						
						<img src={movie.poster_path !== null ? `${imageBaseUrl}${movie.poster_path}` : noImage} title={movie.title} alt={movie.title}/>
						<div className="titleBox">{movie.title}</div>
					</div>
		})
	);
};

export default MovieList;
