import { faArrowRight, faListCheck, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { CountdownTimer } from "./CountdownTimer";
import { useEffect, useState } from "react";

const NavBar = ({ width, setOpenNavigator,openNavigator }) => {
  const [dateTimeToExpry, setDateTimeToExpry] = useState(0);
  const THREE_DAYS_IN_MS = 1 * 1 * 10 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  useEffect(() => {
    setDateTimeToExpry(NOW_IN_MS + THREE_DAYS_IN_MS);
  }, []);

  return (
    <Nav>
      <Wrapper>
        <Right>
          <ToggleList onClick={() => setOpenNavigator((prev) => !prev)} openNavigator={openNavigator}>
            <FontAwesomeIcon icon={faListCheck} fade={!openNavigator} size="xl" style={{color: "#000000",}} />
          </ToggleList>
          <Logo></Logo>
        </Right>
        <Center>
          <div>
            <CountdownTimer targetDate={dateTimeToExpry} />
          </div>
        </Center>
        <Left>
          <SubmitButton>
            Submit
            <FontAwesomeIcon
              icon={faPaperPlane}
              bounce={width === 100}
              style={{ color: "#ffffff" }}
            />
          </SubmitButton>
        </Left>
      </Wrapper>
    </Nav>
  );
};

const ToggleList = styled.div`
  filter: invert(${props => !props.openNavigator});
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  border: 2px solid ${props => props.openNavigator ? "black" : "#434343"};
  transition: 250ms ease-in-out;
  box-shadow: 2px 3px 1px 0px ${props => props.openNavigator ? "white" : "#434343"};;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: #52d830;
  padding: 12px 25px;
  font-size: 18px;
  letter-spacing: 1.3px;
  font-weight: 600;
  text-transform: uppercase;
  
  border-radius: 10px;
  cursor: pointer;
  border: 2px solid #72bb60;
  box-shadow: 2px 3px 1px 0px #72bb60;
  color: white;
`;

const Logo = styled.p`
  padding: 0;
  margin: 0;
  font-size: xx-large;
  font-weight: 700;
  color: #30c4d8;

  &:before{
      content: 'PenQuiz';

      @media (max-width: 768px) {
          content: 'PQ';
      }
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 30px;
`;
const Center = styled.div`
  flex: 1;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 30px;
  align-items: center;
  height: 60px;
`;

const Nav = styled.div`
  background-color: #fff;
`;

export default NavBar;
