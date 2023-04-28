import React, { useState, useEffect } from "react";

const ProgressBar = ({ value }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth >= value) {
          clearInterval(intervalId);
          return prevWidth;
        }
        return prevWidth + 1;
      });
    }, 10);

    return () => clearInterval(intervalId);
  }, [value]);

  return (
    <div style={{ width: "100%", position: "fixed", top: 0 }}>
      <div
        style={{ background: "#1f8592", height: "12px", width: `${width}%`, borderRadius: "0 6px 6px 0" }}
      />
    </div>
  );
};

export default ProgressBar;
