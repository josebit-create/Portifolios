import "./Row.css"

import { useState, useEffect } from "react";
import { getMovies } from "../api";

import ReactPlayer from "react-player"

const imageHost = "https://image.tmdb.org/t/p/original/";

import movieTrailer from "movie-trailer"

const Row = ({ title, path, isLarge }) => {
  const [movies, setMovies] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState("")

  const handleOnClick = (movie) => {
      if (trailerUrl) {
        setTrailerUrl("")
      } else {
        movieTrailer(movie?.name || movie?.title || movie?.original_name || "").then(url => setTrailerUrl(url))
        .catch(error => console.log("error fetching movie trailer: ", error))
      }
  }

  const fetchMovies = async (_path) => {
    try {
      const data = await getMovies(_path);
      setMovies(data?.results);
    } catch (error) {
      console.log("fetchMovies error: ", error);
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path]);

  return (
    <div className="row-container">
      <h2 className="row-header">{title}</h2>
      <div className="row-cards">
        {movies &&
          movies.map((movie) => (
            <img onClick={() => handleOnClick(movie)} className={`movie-card ${isLarge && "movie-card-large"}`}
              src={`${imageHost}${isLarge ? movie.backdrop_path: movie.poster_path}`}
              alt={movie.name}
              key={movie.id}
            />
          ))}
      </div>
      {trailerUrl && <ReactPlayer playing={true} url={trailerUrl}/>}
    </div>
  );
};

export default Row;
