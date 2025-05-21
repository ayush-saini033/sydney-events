// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Header from "./_components/header";
import Hero from "./_components/hero";
import Footer from "./_components/footer";
import EventsGrid from "./_components/cards";
import EventOptions from "./_components/eventsOptBar";

interface eventInterface {
  address: string;
  description: string;
  endDate: string;
  heading: string;
  image: string;
  link: string;
  price: string | null;
  startDate: string;
}

interface eventsDataInterface {
  events: eventInterface[];
}

const Homepage = () => {
  const [eventsData, setEventsData] = useState<eventsDataInterface | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [urlOption, setUrlOption] = useState<string | null>("FESTIVAL");
  const [loadMoreCount, setLoadMoreCount] = useState<number>(1);
  const [selectedTime, setSeledtedTime] = useState<string | null>(null);
  const [selectedAdd, setSelectedAdd] = useState<string | null>(null);

  const [filtered, setFiltered] = useState<boolean>(false);

  useEffect(() => {
    async function scraper1() {
      setIsLoading(true);
      try {
        const count = loadMoreCount; // <-- Set the number of virtual clicks here

        const res = await fetch(
          `/api/scrape?url=${encodeURIComponent(
            `https://www.sydney.com/events?10741-classification[]=${urlOption}`
          )}&count=${count}`
        );

        const data = await res.json();
        setEventsData(data);
      } catch (error: unknown) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    scraper1();
  }, [urlOption, loadMoreCount]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <Hero
        setSelectedAdd={setSelectedAdd}
        setSeledtedTime={setSeledtedTime}
        setFiltered={setFiltered}
      />
      <EventOptions
        setUrlOption={setUrlOption}
        setLoadMoreCount={setLoadMoreCount}
      />
      <main className="flex-1">
        <EventsGrid
          EventCardArray={eventsData?.events}
          isLoading={isLoading}
          setLoadMoreCount={setLoadMoreCount}
          loadMoreCount={loadMoreCount}
          selectedTime={selectedTime}
          selectedAdd={selectedAdd}
          filtered={filtered}
        />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;
