import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";

const location = [
  { value: "sydney", label: "Sydney, Australia" },
  {value: "sydney west", label: "Sydney West"},
  {value: "sydney north", label: "Sydney North"},
  {value: "inner sydney", label: "Inner Sydney"},
  { value: "cbd", label: "Sydney CBD" },
  { value: "darlingharbour", label: "Darling Harbour" },
  { value: "bondi", label: "Bondi" },
  { value: "manly", label: "Manly" },
  { value: "newtown", label: "Newtown" },
  { value: "parramatta", label: "Parramatta" },
  { value: "chatswood", label: "Chatswood" },
  { value: "glebe", label: "Glebe" },
  { value: "coogee", label: "Coogee" },
  { value: "surryhills", label: "Surry Hills" },
  { value: "the-rocks", label: "The Rocks" },
  { value: "northsydney", label: "North Sydney" },
  { value: "strathfield", label: "Strathfield" },
  { value: "macquariepark", label: "Macquarie Park" },
];

const Hero = ({
  setSeledtedTime,
  setSelectedAdd,
  setFiltered,
}: {
  setSeledtedTime: (time: string) => void;
  setSelectedAdd: (add: string) => void;
  setFiltered: (filt: boolean) => void;
}) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedLocation, setSelectedLocation] = useState("sydney, australia");

  console.log(selectedDate, selectedLocation);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    }); // e.g., "3 May"
  };

  return (
    <div className="relative h-[70vh] min-h-[500px] bg-gradient-to-r from-pink-600 to-blue-500 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/1209978/pexels-photo-1209978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      />

      {/* Decorative elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute top-1/4 left-1/5 w-32 h-32 bg-pink-300 opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-blue-300 opacity-20 rounded-full blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Discover Sydney&apos;s Best Events
        </motion.h1>

        <motion.p
          className="text-xl text-pink-100 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Find and experience the most exciting events happening around the
          harbor city
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500" />
            <input
              type="date"
              className="pl-10 pr-3 py-3 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 bg-white cursor-pointer"
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setSeledtedTime(formatDate(e.target.value));
              }}
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500" />
            <select
              className="pl-10 pr-4 py-3 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-pink-400 text-black bg-white font-bold appearance-none cursor-pointer"
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                setSelectedAdd(e.target.value);
              }}
            >
              {location.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <button
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            onClick={() => setFiltered(true)}
          >
            Find Events
          </button>
        </motion.div>
      </div>

      {/* Wave effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
          <path
            fill="#F9FAFB"
            fillOpacity="1"
            d="M0,32L60,53.3C120,75,240,117,360,122.7C480,128,600,96,720,80C840,64,960,64,1080,69.3C1200,75,1320,85,1380,90.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
