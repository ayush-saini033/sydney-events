import { useState } from "react";
import {
  FaBeer,
  FaMusic,
  FaPaintBrush,
  FaStore,
  FaUtensils,
  FaRunning,
  FaUsers,
  FaChalkboardTeacher,
  FaBriefcase,
} from "react-icons/fa";

export const eventsOpt = [
  {
    label: "Festival",
    url: "FESTIVAL",
    icon: FaBeer,
  },
  {
    label: "Performance",
    url: "PERFORMANC",
    icon: FaMusic,
  },
  {
    label: "Exhibitions",
    url: "EXHIBIT",
    icon: FaPaintBrush,
  },
  {
    label: "Markets",
    url: "EVTMARKET",
    icon: FaStore,
  },
  {
    label: "Food & Wines",
    url: "EVTFOOD",
    icon: FaUtensils,
  },
  {
    label: "Sports",
    url: "SPORT",
    icon: FaRunning,
  },
  {
    label: "Community Event",
    url: "EVTCOMNTY",
    icon: FaUsers,
  },
  {
    label: "Classes & Workshops",
    url: "EVTCLASS",
    icon: FaChalkboardTeacher,
  },
  {
    label: "Business Events",
    url: "EVTBUS",
    icon: FaBriefcase,
  },
];

export default function EventOptions({
  setUrlOption,
  setLoadMoreCount,
}: {
  setUrlOption: (url: string) => void;
  setLoadMoreCount: (count: number) => void;
}) {
  const [selectedEvent, setSelectedEvtent] = useState<string | null>(null);

  const handleEventClick = (eventUrl: string) => {
    console.log(`Selected event: ${eventUrl}`);
    setLoadMoreCount(1);
    setSelectedEvtent(eventUrl);
    setUrlOption(eventUrl);
  };

  return (
    <div className="w-full bg-white rounded-lg p-4">
      <div className="flex overflow-x-auto pb-2 scrollbar-hide justify-center items-center gap-5">
        <div className="flex space-x-4 px-2">
          {eventsOpt.map((event) => {
            const Icon = event.icon;
            const isSelected = selectedEvent === event.url;

            return (
              <button
                key={event.url}
                onClick={() => handleEventClick(event.url)}
                className={`flex flex-col cursor-pointer items-center justify-center min-w-max px-4 py-3 rounded-lg transition-all duration-200 ${
                  isSelected
                    ? "bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <div
                  className={`text-xl mb-2 ${
                    isSelected ? "text-white" : "text-gray-700"
                  }`}
                >
                  <Icon />
                </div>
                <span className="text-sm font-medium whitespace-nowrap">
                  {event.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedEvent && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-center text-gray-700">
            You selected:{" "}
            <span className="font-semibold">
              {eventsOpt.find((e) => e.url === selectedEvent)?.label}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
