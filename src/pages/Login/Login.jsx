import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProviders";
import toast from "react-hot-toast";
const Login = () => {
    const { signInUser, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = e.target.email.value;
        const password = e.target.password.value;
        //  console.log({ email, password });
        //sign in user
        signInUser(email, password)
            .then(result => {
                const loggedUser = result.user;

                // Manually update user context
                setUser(loggedUser);

                toast.success('Logged in successfully!');
                navigate("/");
            })
            .catch(error => {
                console.log('Error:', error);
                toast.error('Something went wrong!');
            });

        form.reset();
    };
    return (
        <div className="w-11/12 mx-auto">
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img className="mx-auto h-10 w-auto" src="https://www.svgrepo.com/show/301692/login.svg" alt="Login" />
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Log in to your account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form method="POST" action="#" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="Type email"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="Type password"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 transition duration-150 ease-in-out"
                                >
                                    Log In
                                </button>
                            </div>
                        </form>
                    </div>
                    {/*  */}
                    <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                        Don’t have an account? , &nbsp;
                        <Link
                            to="/register"
                            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                        >
                            Register Now
                        </Link>
                    </p>
                    {/*  */}
                </div>
            </div>
        </div>
    );
};

export default Login;
