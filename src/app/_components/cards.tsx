import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight, TicketCheck } from "lucide-react";
import ElegantLoader from "./loader";
import EventSignupDialog from "./EventDialog";

// Individual Event Card Component

interface eventI {
  address: string;
  description: string;
  endDate: string;
  heading: string;
  image: string;
  link: string;
  price: string | null;
  startDate: string;
}

const EventCard = ({ event }: { event: eventI }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTicketDialog, setShowTicketDialog] = useState<boolean>(false);

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    hover: {
      scale: 1.03,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
  };

  const imageVariants = {
    hover: { scale: 1.05 },
  };

  const itemVariants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };


  const [storedEmail, setStoredEmail] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("event-registered-email");
    setStoredEmail(email);
  }, []);

  const handleGetTickets = () => {
    if (storedEmail) {
      window.open(event.link, "_blank");
    } else {
      setShowTicketDialog(true);
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-pink-100 to-blue-100 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="relative">
        {/* Image Section */}
        <motion.div
          className="w-full h-40 overflow-hidden"
          variants={imageVariants}
        >
          <motion.img
            src={event.image}
            alt={event.heading}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Date Badge */}
        <motion.div
          className="absolute top-3 right-3 bg-pink-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          {event.startDate}
          {event.endDate ? ` - ${event.endDate}` : ""}
        </motion.div>

        {/* Price Badge (if exists) */}
        {event.price && (
          <motion.div
            className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
          >
            {event.price}
          </motion.div>
        )}
      </div>

      {/* Content Section */}
      <motion.div
        className="p-4 flex flex-col flex-grow"
        initial="initial"
        animate="animate"
        variants={itemVariants}
      >
        <motion.h2
          className="text-lg font-bold text-pink-600 mb-1 line-clamp-1"
          variants={itemVariants}
        >
          {event.heading}
        </motion.h2>

        <motion.div
          className="flex items-center space-x-1 text-blue-600 mb-2"
          variants={itemVariants}
        >
          <MapPin size={14} />
          <span className="text-xs">{event.address}</span>
        </motion.div>

        <motion.p
          className="text-gray-700 text-sm mb-3 line-clamp-2 flex-grow"
          variants={itemVariants}
        >
          {event.description}
        </motion.p>

        <div className="flex items-center justify-center gap-5">
          <motion.div
            className="bg-gradient-to-r from-pink-500  to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white py-2 px-4 rounded-full font-medium w-full shadow-md text-center text-sm mt-auto flex items-center justify-center gap-1 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetTickets}
          >
            Get Ticket
            <TicketCheck size={14} />
          </motion.div>
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white py-2 px-4 rounded-full font-medium w-full shadow-md text-center text-sm mt-auto flex items-center justify-center gap-1 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGetTickets}
          >
            View Event
            <ArrowUpRight size={14} />
          </motion.div>
        </div>

        {showTicketDialog && (
          <EventSignupDialog
            setShowTicketDialog={setShowTicketDialog}
            showTicketDialog={showTicketDialog}
            event={event}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// Grid layout for multiple event cards
export default function EventsGrid({
  EventCardArray,
  isLoading,
  setLoadMoreCount,
  loadMoreCount,
  selectedTime,
  selectedAdd,
  filtered,
}: {
  EventCardArray: eventI[] | undefined;
  isLoading: boolean;
  setLoadMoreCount: (count: number) => void;
  loadMoreCount: number;
  selectedTime: string | null;
  selectedAdd: string | null;
  filtered: boolean;
}) {
  const filteredEvents = EventCardArray?.filter((event) => {
    const selected = selectedTime ? new Date(selectedTime) : null;
    const start = event.startDate ? new Date(event.startDate) : null;
    const end = event.endDate ? new Date(event.endDate) : null;

    const dateMatch =
      selected && start && end ? selected >= start && selected <= end : false;

    const locationMatch = selectedAdd
      ? event.address?.toLowerCase().includes(selectedAdd.toLowerCase())
      : false;

    return dateMatch || locationMatch;
  });

  console.log(EventCardArray);
  console.log(selectedTime, selectedAdd);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h1
        className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Upcoming Sydney Events
        {isLoading && <ElegantLoader />}
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {!filtered
          ? EventCardArray?.map((event) => (
              <EventCard key={event.image} event={event} />
            ))
          : filteredEvents?.map((event) => (
              <EventCard key={event.image} event={event} />
            ))}
      </motion.div>

      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className={` text-white py-3 px-8 rounded-full font-semibold shadow-lg ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 cursor-pointer"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLoadMoreCount(loadMoreCount + 1)}
        >
          Load More Events
        </motion.button>
      </motion.div>
    </div>
  );
}
