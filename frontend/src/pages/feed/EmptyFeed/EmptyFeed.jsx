import React from "react";
import styled from "styled-components";
import { AddButton } from "../../../globalStyles";
import DetectiveImg from "../../../assets/suggestions/illustration-empty.svg";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--neutral-100);
  border-radius: 10px;

  @media screen and (min-width: 690px) {
    padding: 6.875rem;
    margin-top: 1.5rem;
  }
`;

const StyledImg = styled.img`
  padding-bottom: 2.5rem;
`;

const Title = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--blue-500);
  padding-bottom: 0.875rem;
`;

const Description = styled.p`
  font-size: 0.8125rem;
  color: var(--blue-300);
  text-align: center;
  padding-bottom: 1.5rem;

  @media screen and (min-width: 690px) {
    max-width: 52ch;
  }
`;

const EmptyFeed = () => {
  const navigate = useNavigate();

  function handleAddBtn() {
    navigate("/newfeedback");
  }

  return (
    <Container>
      <StyledImg src={DetectiveImg} />
      <Title>There is no feedback yet.</Title>
      <Description>
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </Description>
      <AddButton onClick={handleAddBtn}>+ Add Feedback</AddButton>
    </Container>
  );
};

export default EmptyFeed;
