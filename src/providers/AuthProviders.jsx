import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const AuthContext = createContext(null);


const AuthProviders = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    
const userInfo = {
    user,
    loading,
    createUser,
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
