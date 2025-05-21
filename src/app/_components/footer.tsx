import React from "react";
import { Calendar, Instagram, Mail } from "lucide-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-pink-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-pink-300" />
              <h3 className="ml-2 font-bold text-xl text-pink-400">
                Sydney Events
              </h3>
            </div>
            <p className="text-pink-200 mb-6">
              Discover the best events happening in Sydney, Australia. Find
              concerts, exhibitions, theater shows, and more.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/ayush_saini676/"
                target="_blank"
                className="text-pink-200 hover:text-blue-400 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/ayush-saini-92126a296/"
                target="_blank"
                className="text-pink-200 hover:text-blue-400 transition-colors"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/ayush35814"
                target="_blank"
                className="text-pink-200 hover:text-blue-400 transition-colors"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:ayushsaini1910@gmail.com"
                className="text-pink-200 hover:text-blue-400 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-pink-400">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#events"
                  className="text-pink-200 hover:text-blue-400 transition-colors"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#venues"
                  className="text-pink-200 hover:text-blue-400 transition-colors"
                >
                  Venues
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-pink-200 hover:text-blue-400 transition-colors"
                >
                  Calendar
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-pink-200 hover:text-blue-400 transition-colors"
                >
                  Popular Events
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-pink-400">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-pink-200 hover:text-blue-400 transition-colors"
                >
                  Music
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-pink-200 hover:text-blue-400 transition-colors"
                >
                  Arts & Theater
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-pink-200 hover:text-blue-400 transition-colors"
                >
                  Food & Drink
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-pink-200 hover:text-blue-400 transition-colors"
                >
                  Entertainment
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-pink-200 hover:text-blue-400 transition-colors"
                >
                  Sports
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-pink-400">Newsletter</h4>
            <p className="text-pink-200 mb-4">
              Subscribe to receive updates about upcoming events in Sydney
            </p>
            <form>
              <div className="flex gap-2 items-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-l-lg text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-white"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="border-t border-pink-800 mt-8 pt-8 text-center text-pink-300 text-sm">
          <p>
            © {new Date().getFullYear()} Sydney Events. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
