
const Cards = () => {
    return (
        <div className="">
            <div className="sm:grid lg:grid-cols-3 sm:grid-cols-2 gap-10">
                {[...Array(6)].map((_, index) => (
                    <div
                        key={index}
                        className="hover:bg-green-200 hover:text-black transition duration-300 max-w-sm rounded overflow-hidden shadow-lg"
                    >
                        <div className="py-4 px-2 md:px-2">

                            <a href="#">
                                <h4 className="text-lg mb-3 font-semibold">How to be effective at working remotely?</h4>
                            </a>
                            <p className="mb-2 text-sm text-gray-600">
                                Lorem Ipsum is simply dummy text of the printing and typesetting
                                industry. Lorem Ipsum has been the industrs standard dummy text ever since the 1500s
                            </p>
                            <img
                                src="https://images.pexels.com/photos/461077/pexels-photo-461077.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                alt="Remote Work"
                                className="w-100"
                            />
                            <hr className="mt-4" />
                            {/* button: see more */}
                            <div className="text-center bg-violet-400 px-5 py-2">
                                <button>See More ... </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cards;
