import React, {useState, useEffect} from "react";
import logo from './images/logo.svg';
import closeIcon from './images/close-icon.svg';
import noImage from './images/no-image.png';
import SearchBox from "./components/SearchBox";
import MovieList from "./components/MovieList";
import Loader from "./components/UI/Loader/Loader";
import Modal from "./components/UI/Modal/Modal";
import {BASE_URL, BACKDROP_SIZE, SECURE_IMAGE_BASE_URL} from './utils/constants';
import axios from "axios";
import moment from "moment";
const App = () => {
	const [loading, setLoading] = useState(true);
	const [recentMovies, setRecentMovies] = useState([]);
	const [searchKeyword, setSearchKeyword] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [movieDetail, setMovieDetail] = useState({
		title: "",
		overview: "",
		backdrop_path: "",
		poster_path:"",
		release_date:"",
		vote_average:"",
		vote_count:""
	});
	useEffect(() => {
		getMovieList(searchKeyword);
	}, [searchKeyword]);

	const getMovieList = async (searchValue) => {		
		let url = `${BASE_URL}/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}`;
		if (searchValue) {
			url = `${BASE_URL}/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=1&include_adult=false&query=${searchValue}`;
		}
		setLoading(true);		
		await axios.get(url)
		.then((response) => {
			if (response.data.results.length) {
				setRecentMovies(response.data.results);
			}
			setLoading(false);
		})
		.catch((error) => {
			console.log(error);
			setLoading(false);
		})
	};

	const movieDetailHandler = (movieDetail) => {
		setShowModal(true);
		setMovieDetail(movieDetail);
	}

	const modalPopUp = () => {
		const imageBaseUrl = `${SECURE_IMAGE_BASE_URL}/${BACKDROP_SIZE}`;
		let movieRating = movieDetail.vote_average;
		if (!isNaN(movieRating)) {
			movieRating = movieRating.toFixed(1);
		}
		return <div className="modal">
		<div className="modal-content">
			<div className="main-header" style={{padding: 0}}>
				<div className="container" style={{height:'70px', lineHeight:'27px'}}>
						<h1 className="title">
							{movieDetail.title}
						</h1>
						<span className="pointer-cursor" onClick={() => setShowModal(false)}>
							<img src={closeIcon} alt="close" />
						</span>
				</div>
			</div>
			<div className="row">
				<div className="column">
					<img src={movieDetail.poster_path !== null ?`${imageBaseUrl}${movieDetail.poster_path}` : noImage} title={movieDetail.title} alt={movieDetail.title}/>
				</div>
				<div className="column pd-l-10">
					<div className="form-group d-flex">
						<label className="label-name fw-600">Release Date</label>
						<span className="" style={{width: "5%"}}>:</span>
						<label className="label-name">{moment(movieDetail.release_date).format("MMM D, YYYY")}</label>
					</div>
					<div className="form-group">
						<p>
							{movieDetail.overview}
						</p>
					</div>
					<div className="form-group">
					<label className="label-name fw-600">{movieRating}</label><span> / </span><label className="label-name">10 ({movieDetail.vote_count} total votes)</label>
					</div>
				</div>
			</div>
		</div>
	</div>
	}

	return (
		<div className="wrapper">
			<header  className="main-header">
				<div className="container">
					<h1 className="mh-logo">
						<img src={logo} width="170" height="95" alt="TimeScale" />
					</h1>
					<SearchBox searchValue={searchKeyword} setSearchValue={setSearchKeyword} />
				</div>				
			</header>
			<div style={{width:'99%', padding:'0 10px'}}>
				<hr/>
				<h2>Most Recent Movies</h2>
			</div>
			<div className="container" style={{textAlign:'center'}}>
				{
					loading
					?
					<Loader />
					:
					<div className="gallery">
						<MovieList
							movies={recentMovies}
							getMovieDetail={movieDetailHandler}
						/>
					</div>
				}
			</div>
			{
				showModal ? (
					<Modal>
						{
							modalPopUp()
						}
					</Modal>
					) : null
			}
		</div>
		
	)
}
	


export default App;
