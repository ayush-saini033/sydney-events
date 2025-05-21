import { useState, useEffect } from "react";
import { Calendar, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Calendar
            className={`h-6 w-6 ${scrolled ? "text-pink-600" : "text-white"}`}
          />
          <h1
            className={`ml-2 font-bold text-xl ${
              scrolled ? "text-pink-600" : "text-white"
            }`}
          >
            Sydney Events
          </h1>
        </div>

        {/* Nav Links */}
        <div
          className={`hidden md:flex items-center space-x-6 ${
            scrolled ? "text-blue-700" : "text-white"
          }`}
        >
          <a
            href="#events"
            className={`transition-colors ${
              scrolled ? "hover:text-pink-500" : "hover:text-white"
            }`}
          >
            Events
          </a>
          <a
            href="#venues"
            className={`transition-colors ${
              scrolled ? "hover:text-pink-500" : "hover:text-white"
            }`}
          >
            Venues
          </a>
          <a
            href="#about"
            className={`transition-colors ${
              scrolled ? "hover:text-pink-500" : "hover:text-white"
            }`}
          >
            About
          </a>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-4">
          <button
            className={`hidden md:flex items-center cursor-pointer transition-colors ${
              scrolled
                ? "text-blue-700 hover:text-pink-500"
                : "text-white hover:text-white"
            }`}
          >
            <MapPin className="h-5 w-5 mr-1" />
            <span>Sydney</span>
          </button>

          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              scrolled
                ? "bg-pink-100 text-pink-600 hover:bg-pink-500 hover:text-white"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
