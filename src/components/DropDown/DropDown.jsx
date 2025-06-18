import { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import toast from "react-hot-toast";

const Dropdown = () => {
  const { user, signOutUser, } = useContext(AuthContext);
  // handle sign out
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("User signed out successfully");
      })
      .catch((error) => {
        console.log("Error:", error.message);
      });
  };

  return (
    <div className="items-center justify-center">
      <div className="group relative cursor-pointer py-2" >
        <div className="flex items-center justify-between space-x-5 bg-white px-4">
          <button className="menu-hover py-2 text-xl md:text-3xl text-black mx-4">
            {user ? (
              <>
                {user? (
                  <div className="flex items-center gap-2">
                    <img
                      className="w-9 h-9 rounded-full object-cover"
                      src={user.photoURL}
                      alt="User"
                    />
                    <p className="text-sm md:text-md">
                      <strong>{user.displayName}</strong>
                    </p>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">Loading user info...</div>
                )}
              </>

            ) : (
              <CgProfile />
            )}
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
          {user ? (
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleSignOut}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <Link
                to="/login"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 text-center"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 text-center"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
