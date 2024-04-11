import React from "react";

const Announcement = () => {
  const announcements = [
    {
      message:
        "Scheduled maintenance will occur on Saturday, April 15th from 10PM - 12AM EST.",
      timestamp: "2024-04-11 11:22 AM",
    },
    {
      message: "New feature release: Dark mode is now available!",
      timestamp: "2024-04-10 03:50 PM",
    },
  ];

  return (
    <div className="announcements-section p-10 mt-10">
      {announcements.map((announcement, index) => (
        <div
          key={index}
          className="announcement-card p-4 my-2  border border-gray-200 rounded-lg bg-white shadow-md ="
        >
          <p className="text-lg font-medium mb-1">{announcement.message}</p>
          <p className="text-gray-600 text-sm">{announcement.timestamp}</p>
        </div>
      ))}
    </div>
  );
};

export default Announcement;
