const EventCard = ({ imgURL, org, date, venue, title }) => {
  return (
    <div className="flex flex-row mb-5 font-medium text-white ">
      {/* <img
        src={imgURL}
        alt="Event image"
        className="rounded-full w-[60px] h-[60px] mr-3"
      /> */}
      <div className="ml-5 flex flex-col my-auto">
        <h3 className=" font-montserrat font-semibold">{title}</h3>
        <p className=" text-xs">{org}</p>
        <p className="text-xs">{date}</p>
        <p className=" text-xs">{venue}</p>
      </div>
    </div>
  );
};

export default EventCard;

