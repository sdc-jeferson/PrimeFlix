import "./favorites.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const myList = localStorage.getItem("@primeflix");
    setMovies(JSON.parse(myList) || []);
  }, []);

  function removeMovie(movie) {
    let items = JSON.parse(localStorage.getItem("@primeflix"));
    items = movies.filter((item) => item.id !== movie);
    localStorage.setItem("@primeflix", JSON.stringify(items));
    setMovies(items);
  }

  return (
    <div className="my-movies">
      <h1>Meus Filmes</h1>
      <ul>
        {movies.map((item) => {
          return (
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
                <Link to={`/movie/${item.id}`}>Ver detalhes</Link>
                <button onClick={() => removeMovie(item.id)}>Excluir</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Favorites;
