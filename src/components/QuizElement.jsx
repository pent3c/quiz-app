import { useEffect, useState } from "react";
import styled from "styled-components";
import { data } from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addUserAnswer } from "../redux/userRedux";
import { CountdownTimer } from "./CountdownTimer";

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

  const [dateTimeToExpry, setDateTimeToExpry] = useState(0);

  const THREE_DAYS_IN_MS = 1 * 1 * 10 * 60 * 1000;
const NOW_IN_MS = new Date().getTime();

  useEffect(() => {
    setDateTimeToExpry(THREE_DAYS_IN_MS+NOW_IN_MS);
  }, []);

  return (
    <Quiz>
      <Header>
        <MobileCountdown>
      <CountdownTimer targetDate={dateTimeToExpry} />

        </MobileCountdown>
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

const MobileCountdown = styled.div`
  /* padding: 15px 0; */
  display: none;
  border-bottom: 1px solid #dddddd;
  @media (max-width: 768px) {
    display: block;
  }
`

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

const QuizId = styled.p`
  font-weight: 600;
  display: grid;
  place-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50px;
  background-color: #b9b9b9;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  border: 1px solid #a1a1a13d;
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
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: ${(props) => (props.isSelected ? "#30c4d8" : "#fff")};
  width: 100%;
  padding: 15px 20px;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.isSelected ? "#1f8592" : "#adadad")};
  box-shadow: 5px 8px 1px 0px
    ${(props) => (props.isSelected ? "#1f8592" : "#adadad")};

  transition: 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  p {
    /* color: ${(props) => (props.isSelected ? "#ffffff" : "#000000")}; */
    /* background-color: ${(props) =>
      props.isSelected ? "#30c4d8" : "#fff"}; */
    background-color: white;
    color: black;
  }
  :hover:not(${(props) => !props.isSelected}) {
    background-color: #e7e7e734;
    /* color: white; */
  }
  @media (max-width: 768px) {
    padding : 5px 15px ;
  }
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
  text-align: center;
`;

const Quiz = styled.div`
  /* From https://css.glass */
  /* From https://css.glass */
  background: #f5f5f5;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  border: 1px solid rgba(255, 255, 255, 0.47);
  //glass end
  padding: 40px 0;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-width: 768px;

  @media (max-width: 768px) {
    width: 100%;
    height: 100vh;
    /* margin-top: 100px; */
    align-items: center;
    justify-content: center;
  }
  /* padding: 20px; */
`;

export default QuizElement;
