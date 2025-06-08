import { useEffect } from 'react';
import { FaStar, FaStarHalfAlt, FaChevronLeft, FaChevronRight, FaRegStar } from 'react-icons/fa';

const Testimonial = () => {
    useEffect(() => {
        const track = document.getElementById('testimonial-track');
        const cards = document.querySelectorAll('.testimonial-card');
        const prevBtn = document.getElementById('prev');
        const nextBtn = document.getElementById('next');
        const dots = document.querySelectorAll('.indicator-dot');

        let currentIndex = 0;
        let autoSlideInterval;

        const getVisibleCards = () => {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        };

        const updateCarousel = () => {
            const cardWidth = cards[0].offsetWidth;
            const offset = -currentIndex * cardWidth;
            track.style.transform = `translateX(${offset}px)`;

            dots.forEach((dot, index) => {
                dot.classList.toggle('active-dot', index === currentIndex);
            });

            cards.forEach(card => {
                card.classList.remove('animate-fade');
                void card.offsetWidth;
                card.classList.add('animate-fade');
            });
        };

        const nextSlide = () => {
            const visibleCards = getVisibleCards();
            currentIndex = (currentIndex + 1) % (cards.length - visibleCards + 1);
            updateCarousel();
        };

        const prevSlide = () => {
            const visibleCards = getVisibleCards();
            currentIndex = (currentIndex - 1 + (cards.length - visibleCards + 1)) % (cards.length - visibleCards + 1);
            updateCarousel();
        };

        const startAutoSlide = () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        };

        const resetAutoSlide = () => {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        };

        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoSlide();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                resetAutoSlide();
            });
        });

        const carousel = document.getElementById('carousel');
        carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        carousel.addEventListener('mouseleave', startAutoSlide);

        window.addEventListener('resize', () => {
            currentIndex = 0;
            updateCarousel();
        });

        updateCarousel();
        startAutoSlide();

        return () => clearInterval(autoSlideInterval); // cleanup
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-7xl w-full mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">Client Testimonials</h2>
                    <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Hear what our customers say about their experience with our services.
                    </p>
                </div>

                <div className="relative">
                    <button id="prev" className="nav-button absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-8 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-white">
                        <FaChevronLeft className="text-xl" />
                    </button>
                    <button id="next" className="nav-button absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-8 z-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-white">
                        <FaChevronRight className="text-xl" />
                    </button>

                    <div id="carousel" className="overflow-hidden relative">
                        <div id="testimonial-track" className="flex transition-transform duration-500 ease-in-out">
                            {/* Map over testimonials for better scalability */}
                            {[{
                                name: "Alia Begum",
                                title: "SME Employee",
                                image: "https://i.postimg.cc/gjBNVQNC/5.jpg",
                                rating: 5,
                                text: "Thanks to this platform, I raised enough funds to launch my eco-friendly bag business in Dhaka. The support I received from donors was overwhelming. Highly recommended for entrepreneurs!"
                            }, {
                                name: "Milton Khandoker",
                                title: "A Tailor",
                                image: "https://i.postimg.cc/8chL5Yxd/6.jpg",
                                rating: 4.5,
                                text: "After my father’s surgery, we were in debt. Crowdfunding helped us pay the bills. I’m truly grateful to everyone who donated. It restored our hope during a dark time."
                            }, {
                                name: "Dalia Khatun",
                                title: "Student",
                                image: "https://i.postimg.cc/x8tTtymD/7.jpg",
                                rating: 4,
                                text: "As a student in Chittagong, I crowdfunded my tuition fees. I never thought strangers would care so much. This platform changed my life. Thank you for making education possible."
                            }, {
                                name: "Md. Shoaib Ahmed",
                                title: "Teacher, Aspiring Web Developer",
                                image: "https://i.postimg.cc/PJhP65FZ/decd0968-78c3-417b-9c38-8f9173bf23b5.jpg",
                                rating: 5,
                                text: "Our flood relief initiative in Sylhet was successful because of crowdfunding. The quick response and ease of use made it simple to gather help when we needed it most."
                            }].map((testimonial, index) => (
                                <div key={index} className="testimonial-card flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4 animate-fade">
                                    <div className="bg-white p-8 rounded-xl shadow-lg h-full border border-gray-100">
                                        <div className="flex items-center mb-4">
                                            <div className="flex space-x-1 text-yellow-400">
                                                {Array.from({ length: 5 }, (_, i) => {
                                                    if (testimonial.rating >= i + 1) return <FaStar key={i} />;
                                                    if (testimonial.rating > i) return <FaStarHalfAlt key={i} />;
                                                    return <FaRegStar key={i} />;
                                                })}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-6 italic"> &quot;{testimonial.text}&quot;</p>
                                        <div className="flex items-center">
                                            <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-indigo-100" />
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                                                <p className="text-gray-500 text-sm">{testimonial.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center mt-12 space-x-3">
                        {[0, 1, 2, 3].map(i => (
                            <button key={i} className={`indicator-dot w-3 h-3 rounded-full bg-gray-300 transition-all duration-300 ${i === 0 ? 'active-dot' : ''}`}></button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
