import React, { useState } from "react";
import styled from "styled-components";
import QuizElement from "../components/QuizElement";
import ProgressBar from "../components/ProgressBar";
import { data } from "../data";
import backgound from "../assets/svg/background.svg"

const QuizPage = () => {
  const [currentLevel, setCurrentLevel] = useState(0);

 
  return (
    <Container>
      <ProgressBar value={(currentLevel / (data.length - 1)) * 100} />
      <Wrapper>
        <QuizElement quiz={data[currentLevel]} setCurrentLevel={setCurrentLevel} currentLevel={currentLevel}/>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background-image: url(${backgound});
  `;

const Wrapper = styled.div`
  margin: auto 0px;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;
  border-top-right-radius: 2px;

`;

export default QuizPage;
