import { useState, useEffect } from "react"

import "./MovieGrid.css"

const moviesUrl = import.meta.env.VITE_API
const apiKey = import.meta.env.VITE_API_KEY

import MovieCard from "../components/MovieCard"

const Home = () => {

  const [topMovies, setTopMovies] = useState([])

  const getTopRateMovies = async (url) => {

    const res = await fetch(url)

    const data = await res.json()

    console.log(data.results)

    setTopMovies(data.results)

  }

  useEffect(() => {

    const topRateUrl = `${moviesUrl}top_rated?${apiKey}`

    console.log(topRateUrl)

    getTopRateMovies(topRateUrl)

  }, [])

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p className="spinner"></p>}
        {topMovies.length > 0 && topMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Home