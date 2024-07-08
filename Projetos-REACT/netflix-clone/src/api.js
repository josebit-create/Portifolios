const apiKey = "8e6ec7b1cba41cc0f9e1d59d1c6395f1"

const categories = [
    {
      name: "trending",
      title: "Em alta",
      path: `/trending/all/week?api_key=${apiKey}&language=pt-BR`,
      isLarge: true,
    },
    {
      name: "netflixOriginals",
      title: "Originais Netflix",
      path: `/discover/tv?api_key=${apiKey}&with_networks=213`,
      isLarge: false,
    },
    {
      name: "topRated",
      title: "Populares",
      path: `/movie/top_rated?api_key=${apiKey}&language=pt-BR`,
      isLarge: false,
    },
    {
      name: "comedy",
      title: "Comédias",
      path: `/discover/tv?api_key=${apiKey}&with_genres=35`,
      isLarge: false,
    },
    {
      name: "romances",
      title: "Romances",
      path: `/discover/tv?api_key=${apiKey}&with_genres=10749`,
      isLarge: false,
    },
    {
      name: "documentaries",
      title: "Documentários",
      path: `/discover/tv?api_key=${apiKey}&with_genres=99`,
      isLarge: false,
    },
    {
      name: "action e adventure",
      title: "Ação e aventura",
      path: `/discover/tv?api_key=${apiKey}&with_genres=10759`,
      isLarge: false,
    },
    {
      name: "reality",
      title: "Reality Shows",
      path: `/discover/tv?api_key=${apiKey}&with_genres=10764`,
      isLarge: false,
    },
  ];
  
export const getMovies = async (path) => {
    try {
      let url = `https://api.themoviedb.org/3${path}`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.log("error getMovies: ", error);
    }
  };
  
export default categories;