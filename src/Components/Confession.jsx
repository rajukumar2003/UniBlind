import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Confession = () => {
  const [confessions, setConfessions] = useState([]);
  const scrollableRef = useRef(null); // Create a ref for the scrollable div

  const navigate = useNavigate();

  // Function to fetch confessions from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const confessionsRef = collection(db, "confessions");
        const q = query(confessionsRef, orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const data = [];
          snapshot.forEach((doc) => {
            const confessionData = doc.data();
            data.push(confessionData);
          });
          setConfessions(data);
        });

        // Scroll after new messages are rendered
        setTimeout(() => {
          if (scrollableRef.current) {
            scrollableRef.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }
        }, 0);

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching confessions:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div ref={scrollableRef} className="overflow-y-auto">
      <div className="messages-display z-0 mt-20">
        {confessions.map((confession, index) => (
          <div
            className="message p-2 rounded-lg bg-gray-200 mb-2 animate-fade-in-up "
            key={index}
          >
            <div className=" relative">
              <img
                src={confession.imagePath}
                alt="Confession"
                className="confession-image h-[400px] max-sm:overflow-hidden"
              />
              <span
                className="confession-text absolute top-0 left-0 p-2 z-10"
                style={{
                  color: confession.fontColor,
                  fontFamily: confession.fontStyle,
                  fontSize: `${confession.fontSize}px`,
                }}
              >
                {confession.text}
              </span>
            </div>
          </div>
        ))}
        <div className="input-area flex items-center right-0 w-3/4 max-sm:w-full fixed bottom-0">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-2 rounded-lg border border-gray-500 focus:outline-none focus:ring-indigo-500"
          />
          <div className="bg-black rounded-lg p-2">
            <button
              onClick={() => {
                navigate("/confession/create");
              }}
              className="px-2 text-white "
            >
              Create Your Own
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confession;
