import { Link } from "react-router-dom";
import "./error.css";
function Error() {
  return (
    <div className="container-error">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <Link to="/">Voltar para Home</Link>
    </div>
  );
}

export default Error;
