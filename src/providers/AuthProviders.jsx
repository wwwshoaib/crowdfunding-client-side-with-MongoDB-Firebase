import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext(null);


const AuthProviders = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    //Creating a user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //sign in User

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    const userInfo = {
        user,
        loading,
        createUser,
        signInUser,
    }
    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

//  Prop types validation
AuthProviders.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProviders;
