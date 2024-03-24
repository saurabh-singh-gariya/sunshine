/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import sun from "../assets/sun.png";
import cloud from "../assets/cloud.png";
import fog from "../assets/fog.png";
import rain from "../assets/rain.png";
import snow from "../assets/snow.png";
import storm from "../assets/storm.png";
import wind from "../assets/windy.png";

const MiniCard = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState();

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes("cloud")) {
        setIcon(cloud);
      } else if (iconString.toLowerCase().includes("rain")) {
        setIcon(rain);
      } else if (iconString.toLowerCase().includes("clear")) {
        setIcon(sun);
      } else if (iconString.toLowerCase().includes("thunder")) {
        setIcon(storm);
      } else if (iconString.toLowerCase().includes("fog")) {
        setIcon(fog);
      } else if (iconString.toLowerCase().includes("snow")) {
        setIcon(snow);
      } else if (iconString.toLowerCase().includes("wind")) {
        setIcon(wind);
      }
    }
  }, [iconString]);

  const getFormattedDate = () => {
    let dateObj = new Date();
    if (time) {
      dateObj = new Date(time);
    }
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("en", { month: "short" });
    return `${day} ${month}`;
  };
  return (
    <div className="mini-card w-[10rem] h-[10rem] p-4 flex flex-col">
      <p className="text-center">{getFormattedDate()}</p>
      <hr />
      <div className="w-full flex justify-center items-center flex-1">
        <img
          src={icon}
          alt={iconString.toLowerCase()}
          className="w-[4rem] h-[4rem]"
        />
      </div>
      <p className="text-center font-bold">{temp}&deg;C</p>
    </div>
  );
};

export default MiniCard;
