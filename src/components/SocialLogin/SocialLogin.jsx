
import AuthContext from "../../Context/AuthContext";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";



const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);


    const handleGoogleLogin = () => {

        signInWithGoogle()
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error.message)
            })

    }

    return (
        <div>
            <div className="divider">OR</div>
            <div className="py-2 text-center">
                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center gap-2 mx-auto px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                >
                      <FcGoogle className="text-xl" />
                    <span>Sign in with Google, </span>
                  
                </button>
            </div>


        </div>
    );
};

export default SocialLogin;