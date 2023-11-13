import { useRouteError } from "react-router-dom";
import './show.scss';
import { GlobalLayout } from "../../layouts/Pages";

export  const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (

      <div className="p-error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>

  );
}