import { NavLink } from "react-router";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router";

const Navbar = () => {
    const { user, signOut } = useContext(AuthContext);

    const links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/allCampaigns">All Campaigns</NavLink></li>
        <li><NavLink to="/addNewCampaign">Add New Campaign</NavLink></li>
        <li><NavLink to="/myCampaign">My Campaign</NavLink></li>
        <li><NavLink to="/myDonations">My Donations</NavLink></li>
    </>

    //sign out a user
    const handleSignOut = () => {
        signOut()
            .then(() => {
                toast.success('User sign out successfully')
            })
            .catch(error => {
                console.log('Error:', error.message)
            })
    }
    return (
        <div className="w-full mx-auto">
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl md:text-2xl text-green-400 font-bold">BD-CrowdFunding</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                   <div className="login flex gap-2 items-center">
                    <div>
                        {
                            user && user?.email ?
                                <div>
                                    <img className="w-10 h-10 rounded-full"
                                        src={user?.photoURL} alt="" />
                                    <p className="text-[10px]">{user?.displayName}</p>
                                </div>
                                :
                                <FaRegUser className="size-4 md:size-5"></FaRegUser>

                        }

                    </div>
                    {
                        (user && user?.email) ?
                            <Link onClick={handleSignOut} to="/" className="btn  bg-green-200 ">Log Out</Link>
                            :
                            <>
                                <Link to="login" className="btn  bg-green-200 ">Login</Link>
                                <Link to="register" className=" btn  bg-green-200 ">Register</Link>
                            </>

                    }
                </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;