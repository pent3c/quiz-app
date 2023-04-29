import { useEffect, useState } from "react";
import styled from "styled-components";
import { data } from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addUserAnswer } from "../redux/userRedux";

const QuizElement = ({ quiz, currentLevel, setCurrentLevel }) => {
  const [isImg, setIsImg] = useState(false);
  const [selected, setSelected] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);


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

  useEffect(() => {
    setSelected(null);
    setIsImg(quiz.isImg);
    setSelected(user.answers[quiz.id] ?? null)
  }, [quiz]);

  const handleSelectClick = (choice) => {
    setSelected(choice);
    dispatch(
      addUserAnswer({
        quizId: quiz.id,
        userChoice: choice,
      })
    );
  };

  return (
    <Quiz>
      <Header>
        <Title>{quiz.title}</Title>
        <Text>{quiz.question}</Text>
      </Header>
      <Wrapper isImg={isImg}>
        {isImg && (
          <QuestionImg>
            <img src={quiz.questionImg} alt="quiz img" />
          </QuestionImg>
        )}
        {isImg ? (
          <GridWrapper>
            <ImageGrid>
              {quiz?.options.map((option,i) => (
                <ChoiceImg key={i}>
                  <img src={option.text} alt="imageAlt" />
                </ChoiceImg>
              ))}
            </ImageGrid>
          </GridWrapper>
        ) : (
          <QuizChoices>
            {quiz?.options.map((option,i) => (
              <Choice
                key={i}
                id={option.id}
                onClick={() => handleSelectClick(option.id)}
                isSelected={selected === option.id}
              >
                <QuizId>{option.id + 1}</QuizId>
                {option.text}
              </Choice>
            ))}
          </QuizChoices>
        )}
      </Wrapper>
      <Controllers>
        <ContolButton
          onClick={() => controlLevel("prev")}
          disabled={currentLevel === 0}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            size="2xl"
            style={{ color: currentLevel === 0 ? "lightgray" : "#383838" }}
          />
        </ContolButton>
        <ContolButton
          onClick={() => controlLevel("next")}
          disabled={currentLevel === data.length - 1}
          selected={selected}
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            beat={selected !== null}
            size="2xl"
            style={{
              color: currentLevel === data.length - 1 ? "lightgray" : "#383838",
            }}
          />
        </ContolButton>
      </Controllers>
    </Quiz>
  );
};

const ContolButton = styled.button`
  /* padding: 10px; */
  background-color: white;
  cursor: pointer;
  box-shadow: 0px 8px 1px 0px #adadad;
  border: unset;
  border-block: 2px solid #adadad;
  height: 50px;
  flex: 1;
  transition: flex 250ms ease-out;

  &:first-child {
    border-radius: 10px 0 0 10px;
    border-inline: 2px solid #adadad;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
    border-right: 2px solid #adadad;
  }
  :hover {
    background-color: #e7e7e734;
    flex: 3;
  }
`;

const Controllers = styled.div`
  top: 50%;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

const Wrapper = styled.div`
  display: flex; 
  justify-content: center;
  width: 100%;
`;

const QuestionImg = styled.div`
  flex: 1;
  img {
    height: 100%;
    aspect-ratio: 1;
    display: block;
    width: 100%;
    object-fit: cover;
  }
  margin-right: 20px;
`;

const GridWrapper = styled.div`
  flex: 1;
`;

const ChoiceImg = styled.div`
  position: relative;
  padding: 10px;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 15px;
  cursor: pointer;
  img {
    aspect-ratio: 1;
    display: block;
    width: 100%;
    object-fit: cover;
  }
  :hover {
  }
`;

const ImageGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
`;

const QuizId = styled.div`
  margin: 10px 0px;
  padding: 5px 5px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-weight: 600;
  display: grid;
  place-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50px;

`;

const QuizChoices = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 60%;

  @media (max-width: 768px) {
      width: 80%;
  }
`;

const Choice = styled.div`

 
background: rgba(255, 255, 255, 0.2);
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(5px);
-webkit-backdrop-filter: blur(5px);



color: white;
  display: flex;
  align-items: center;
  gap: 20px;

  
  background: ${(props) => (props.isSelected ? "linear-gradient(157.81deg,#af69ee,#4a4baf 100%)" : "rgba(255, 255, 255, 0.2)")};

  background-size: 200% 200%;
  animation: moveBackground 5s ease infinite;

  @keyframes moveBackground {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  width: 100%;
  padding: 15px 20px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid ${(props) => (props.isSelected ? "#4a4baf" : "rgba(255, 255, 255, 0.3)")};
    ${(props) => (props.isSelected ? "#4a4baf" : "rgba(255, 255, 255, 0.3)")};

`;


const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
`;
const Text = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const Header = styled.div`
  color: white;
  text-align: center;
`;

const Quiz = styled.div`
  /* From https://css.glass */
  /* From https://css.glass */
   
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 40px 0;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-width: 768px;

  @media (max-width: 768px) {
    width: 100%;
  }
  /* padding: 20px; */
`;

export default QuizElement;
