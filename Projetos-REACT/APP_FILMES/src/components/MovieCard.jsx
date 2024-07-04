import { Link } from "react-router-dom"

import {FaStar} from "react-icons/fa"

const imageUrl = import.meta.env.VITE_IMG


const MovieCard = ({movie, showLink = true}) => {
  return (
    <div className="movie-card">
        <img src={imageUrl + movie.poster_path} alt={movie.tile} />
        <h2>{movie.title}</h2>
        <p>
            <FaStar /> {movie.vote_average}
        </p>
        {showLink && <Link to={`movies/${movie.id}`}>Detalhes</Link>}
    </div>
  )
}

export default MovieCard