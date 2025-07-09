import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from '../../assets/lottie/error-black-cat.json'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-red-100 to-slate-100 px-4 text-center space-y-4">

      <div className="w-72 md:w-96">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>



      <div className="bg-red-200 text-red-700 px-6 py-3 rounded-lg shadow-md max-w-md">
        <i>{error.statusText || error.message}</i>
      </div>

      {error.status === 404 && (
        <p className="text-3xl font-bold text-red-500  animate-bounce">
         Page Not Found
        </p>
      )}

      <Link to="/">
        <button className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-xl shadow-md transition duration-300">
          ⬅ Back to Home
        </button>
      </Link>
    </div>
  );
}
