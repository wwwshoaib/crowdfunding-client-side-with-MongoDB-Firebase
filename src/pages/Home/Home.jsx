import Slider from "../../components/Banner/Slider";
import SuccessStory from "../../components/SuccessStory/SuccessStory";
import Testimonial from "../../components/Testimonial/Testimonial";


const Home = () => {
    return (
        <div className="w-11/12 mx-auto">
            <Slider></Slider>
            {/* Section: Running campaign */}
            <div>
                <div className="text-center my-10">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Running Campaign</h2>
                    <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
                </div>
               
            </div>
            {/* Section: Success Story */}
            <div>
                <div className="text-center my-10">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Success Story</h2>
                    <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
                </div>
                <SuccessStory></SuccessStory>
            </div>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;