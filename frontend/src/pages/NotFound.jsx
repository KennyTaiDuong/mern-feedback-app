import React from "react";
import styled from "styled-components";
import { ContentContainer } from "../globalStyles";
import { Heading } from "./feedback/FeedbackDetail";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  padding: 1.5rem;
  border-radius: 0.625rem;
`;

const NotFound = () => {
  return (
    <Container>
      <ContentContainer>
        <Heading>Error, page not found</Heading>
        <NavLink to={"/"}>Click</NavLink> here to go home
      </ContentContainer>
    </Container>
  );
};

export default NotFound;
