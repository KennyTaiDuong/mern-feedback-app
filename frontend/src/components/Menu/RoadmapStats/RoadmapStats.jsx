import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { ContentContainer } from "../../../globalStyles";
import { GlobalContext } from "../../../App/App";

const MainContainer = styled(ContentContainer)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  @media screen and (min-width: 640px) {
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Circle = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${({ bgc }) => (bgc ? bgc : null)};
  border-radius: 50%;
`;

const Title = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--blue-400);
`;

const StyledNavLink = styled(NavLink)`
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--blue-900);
`;

const StatusText = styled.p`
  color: var(--blue-300);
`;

const CounterText = styled.p`
  font-weight: 700;
  color: var(--blue-300);
  margin-left: auto;
`;

const RoadmapStats = () => {
  const { plannedArray, progressArray, liveArray } = useContext(GlobalContext);

  return (
    <MainContainer>
      <Container>
        <Title>Roadmap</Title>
        <StyledNavLink to={"/roadmap"}>View</StyledNavLink>
      </Container>
      <StatContainer>
        <Circle bgc="var(--orange-400)" />
        <StatusText>Planned</StatusText>
        <CounterText>{plannedArray ? plannedArray.length : 0}</CounterText>
      </StatContainer>
      <StatContainer>
        <Circle bgc="var(--magenta-400)" />
        <StatusText>In-Progress</StatusText>
        <CounterText>{progressArray ? progressArray.length : 0}</CounterText>
      </StatContainer>
      <StatContainer>
        <Circle bgc="var(--blue-700)" />
        <StatusText>Live</StatusText>
        <CounterText>{liveArray ? liveArray.length : 0}</CounterText>
      </StatContainer>
    </MainContainer>
  );
};

export default RoadmapStats;
