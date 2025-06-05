import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "https://i.postimg.cc/R0cGzXtt/1.jpg",
    text: "Help Them Learn Today for a Better Tomorrow."
  },
  {
    id: 2,
    image: "https://i.postimg.cc/W4S3N5Qx/2.jpg",
    text: "Together, We Can Close the Health Gap!"
  },
  {
    id: 3,
    image: "https://i.postimg.cc/Xq5BYwKF/3.png",
    text: "Crowdfunding: An emerging financing alternative"
  }
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000); // 8 seconds
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="overflow-hidden rounded-sm shadow-lg h-64 md:h-[500px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.0 }}
          className="relative h-64  md:h-full"
        >
          <img
            src={slides[current].image}
            alt={slides[current].text}
            className="w-full h-full md:h-full"
          />

          <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2">
            {slides[current].text}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
