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
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">Client Testimonials</h2>
                    <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Hear what our customers say about their experience with our products and services.
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
                                name: "Sarah Johnson",
                                title: "Marketing Director, TechCorp",
                                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
                                rating: 5,
                                text: "The service was exceptional from start to finish. The team went above and beyond to deliver exactly what we needed."
                            }, {
                                name: "Michael Chen",
                                title: "CTO, InnovateSoft",
                                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
                                rating: 4.5,
                                text: "We've seen a 40% increase in productivity since implementing their solution. The onboarding process was seamless."
                            }, {
                                name: "Emma Rodriguez",
                                title: "CEO, DesignHub",
                                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
                                rating: 4,
                                text: "Their attention to detail and customer support is unmatched. We've partnered with them for all our digital needs."
                            }, {
                                name: "David Wilson",
                                title: "Operations Manager, GlobalLogix",
                                image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
                                rating: 5,
                                text: "The ROI was evident within the first quarter. Their platform has become indispensable to our operations."
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
                                        <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
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
