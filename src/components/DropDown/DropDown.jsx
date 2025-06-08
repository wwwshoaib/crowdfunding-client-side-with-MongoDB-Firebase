import { CgProfile } from "react-icons/cg";
import { Link } from "react-router";
const Dropdown = () => {
  return (
    <div className=" items-center justify-center ">
      <div className="group relative cursor-pointer py-2">
        <div className="flex items-center justify-between space-x-5 bg-white px-4">
          <button className="menu-hover py-2  text-lg md:text-2xl text-black mx-4">
            <CgProfile />
          </button>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </div>

        <div className="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-4 px-4 text-gray-800 shadow-xl group-hover:visible">
          <div className="flex flex-col space-y-2">
            <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              <Link to="/login">Log in</Link>

            </button>
            <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              <Link to="/register">Register</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
