import React from "react";

const AboutUs = () => {
  return (
    <div id="aboutus" className="h-full py-6 px-32 max-sm:px-10">
      <p className="font-montserrat font-semibold text-white text-3xl">
        ABOUT US
      </p>
      <p className=" mt-20 glass p-5 bg-[#bbd6fb] black-shad font-montserrat leading-7">
        <span className=" text-2xl font-semibold font-montserrat">
          A Safe Space for University Discussions.
        </span>
        <span className="text-lg">
          <br />
          UniBlind provides a platform for open and honest conversations within
          your university community, while prioritizing user anonymity. Discuss
          sensitive topics, share experiences, and get support without fear of
          judgment or social repercussions.
          <br />
          <br />
        </span>
        <span className=" text-2xl font-semibold ">
          Why UniBlind?
          <br />
        </span>
        <span className="text-lg">
          <ol>
            <li>
              Anonymity-Driven: Express yourself freely without the constraints
              of personal identities.
            </li>
            <li>
              University-Focused: Built specifically for your university
              community, fostering a sense of belonging and shared experiences.
            </li>
            <li>
              Safe & Moderated: Proactive moderation to ensure a respectful and
              inclusive environment.
            </li>
          </ol>
        </span>
        <br />
        <span className=" text-2xl font-semibold font-montserrat">
          Moderation and Safety
          <br />
        </span>
        <span className="text-lg">
          <ol>
            <li>
              Content Moderation System: Implement a robust system for flagging
              and reviewing posts that could be harmful or offensive. You might
              combine automated tools with human - oversight.
            </li>
            <li>
              Reporting Features: Easy access to mechanisms for users to report
              inappropriate content, bullying, or harassment.
            </li>
            <li>
              Safety Guidelines: Provide clear community guidelines to promote a
              positive and respectful environment, emphasizing the importance of
              anonymity and responsible use.
            </li>
          </ol>
        </span>
      </p>
    </div>
  );
};

export default AboutUs;
