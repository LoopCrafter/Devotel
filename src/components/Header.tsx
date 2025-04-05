
import { FC } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./shared";

export const Header: FC = () => {
  

  return (
    <nav className="bg-blue-500 dark:bg-black p-4 flex justify-between items-center">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white hover:text-gray-300">
            Form Page
          </Link>
        </li>
        <li>
          <Link to="/applications" className="text-white hover:text-gray-300">
            Applications
          </Link>
        </li>
      </ul>
      <ThemeToggle />
    </nav>
  );
};
