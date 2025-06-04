import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/Loading";
import PropTypes from "prop-types";






const PrivateRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    //console.log(location)
  
    if(loading) {
        return <Loading></Loading>
    }
    

    if ( user && user?.email) {
        return children;
    }
    return ( <Navigate   state={location.pathname} to = {"/auth/login"}></Navigate> );
};
PrivateRoute.propTypes = {
    children:PropTypes.node.isRequired
}
export default PrivateRoute;