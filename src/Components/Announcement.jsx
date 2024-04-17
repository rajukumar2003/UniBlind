import React from "react";

const Announcement = () => {

    const announcements = [  
        { message: 'Scheduled maintenance will occur on Saturday, April 15th from 10PM - 12AM EST.', timestamp: '2024-04-4 11:22 AM' },
        { message: 'New feature release: Now you can share code snippet in coding club channel.', timestamp: '2024-04-7 03:50 PM' },
        { message: 'Feature Update: Now you can signup with Signu-Link shared to your email', timestamp: '2024-04-09 09:30 AM' },
        { message: 'Feature Update: Clickable Image on posts to make it big.', timestamp: '2024-04-10 09:30 AM' },
        { message: 'Feature Update: Now you can see the number of upvotes on a post.', timestamp: '2024-04-12 12:00 AM' },
        {message: 'Feature Update: Loading Animation is added.', timestamp: '2024-04-16 12:00 AM'}
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
