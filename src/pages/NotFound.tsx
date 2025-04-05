import { FC } from "react";
import { Link } from "react-router-dom";

export const NotFound: FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-700 mt-4">
          Oops! The page you are looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};
