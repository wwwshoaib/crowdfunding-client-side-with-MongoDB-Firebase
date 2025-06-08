import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

export const AuthContext = createContext(null);


const AuthProviders = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    //Creating a user
    const createUser = (email, password) => {
        setLoading(true);
        setUser(user)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //sign in an User

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //sign out a User
    const signOut = () => {
          setLoading(true);
        return signOut(auth);
    }

    
     //update a user's profile

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    };



    const userInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signOut,
        updateUserProfile, 
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
