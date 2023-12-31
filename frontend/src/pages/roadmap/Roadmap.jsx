import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import LeftArrow from "../../assets/shared/icon-arrow-left.svg";

import { GlobalContext } from "../../App/App";
import { AddButton } from "../../globalStyles";
import { Heading } from "../feedback/FeedbackDetail/FeedbackDetail";
import RoadmapColumn from "../../components/roadmap/RoadmapColumn";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 690px) {
    padding: 2.5rem;
  }

  @media screen and (min-width: 1024px) {
    max-width: 1110px;
    margin: 0 auto;
    padding: 5rem 2.5rem;
  }
`;

const Header = styled.header`
  background-color: var(--blue-500);
  width: 100%;
  padding: 1.5rem;

  @media screen and (min-width: 690px) {
    border-radius: 0.625rem;
  }

  @media screen and (min-width: 1024px) {
    min-width: 64.375rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BackContainer = styled.div``;

const BackButton = styled.button`
  border: 0;
  background: transparent;
  color: var(--neutral-100);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 0.8125rem;
`;

const StyledIcon = styled.img`
  filter: brightness(1000%);
`;

const WhiteHeading = styled((props) => <Heading {...props} />)`
  color: var(--neutral-100);
  padding: 0;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #8c92b332;

  @media screen and (min-width: 690px) {
    display: none;
  }
`;

const StatusTab = styled.button`
  border: 0;
  background-color: transparent;
  opacity: 0.4;
  color: var(--blue-500);
  text-align: center;
  font-size: 0.8125rem;
  font-weight: 700;
  width: 100%;
  padding: 1rem 0;
  border-bottom: 3px solid var(--neutral-100);
`;

const BigScreenContainer = styled.div`
  display: none;

  @media screen and (min-width: 690px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 0.625rem;
  }
`;

const MobileContainer = styled.div`
  @media screen and (min-width: 690px) {
    display: none;
  }
`;

const Roadmap = () => {
  const { plannedArray, progressArray, liveArray } = useContext(GlobalContext);
  const [currentTab, setCurrentTab] = useState(
    `Planned (${plannedArray.length})`
  );

  const navigate = useNavigate();

  const activeTab = {
    opacity: "1",
    borderBottom: `4px solid var(--${
      currentTab.split(" ")[0] === "Planned"
        ? "orange-400"
        : currentTab.split(" ")[0] === "Live"
        ? "blue-700"
        : "magenta-400"
    })`,
  };

  function handleTabChange(e) {
    setCurrentTab(e.target.textContent);
  }

  function goBack() {
    navigate("/");
  }

  function handleAddButton() {
    navigate("/newfeedback");
  }

  return (
    <Container>
      <Header>
        <ButtonContainer>
          <BackContainer>
            <BackButton onClick={goBack}>
              <StyledIcon src={LeftArrow} />
              Go Back
            </BackButton>
            <WhiteHeading>Roadmap</WhiteHeading>
          </BackContainer>
          <AddButton onClick={handleAddButton}>+ Add Feedback</AddButton>
        </ButtonContainer>
      </Header>

      {/* Navbar */}
      <Navbar>
        <StatusTab
          onClick={(e) => handleTabChange(e)}
          style={currentTab.split(" ")[0] == "Planned" ? activeTab : null}
          id={currentTab.split(" ")[0] == "Planned" ? "active" : "planned"}
          data-testid="nav-item-1"
        >
          Planned ({plannedArray.length})
        </StatusTab>
        <StatusTab
          onClick={(e) => handleTabChange(e)}
          style={currentTab.split(" ")[0] == "In-Progress" ? activeTab : null}
          id={
            currentTab.split(" ")[0] == "In-Progress" ? "active" : "in-progress"
          }
          data-testid="nav-item-2"
        >
          In-Progress ({progressArray.length})
        </StatusTab>
        <StatusTab
          onClick={(e) => handleTabChange(e)}
          style={currentTab.split(" ")[0] == "Live" ? activeTab : null}
          id={currentTab.split(" ")[0] == "Live" ? "active" : "live"}
          data-testid="nav-item-3"
        >
          Live ({liveArray.length})
        </StatusTab>
      </Navbar>

      {/* Feedback Cards */}
      <MobileContainer>
        <div>
          <RoadmapColumn currentTab={currentTab} />
        </div>
      </MobileContainer>

      <BigScreenContainer>
        <div>
          <RoadmapColumn currentTab={"Planned"} />
        </div>
        <div>
          <RoadmapColumn currentTab={"In-Progress"} />
        </div>
        <div>
          <RoadmapColumn currentTab={"Live"} />
        </div>
      </BigScreenContainer>
    </Container>
  );
};

export default Roadmap;
