import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="h-lvh flex flex-col justify-center items-center bg-slate-100 space-y-3">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="bg-red-400 px-4 py-2">
        <i className="font-bold ">{error.statusText || error.message}</i>
      </p>
      {
        error.status === 404 && <div>
          <i  className="bg-red-400 underline">Page Not Found</i>

        </div>
      }

      <p>Go back to home</p>
      <Link to='/'><button className="btn btn-success">Home</button></Link>


    </div>
  );
}
