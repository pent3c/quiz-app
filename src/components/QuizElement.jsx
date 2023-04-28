import { useEffect, useState } from "react";
import styled from "styled-components";

const QuizElement = ({ quiz }) => {
  const [isImg, setIsImg] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
    setIsImg(quiz.isImg);
  }, [quiz]);

  const handleSelectClick = (choice) => {
    setSelected(choice);
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
              {quiz?.options.map((option) => (
                <ChoiceImg>
                  <img src={option.text} alt="imageAlt" />
                </ChoiceImg>
              ))}
            </ImageGrid>
          </GridWrapper>
        ) : (
          <QuizChoices>
            {quiz?.options.map((option) => (
              <Choice
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
    </Quiz>
  );
};

const Wrapper = styled.div`
  display: ${(props) => (props.isImg ? "flex" : null)};
  justify-content: center;
  width: 900px;
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
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Choice = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
  background-color: ${(props) => (props.isSelected ? "#30c4d8" : "#fff")};
  width: 60%;
  padding: 15px 20px;
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid ${(props) => (props.isSelected ? "#1f8592" : "#adadad")};
  box-shadow: 7px 8px 1px -3px  ${(props) => (props.isSelected ? "#1f8592" : "#adadad")};

  transition: 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

  p {
    /* color: ${(props) => (props.isSelected ? "#ffffff" : "#000000")}; */
    /* background-color: ${(props) =>
      props.isSelected ? "#30c4d8" : "#fff"}; */
    background-color: white;
    color: black;
  }
  :hover {
    background-color: #e7e7e734;
    /* color: white; */
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
  min-width: 550px;
  max-width: fit-content;
  /* From https://css.glass */
  /* From https://css.glass */
  background: #f5f5f5;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(2.5px);
  border: 1px solid rgba(255, 255, 255, 0.47);
  padding: 40px 0;
  border-radius: 15px;
  /* padding: 20px; */
`;

export default QuizElement;
