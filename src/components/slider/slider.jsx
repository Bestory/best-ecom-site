import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./slider-data";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const slideIntervalTime = 5000;
  const autoScroll = true;
  const slideInterval = useRef(null);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? sliderData.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === sliderData.length - 1 ? 0 : prev + 1));
  };

   useEffect(() => { 
    setCurrentSlide(0)
   }, [])
  
  useEffect(() => {
    if (autoScroll) {
      slideInterval.current = setInterval(nextSlide, slideIntervalTime);
    }
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [slideIntervalTime, autoScroll]);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden bg-gray-900">
      <AiOutlineArrowLeft
        className="absolute border-2 border-orange-600 rounded-full bg-transparent text-white w-10 h-10 cursor-pointer top-1/2 transform -translate-y-1/2 z-20 left-6 hover:bg-white hover:text-orange-600"
        onClick={prevSlide}
      />
      <AiOutlineArrowRight
        className="absolute border-2 border-orange-600 rounded-full bg-transparent text-white w-10 h-10 cursor-pointer top-1/2 transform -translate-y-1/2 z-20 right-6 hover:bg-white hover:text-orange-600"
        onClick={nextSlide}
      />

      <div
        className="relative flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
      >
        {sliderData.map((slide, index) => {
          const { image, heading, desc } = slide;
          return (
            <div
              key={index}
              className="w-full h-full flex-shrink-0"
              style={{ width: "100vw" }}
            >
              <div className="relative w-full h-full">
                <img
                  src={image}
                  alt="slide"
                  className="w-full h-full object-cover"
                  style={{ maxHeight: '90vh' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-4/5 md:w-3/5 lg:w-2/5 p-12 flex flex-col items-center text-center bg-black bg-opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div className="absolute top-0 left-0 w-[30%] h-[2px] bg-[#50dfdb] animate-span1"></div>
                      <div className="absolute bottom-0 right-0 w-[30%] h-[2px] bg-[#50dfdb] animate-span2"></div>
                      <div className="absolute top-0 left-0 w-[2px] h-[30%] bg-[#50dfdb] animate-span3"></div>
                      <div className="absolute bottom-0 right-0 w-[2px] h-[30%] bg-[#50dfdb] animate-span4"></div>
                    </div>
                    <h2 className="text-4xl text-white mb-4">{heading}</h2>
                    <p className="text-white mb-4">{desc}</p>
                    <hr className="w-1/2 bg-white mb-4" />
                    <button
                      className="relative text-white cursor-pointer bg-orange-600 py-2 px-4 rounded hover:bg-orange-500 z-40"
                      onClick={() => navigate("/shop")}
                    >
                      Shop now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
