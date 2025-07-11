import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../providers/AuthProviders";
import toast from 'react-hot-toast';
import SocialLogin from "../../components/SocialLogin/SocialLogin";


const Register = () => {
    const { createUser, setUser,  updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photo.value;
        const password = e.target.password.value;
        const user = { name, email, photoURL, password };
    
    
        // Minimum password length validation
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters!");
            return;
        }


        // Corrected RegEx Validation
        let passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (!passwordRegEx.test(password)) {
            toast.error(
                "Your password must include at least one uppercase letter, one special character, and six digits."
            );
            return;
        }

        
        //  create user for firebase authentication 
       // Creating a new user
       createUser(email, password)
    .then((result) => {
        const user = result.user;

        return updateUserProfile({
            displayName: name,
            photoURL: photoURL,
        }).then(() => {
            // Manually set updated user
            const updatedUser = {
                ...user,
                displayName: name,
                photoURL: photoURL,
            };
            setUser(updatedUser);

            // Now navigate
            navigate("/");
        });
    })
    .catch((err) => {
        console.log('Error', err.message);
    });


      

      
         fetch('https://crowdfunding-server-beta.vercel.app/users', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                      toast.success("User created successfully!")   
                }
        })

        form.reset();
    };

    return (
        <div className="w-11/12 mx-auto">
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://www.svgrepo.com/show/301692/login.svg"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Create a new account
                    </h2>
                    <p className="mt-2 text-center text-sm leading-5 text-gray-500 max-w">
                        Or, &nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                        >
                            login to your account
                        </Link>
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form onSubmit={handleSignUp}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                                    Name
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="name"
                                        name="name"
                                        placeholder="Type here name"
                                        type="text"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                                    Email Address
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input
                                        id="email"
                                        name="email"
                                        placeholder="Type here email address"
                                        type="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>

                            {/* photo */}

                            <div className="mt-6">
                                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                    Photo URL
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input
                                        id="photo"
                                        name="photo"
                                        type="text"
                                        placeholder="Give here photo URL"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>
                            {/* password */}
                            <div className="mt-6">
                                <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 rounded-md shadow-sm">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <span className="block w-full rounded-md shadow-sm">
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                                    >
                                        Create account
                                    </button>
                                </span>
                            </div>
                        </form>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
