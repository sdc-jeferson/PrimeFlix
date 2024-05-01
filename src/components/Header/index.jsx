import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        PrimeFlix
      </Link>
      <Link to="/favorites" className="favoritos">
        Meus Filmes
      </Link>
    </header>
  );
}

export default Header;
