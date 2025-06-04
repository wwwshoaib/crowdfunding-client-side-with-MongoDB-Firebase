
import { Outlet } from "react-router";
import Footer from "../components/Footer/Footer";  
import Navbar from "../components/Navbar/Navbar";


const HomeLayout = () => {
    return (
        <div>
            {/* Header */}
            <Navbar></Navbar>
            {/* dynamic section */}
            <Outlet></Outlet>
            {/* Footer */}
            <Footer></Footer>
            
        </div>
    );
};

export default HomeLayout;