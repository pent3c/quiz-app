import React, { useState } from "react";
import styled from "styled-components";
import QuizElement from "../components/QuizElement";
import ProgressBar from "../components/ProgressBar";
import { data } from "../data";
import backgound from "../assets/svg/background.svg"

const QuizPage = () => {
  const [currentLevel, setCurrentLevel] = useState(0);

  const controlLevel = (value) => {
    if (value === "next" && currentLevel !== data.length - 1) {
      setCurrentLevel((prev) => prev + 1);
      return;
    }
    if (value === "prev" && currentLevel > 0) {
      setCurrentLevel((prev) => prev - 1);
      return;
    }
  };
  return (
    <Container>
      <ProgressBar value={(currentLevel / (data.length - 1)) * 100} />
      <Wrapper>
        <QuizElement quiz={data[currentLevel]} />
      </Wrapper>
      <Controllers>
        <ContolButton
          onClick={() => controlLevel("prev")}
          disabled={currentLevel === 0}
        >
          prev
        </ContolButton>
        <ContolButton
          onClick={() => controlLevel("next")}
          disabled={currentLevel === data.length - 1}
        >
          next
        </ContolButton>
        
      </Controllers>
    </Container>
  );
};

const ContolButton = styled.button`
  padding: 10px;
  background-color: aqua;
  cursor: pointer;
  z-index: 0;
`;

const Controllers = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  /* background: rgb(12, 14, 41); */
  /* background-size: 30%; */
  /* background: linear-gradient(81deg, rgba(20,24,69,1) 0%, rgba(5,12,31,1) 100%); */
  background-image: url(${backgound});
  `;

const Wrapper = styled.div`
  margin: auto 0px;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;

`;

export default QuizPage;
