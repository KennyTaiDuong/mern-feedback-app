import React, { useContext } from "react";
import styled from "styled-components";
import Filter from "../Filter/Filter";
import RoadmapStats from "../RoadmapStats/RoadmapStats";
import { GlobalContext } from "../../../App/App";

const SidebarContainer = styled.div`
  background: var(--neutral-400);
  padding: 1.5rem;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 30%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: auto;
  margin-top: 71px;
  z-index: 3;

  @media screen and (min-width: 640px) {
    display: none;
  }
`;

const DarkBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 71px;
  left: 0;
  right: 70%;
  bottom: 0;
  z-index: 0;

  @media screen and (min-width: 640px) {
    display: none;
  }
`;

const Sidebar = () => {
  const { setIsOpen } = useContext(GlobalContext);

  return (
    <SidebarContainer>
      <Filter />
      <RoadmapStats />
      <DarkBackground onClick={() => setIsOpen(false)} data-testid="dark-bg" />
    </SidebarContainer>
  );
};

export default Sidebar;
