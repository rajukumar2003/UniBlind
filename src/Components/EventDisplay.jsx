import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { TbHexagonFilled } from "react-icons/tb";

const EventDisplay = ({ eventOpen, eventClose }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const postRef = collection(db, "events");
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      const updatedEvents = [];
      snapshot.forEach((doc) => {
        updatedEvents.push({ ...doc.data(), id: doc.id });
      });
      // Sorting events by deadline date
      updatedEvents.sort(
        (a, b) => new Date(a.deadlineDate) - new Date(b.deadlineDate)
      );

      setEvents(updatedEvents);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Add event listener to handle click outside popup
    const handleClickOutside = (e) => {
      if (!eventOpen || e.target.closest(".glass")) return;
      eventClose();
    };
    document.body.addEventListener("click", handleClickOutside);
    // Cleanup event listener on component unmount
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [eventOpen, eventClose]);

  const [isImageClicked, setIsImageClicked] = useState(false);

  const toggleImgeClick = () => {
    setIsImageClicked(!isImageClicked);
  };

  return (
    <div
      className={`bg-black mt-10 bg-opacity-50 flex items-center justify-center fixed inset-0 ${eventOpen ? "block" : "hidden"}`}
    >
      <div
        id="lmao"
        className="bg-white bg-opacity-90 m-2  glass shad w-11/12 h-5/6 rounded-xl overflow-auto no-scrollbar overflow-y-auto"
      >
        <p className="fixed z-20 w-full text-center border-b border-black rounded-t-xl text-2xl font-bold font-montserrat">
          Events
        </p>
        <div className="z-10 mt-10">
          {events.map((event, index) => (
            <div className=" h-full py-3" key={index}>
              <div className="flex justify-center">
                {event.imagePath.split("?")[0].endsWith(".pdf") ? (
                  <iframe
                    src={event.imagePath}
                    type="event/pdf"
                    className="object-contain h-[350px] w-[500px]"
                  />
                ) : (
                  <img
                    src={event.imagePath}
                    className={`object-contain h-[350px] w-[500px] ${
                      isImageClicked ? "w-[600px] h-[800px]" : ""
                    }`}
                    alt="Event"
                    onClick={toggleImgeClick}
                  />
                )}
              </div>
              <div className="text-center mb-5">
                <p className="font-montserrat">
                  <span className="font-bold text-xl">{event.eventName}</span>
                  <br />
                  <span className="font-semibold text-md text-right text-[#ff4000]">
                    {event.deadlineDate}
                  </span>
                  <br />
                  <span className=" text-sm max-w-prose overflow-y-auto max-h-40">
                    {event.description}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-center text-center text-md font-medium w-4/5  mx-auto py-1">
                <span className="w-full border-b-2 border-[#A8A8A8] inline-block"></span>
                <span className="mx-4 text-[#A8A8A8]">
                  <TbHexagonFilled />
                </span>
                <span className="w-full border-b-2 border-[#A8A8A8] inline-block"></span>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute top-7 right-3 text-2xl font-semibold"
          onClick={eventClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default EventDisplay;
