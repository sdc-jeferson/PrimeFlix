import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "489f74f922cd9fcb726f3a3f41bb20a8",
          language: "pt-BR",
          page: 1,
        },
      });
      setMovie(response.data.results.slice(0, 10));
      setLoading(false);
    }
    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes ...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="list-movies">
        {movie.map((filme) => {
          return (
            <article key={filme.id}>
              <h1>{filme.title}</h1>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path} `}
                alt={filme.title}
              />
              <Link to={`/movie/${filme.id}`} className="btn-access">
                Acessar
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
