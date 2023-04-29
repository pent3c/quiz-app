import React, { useState } from "react";
import styled from "styled-components";
import QuizElement from "../components/QuizElement";
import ProgressBar from "../components/ProgressBar";
import { data } from "../data";
import backgound from "../assets/svg/background.svg";
import QuizNavigator from "../components/QuizNavigator";
import { useSelector } from "react-redux";

const QuizPage = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [openNavigator, setOpenNavigator] = useState(true);

  const user = useSelector((state) => state.user);
  const progress = Object.keys(user?.answers).length;

  return (
    <Container>
      <ProgressBar
        value={(progress / (data.length - 1)) * 100}
        setOpenNavigator={setOpenNavigator}
        openNavigator={openNavigator}
      />
      <Wrapper>
        <QuizElement
          quiz={data[currentLevel]}
          setCurrentLevel={setCurrentLevel}
          currentLevel={currentLevel}
        />
      </Wrapper>
      <QuizNavigator
        currentLevel={currentLevel}
        openNavigator={openNavigator}
        setOpenNavigator={setOpenNavigator}
        setCurrentLevel={setCurrentLevel}
      />
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
