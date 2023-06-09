import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NavBar from "./NavBar";

const ProgressBar = ({ value,setOpenNavigator,openNavigator }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   setWidth((prevWidth) => {
    //     if (prevWidth >= value) {
    //       clearInterval(intervalId);
    //       return prevWidth;
    //     }
    //     return prevWidth + 1;
    //   });
    // }, 10);

    // return () => clearInterval(intervalId);
    setWidth(value);
  }, [value]);

  return (
    <div style={{ width: "100%", position: "fixed",zIndex:1 }}>
      <NavBar width={value} setOpenNavigator={setOpenNavigator} openNavigator={openNavigator}/>
      <div
        style={{
          top: 0,
          display: "flex",
          justifyContent: "center",
        }}
        
      >
        <Progress width={width} />
      </div>
    </div>
  );
};

const Progress = styled.div`
  transition: width 0.3s ease;
  background-color: ${(props) => (props.width === 100 ? "green" : "#1f8592")};
  height: 12px;
  width: ${(props) => props.width}%;
  border-radius: ${(props) => (props.width === 100 ? "0" : "6")}px;
`;

export default ProgressBar;
