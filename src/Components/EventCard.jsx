const EventCard = ({ imgURL, org, date, venue, title }) => {
  return (
    <div className="flex flex-row my-5 font-medium text-white ">
      <img
        src={imgURL}
        alt="Event image"
        className="rounded-full w-[80px] h-[80px] mr-5"
      />
      <div className="ml-5 flex flex-col my-auto">
        <h3 className="">{title}</h3>
        <p className=" text-xs">{org}</p>
        <p className="text-xs">{date}</p>
        <p className=" text-xs">{venue}</p>
      </div>
    </div>
  );
};

export default EventCard;
