import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { CountdownTimer } from "./CountdownTimer ";
import { useEffect, useState } from "react";

const NavBar = ({ width }) => {
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
          <Logo>PenQuiz</Logo>
        </Right>
        <Center>
          <div>
            <CountdownTimer targetDate={dateTimeToExpry} />
          </div>
        </Center>
        <Left>
          <SubmitButton>
            submite
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

const SubmitButton = styled.button`
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: #52d830;
  padding: 12px 25px;
  font-size: 17px;
  font-weight: 500;
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
`;

const Right = styled.div``;
const Center = styled.div``;
const Left = styled.div``;
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
