import React, { useContext, useState } from "react";
import styled from "styled-components";
import { OpenContext } from "../Layout";

// Icons
import HamburgerIcon from "../../assets/shared/mobile/icon-hamburger.svg";
import CloseIcon from "../../assets/shared/mobile/icon-close.svg";
import Sidebar from "../Sidebar";
import Filter from "./Filter";
import RoadmapStats from "./RoadmapStats";

const Container = styled.div`
  @media screen and (min-width: 640px) and (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  @media screen and (min-width: 1024px) {
    max-width: 16rem;
  }
`;

const BigScreenContainer = styled.div`
  width: 100%;
  display: none;

  @media screen and (min-width: 640px) {
    display: block;
  }
`;

const StyledHeader = styled.header`
  background: radial-gradient(
    166.82% 166.82% at 103.9% -10.39%,
    #e84d70 0%,
    #a337f6 53.09%,
    #28a7ed 100%
  );
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--neutral-100);
  padding: 0.9375rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

  @media screen and (min-width: 640px) {
    background: rgba(122, 216, 251, 1), rgba(232, 77, 112, 1),
      rgba(163, 55, 246, 1), rgba(40, 167, 237, 1), rgba(251, 181, 122, 1);
    position: static;
    width: 100%;
    border-radius: 0.6125rem;
    align-items: flex-end;
  }

  @media screen and (min-width: 1024px) {
    padding: 1.5rem;
    padding-top: 4rem;
  }
`;

const HeaderContainer = styled.div`
  @media screen and (min-width: 640px) {
    display: flex;
    gap: 0.6125rem;
  }

  @media screen and (min-width: 1024px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const TitleContainer = styled.div``;

const Title = styled.p`
  font-size: 0.9375rem;
  font-weight: 700;

  @media screen and (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.8125rem;
  font-weight: 500;

  @media screen and (min-width: 1024px) {
    font-size: 0.9375rem;
  }
`;

const StyledIcon = styled.img`
  height: 100%;

  @media screen and (min-width: 640px) {
    display: none;
  }
`;

const Header = () => {
  const { isOpen, setIsOpen } = useContext(OpenContext);

  return (
    <Container>
      <HeaderContainer>
        <StyledHeader>
          <TitleContainer>
            <Title>Frontend Mentor</Title>
            <Subtitle>Feedback Board</Subtitle>
          </TitleContainer>
          <StyledIcon
            src={isOpen ? CloseIcon : HamburgerIcon}
            onClick={() => setIsOpen(!isOpen)}
          />
        </StyledHeader>
        <BigScreenContainer>
          <Filter />
        </BigScreenContainer>
        <BigScreenContainer>
          <RoadmapStats />
        </BigScreenContainer>
      </HeaderContainer>
      {isOpen && <Sidebar />}
    </Container>
  );
};

export default Header;
