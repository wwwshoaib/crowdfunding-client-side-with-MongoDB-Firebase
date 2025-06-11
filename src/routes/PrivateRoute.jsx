import { useContext } from "react";

import { Navigate } from "react-router";
import PropTypes from "prop-types";
import { AuthContext } from "../providers/AuthProviders";


const PrivateRoute = ({children}) => {
    const { user , loading} = useContext(AuthContext)
    
    if(loading) {
        return <>
        <div className="flex justify-center items-center">
            <span className="loading loading-spinner text-primary"></span>;
        </div>
        </>
    }
  
    if(user) {
        return children;
    }
    

    return ( 
        <div>
            <Navigate to ="/login"></Navigate>
        </div>
     );
};
PrivateRoute.propTypes = {
    children:PropTypes.node.isRequired
}
export default PrivateRoute;