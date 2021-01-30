import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import * as easings from "d3-ease";

import "./App.css";

const api = {
  key: "f35a29ec809a31c42a5897f7142ebeb0",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const resultBox = useSpring({
    opacity: 1,
    transform: "translate3d(0px,-100px,0)",
    from: { opacity: 0, transform: "translate3d(0px, 200px, 0)" },
    config: { duration: 1000, easing: easings.easePolyOut },
  });
  const headingAnimation = useSpring(
    // { config: { duration: 1000 } },
    {
      opacity: 0,
      transform: "translate3d(0px,-200px,0)",
      from: { transform: "translate3d(0px,0px,0)", opacity: 1 },
      config: { duration: 50, easing: easings.easePolyOut },
    }
  );
  const searchBarAnimation = useSpring({
    transform: "translate3d(0px, -200px,0)",
    from: { transform: "translate3d(0px, 0px , 0)" },
    config: { duration: 1000, easing: easings.easePolyOut },
  });
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery(" ");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? `App ${weather.weather[0].main}`
          : "App"
      }
    >
      <div className="weather-box">
        {/* <div className="heading">WEATHER APP</div> */}
        <animated.div style={headingAnimation} className="heading">
          WEATHER APP
        </animated.div>
        <animated.div style={searchBarAnimation} className="search-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Location"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </animated.div>
        {typeof weather.main != "undefined" ? (
          <animated.div className="result-box" style={resultBox}>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div classname="weather-box-inside">
              <div className="temp-weather">
                <div className="temp">{Math.round(weather.main.temp)}°c</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
              <div className="temp-properties"></div>
            </div>
          </animated.div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
