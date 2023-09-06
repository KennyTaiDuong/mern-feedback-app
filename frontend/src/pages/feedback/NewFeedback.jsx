import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { AddButton, ContentContainer } from "../../globalStyles";
import { Description, Title } from "../feed/Feed";
import { Heading } from "./FeedbackDetail";

import LeftArrow from "../../assets/shared/icon-arrow-left.svg";
import DownArrow from "../../assets/shared/icon-arrow-down.svg";
import UpArrow from "../../assets/shared/icon-arrow-up.svg";
import CheckIcon from "../../assets/shared/icon-check.svg";
import NewFeedbackIcon from "../../assets/shared/icon-new-feedback.svg";
import { GlobalContext } from "../../App";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.4375rem;
  padding: 1.5rem;

  @media screen and (min-width: 1024px) {
    max-width: 730px;
    margin: 0 auto;
    padding: 5rem 0;
  }
`;

const BackButton = styled.button`
  border: 0;
  background-color: transparent;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--blue-300);
  padding: 0.625rem 0;
`;

const StyledArrow = styled.img`
  filter: invert(62%) sepia(68%) saturate(7491%) hue-rotate(219deg)
    brightness(91%) contrast(98%);
  height: 100%;
`;

const StyledLogo = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  transform: translateY(-44px);
  position: absolute;
`;

const StyledTextArea = styled.textarea`
  resize: none;
  width: 100%;
  padding: 0.5rem 1rem;
  margin: 1rem 0 1.5rem;
  border: 0;
  border-radius: 0.3125rem;
  background-color: var(--neutral-400);
`;

const DropDownContainer = styled.div`
  background-color: var(--neutral-400);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0 1.5rem;
  border-radius: 0.625rem;
  align-items: center;
  border: 1px solid white;
  cursor: pointer;
  position: relative;
`;

const SelectedCategory = styled.p`
  color: var(--blue-300);
`;

const StyledDropDown = styled.ul`
  list-style: none;
  background-color: var(--neutral-100);
  border-radius: 0.625rem;
  position: absolute;
  margin-top: 20rem;
  box-shadow: 0px 10px 40px -7px rgba(55, 63, 104, 0.35);
  width: 100%;
  left: 0;
`;

const Item = styled.li`
  color: var(--blue-300);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;

  &:hover {
    color: "var(--magenta-400)";
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media screen and (min-width: 640px) {
    flex-direction: row-reverse;
  }
`;

const CancelButton = styled.button`
  background-color: var(--blue-500);
  color: var(--neutral-700);
  font-size: 0.8125rem;
  font-weight: 700;
  padding: 0.625rem 0.75rem;
  border: 0;
  border-radius: 0.625rem;

  @media screen and (min-width: 640px) {
    padding: 0.75rem 1.5rem;
  }
`;

const Divider = styled.div`
  border-top: 1px solid var(--blue-300);
  opacity: 0.2;
  width: 100%;
`;

const NewFeedback = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { feedbackArray, setRefreshCount } = useContext(GlobalContext);
  const [selectedCategory, setSelectedCategory] = useState("Feature");

  const navigate = useNavigate();

  const activeDropdown = {
    border: "1px solid var(--blue-900)",
  };

  function goBack() {
    navigate(`/`);
  }

  function toggleOpen() {
    setIsOpen(!isOpen);
  }

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.outerText);
  }

  async function handleAddBtn() {
    const res = await fetch(`http://localhost:4000/api/feedback/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",

      body: JSON.stringify({
        title: document.getElementById("title").value,
        description: document.getElementById("desc").value,
        category: selectedCategory,
        upvotes: 0,
        upvoted: false,
        status: "suggestion",
        id: feedbackArray.length + 1,
        comments: [],
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    navigate("/");
    setRefreshCount((prev) => prev + 1);
  }

  return (
    <Container>
      <BackButton onClick={goBack}>
        <img src={LeftArrow} />
        Go Back
      </BackButton>
      <ContentContainer>
        <StyledLogo src={NewFeedbackIcon} />
        <Heading>Create New Feedback</Heading>
        <Title>Feeback Title</Title>
        <Description>Add a short, descriptive headline</Description>
        <StyledTextArea id="title" />
        <Title>Category</Title>
        <Description>Choose a catgory for your feedback</Description>
        <DropDownContainer
          onClick={toggleOpen}
          style={isOpen ? activeDropdown : null}
        >
          <SelectedCategory>{selectedCategory}</SelectedCategory>
          <StyledArrow src={isOpen ? UpArrow : DownArrow} />
          {isOpen && (
            <StyledDropDown>
              <Item onClick={(e) => handleCategoryChange(e)}>
                Feature
                {selectedCategory === "Feature" && <img src={CheckIcon} />}
              </Item>
              <Divider />
              <Item onClick={(e) => handleCategoryChange(e)}>
                UI
                {selectedCategory === "UI" && <img src={CheckIcon} />}
              </Item>
              <Divider />
              <Item onClick={(e) => handleCategoryChange(e)}>
                UX
                {selectedCategory === "UX" && <img src={CheckIcon} />}
              </Item>
              <Divider />
              <Item onClick={(e) => handleCategoryChange(e)}>
                Enhancement
                {selectedCategory === "Enhancement" && <img src={CheckIcon} />}
              </Item>
              <Divider />
              <Item onClick={(e) => handleCategoryChange(e)}>
                Bug
                {selectedCategory === "Bug" && <img src={CheckIcon} />}
              </Item>
            </StyledDropDown>
          )}
        </DropDownContainer>
        <Title>Feedback Detail</Title>
        <Description>
          Include any specific comments on what should be improved, added, etc.
        </Description>
        <StyledTextArea rows="4" id="desc" />
        <ButtonContainer>
          <AddButton onClick={handleAddBtn}>Add Feedback</AddButton>
          <CancelButton onClick={goBack}>Cancel</CancelButton>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default NewFeedback;
