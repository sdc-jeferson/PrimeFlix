import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../services/api";
import "./movie.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import Toastify from "toastify-js";

function Movie() {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [loadign, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadMovieDetail() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "489f74f922cd9fcb726f3a3f41bb20a8",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setMovieDetail(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigate("/", { replace: "true" });
        });
    }
    loadMovieDetail();
  }, [id, navigate]);
  // Sempre que usar algo externo fora do useEffect, passar como dependencia dele.

  function saveMovie() {
    const myList = localStorage.getItem("@primeflix");
    let moviedSaves = JSON.parse(myList) || [];

    const hasMovie = moviedSaves.some(
      (moviesaved) => moviesaved.id === movieDetail.id
    );

    if (hasMovie) {
      Toastify({
        text: "Eesse filme ja está na lista",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        // stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#dc3545",
        },
      }).showToast();
      return;
    }

    moviedSaves.push(movieDetail);
    localStorage.setItem("@primeflix", JSON.stringify(moviedSaves));
    Toastify({
      text: "Filme salvo com sucesso",
      duration: 2000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "left", // `left`, `center` or `right`
      // stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "#28a745",
      },
    }).showToast();
  }

  if (loadign) {
    return (
      <div className="movie-info">
        <h1>Carregando o filme ...</h1>
      </div>
    );
  }

  return (
    <div className="movie-info">
      <Link to="/" className="back">
        <FaArrowLeftLong />
      </Link>
      <h1>{movieDetail.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path} `}
        alt={movieDetail.title}
      />

      <h3>Sinopse</h3>
      <span>{movieDetail.overview}</span>
      <strong>Avaliação : {movieDetail.vote_average.toFixed(1)} / 10</strong>

      <div className="area-buttons">
        <button onClick={saveMovie}>Salvar</button>
        <button>
          <a
            href={`https://youtube.com/results?search_query=${movieDetail.title} Trailer`}
            target="blank"
            rel="external"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}

export default Movie;
