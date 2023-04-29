import React from "react";
import styled from "styled-components";
import { data } from "../data";
import { useSelector } from "react-redux";

const QuizNavigator = ({ openNavigator, setCurrentLevel }) => {
  const answers = useSelector((state) => state.user.answers);

  return (
    <Container openNavigator={openNavigator}>
      <Wrapper>
        {data.map((quiz, i) => (
          <Qiuz
            key={i}
            isSolved={answers[quiz.id] !== undefined}
            onClick={() => setCurrentLevel(quiz.id - 1)}
          >
            {quiz.id}- {quiz.title}
          </Qiuz>
        ))}
      </Wrapper>
    </Container>
  );
};

const Qiuz = styled.div`
  padding: 5px 10px;
  background-color: ${(props) => (props.isSolved ? "#30c4d8" : "#fff")};
  padding: 12px 25px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 10px;
  border: 2px solid ${(props) => (props.isSolved ? "#1f8592" : "#adadad")};
  box-shadow: 2px 4px 1px 0px
    ${(props) => (props.isSolved ? "#1f8592" : "#adadad")};
  margin-bottom: 10px;
  transition: 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const Container = styled.div`
  position: fixed;
  width: 400px;
  /* height: 100vh; */
  top: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: #ffffff;
  transform: ${(props) => (props.openNavigator ? null : "translateY(-100%)")};
  transition: 250ms ease-in-out;
`;

export default QuizNavigator;
