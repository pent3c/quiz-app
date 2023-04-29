import { faArrowRight, faListCheck, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { CountdownTimer } from "./CountdownTimer";
import { useEffect, useState } from "react";
import logo from '../assets/svg/logo.svg'
import icon from '../assets/svg/icon.svg'

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
          <Logo>
            <img src={logo} alt="" />
            <img src={icon} alt="" />
          </Logo>
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
  border: 0;
  background: linear-gradient(
    157.81deg,
    #af69ee 42.04%,
    #6e4bd8 55.12%,
    #5348b6 71.54%,
    #4a4baf 100%
  );
  background-size: 400% 400%;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 12px 25px;
  font-size: 18px;
  letter-spacing: 1.3px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  transition: background-position 0.5s ease;

  &:hover {
    background-position: 100% 0;
  }
`;

const Logo = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    img:first-child {
      display: none;
    }
    img:last-child {
      width: 75px;
    }
    
  }

  @media (min-width: 768px) {
    img:last-child {
      display: none;
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
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export default NavBar;
