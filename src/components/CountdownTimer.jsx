import React from "react";
import { useCountdown } from "../hooks/useCountdown";

export const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        // days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Time Out!</span>
    </div>
  );
};


const zf0 = (v) => v.toString().padStart(2, "0");

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <div
        style={{
          padding: 0,
          margin: 0,
        }}
        rel="noopener noreferrer"
        className="countdown-link"
      >
        {/* <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 3} />
        <p>:</p> */}
        <DateTimeDisplay value={zf0(hours)} type={"Hours"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={zf0(minutes)} type={"Mins"} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={zf0(seconds)} type={"Seconds"} isDanger={false} />
      </div>
    </div>
  );
};
const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className={isDanger ? "countdown danger" : "countdown"}>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};
export default DateTimeDisplay;
