import { NavLink } from "react-router";
import Dropdown from "../DropDown/DropDown";
import { Link } from "react-router";

const Navbar = () => {
  

    

    //console.log(createUser)

    const links = <>
        <li className=" hover:text-green-400"><NavLink to="/">Home</NavLink></li>
        <li className=" hover:text-green-400"><NavLink to="/campaigns">All Campaigns</NavLink></li>
        <li className=" hover:text-green-400"><NavLink to="/addCampaign">Add New Campaign</NavLink></li>
        <li className=" hover:text-green-400"><NavLink to="/myCampaign">My Campaign</NavLink></li>
        <li className=" hover:text-green-400" ><NavLink to="/myDonations">My Donations</NavLink></li>
    </>

    /**
     * 
     * //sign out a user
    const handleSignOut = () => {
        signOut()
            .then(() => {
                toast.success('User sign out successfully')
            })
            .catch(error => {
                console.log('Error:', error.message)
            })
    }
     */
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
                  <Link to="/">
                  <a className="hover:text-cyan-500 text-2xl md:text-4xl font-dancing
                   text-violet-500 font-bold">CrowdFunding</a></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                        {/* log in and log out button  */}
                        
                        {/*  */}
                    </ul>
                </div>
                <div className="navbar-end">
                    <Dropdown></Dropdown>
                   
                </div>
            </div>
        </div>
    );
};

export default Navbar;