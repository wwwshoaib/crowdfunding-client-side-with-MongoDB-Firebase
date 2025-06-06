import Slider from "../../components/Banner/Slider";
import Cards from "../../components/Cards/Cards";


const Home = () => {
    return (
        <div className="w-11/12 mx-auto">
                 <Slider></Slider>
                 {/* Section: Running campaign */}
                 <div>
                    <div className="text-center">
                        <h2 className="text-xl md:text-2xl text-gray-800 py-10 font-semibold">Running Campaign</h2>
                    </div>
                    <Cards></Cards>
                 </div>
        </div>
    );
};

export default Home;