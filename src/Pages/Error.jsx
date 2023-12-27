import { Link, useRouteError } from "react-router-dom";
import "./Error.css";

export default function Error() {
  const error = useRouteError();

  return (
    <div className="flex dark:bg-stone-900 dark:text-slate-200 flex-col justify-center items-center min-h-screen bg-slate-100">
      <p className="zoom-area">
        {error.status === 404 ? "This Page is Not Found!" : error.message}
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <Link to="/React-Pizza-App/" className="more-link">
          Go To Home
        </Link>
      </div>
    </div>
  );
}
