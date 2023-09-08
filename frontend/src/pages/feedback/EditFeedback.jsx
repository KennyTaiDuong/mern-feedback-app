import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import LeftArrow from "../../assets/shared/icon-arrow-left.svg";
import UpArrow from "../../assets/shared/icon-arrow-up.svg";
import DownArrow from "../../assets/shared/icon-arrow-down.svg";
import EditLogo from "../../assets/shared/icon-edit-feedback.svg";
import CheckIcon from "../../assets/shared/icon-check.svg";

import { AddButton, ContentContainer } from "../../globalStyles";
import { Heading } from "./FeedbackDetail";
import { Description, Title } from "../feed/Feed";
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
  height: 100%;
  margin-left: auto;
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
  padding: 1rem;
  margin: 1rem 0 1.5rem;
  border: 0;
  border-radius: 0.3125rem;
  background-color: var(--neutral-400);
  color: var(--blue-500);
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StyledDropDown = styled.ul`
  background-color: var(--neutral-100);
  list-style: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 5rem;
  border-radius: 0.625rem;
  margin-top: -1rem;
  box-shadow: 0px 10px 40px -7px rgba(55, 63, 104, 0.35);
  z-index: 2;
`;

const Item = styled.li`
  color: var(--blue-300);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;

  &:hover {
    color: var(--magenta-400);
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

const SaveButton = styled(AddButton)`
  background-color: var(--magenta-400);
`;

const CancelButton = styled(AddButton)`
  background-color: var(--blue-500);
`;

const DeleteButton = styled(AddButton)`
  background-color: var(--red-400);

  @media screen and (min-width: 640px) {
    margin-right: auto;
  }
`;

const Divider = styled.div`
  border-top: 1px solid var(--blue-300);
  opacity: 0.2;
  width: 100%;
`;

const EditFeedback = () => {
  const [feedback, setFeedback] = useState({});
  const [newFeedback, setNewFeedback] = useState({});
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const { setRefreshCount } = useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const activeDropdown = {
    border: "1px solid var(--blue-900)",
  };

  useEffect(() => {
    async function fetchDetail() {
      const response = await fetch(
        `http://3.135.141.179:27017/api/feedback/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const feedback = await response.json();
      setFeedback(feedback);
      setNewFeedback(feedback);
    }

    fetchDetail();
  }, []);

  const { title, category, description, status, _id } = feedback;

  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedStatus, setSelectedStatus] = useState(status);

  function goBack() {
    navigate(`/${id}`);
  }

  // Functions to update feedback

  function updateFeedbackTitle(e) {
    setNewFeedback({
      ...newFeedback,
      title: e.target.value,
    });
  }

  function updateFeedbackCategory(e) {
    setSelectedCategory(e.target.outerText);
    setCategoryOpen(false);

    setNewFeedback({
      ...newFeedback,
      category: e.target.outerText.toLowerCase(),
    });
  }

  function updateFeedbackStatus(e) {
    setSelectedStatus(e.target.outerText);
    setStatusOpen(false);

    setNewFeedback({
      ...newFeedback,
      status: e.target.outerText.toLowerCase(),
    });
  }

  function updateFeedbackDetail(e) {
    setNewFeedback({
      ...newFeedback,
      description: e.target.value,
    });
  }

  // patch request to update database
  async function updateFeedback() {
    const res = await fetch(`http://3.135.141.179:27017/api/feedback/${id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",

      body: JSON.stringify(newFeedback),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    setRefreshCount((prev) => prev + 1);
    navigate(`/${id}`);
  }

  async function deleteFeedback() {
    const res = await fetch(`http://3.135.141.179:27017/api/feedback/${_id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    setRefreshCount((prev) => prev + 1);
    navigate("/");
  }

  // Functions for dropdown menus

  function toggleCategory() {
    setStatusOpen(false);
    setCategoryOpen(!categoryOpen);
  }

  function toggleStatus() {
    setCategoryOpen(false);
    setStatusOpen(!statusOpen);
  }

  function toggleDropdown() {
    if (categoryOpen || statusOpen) {
      setCategoryOpen(false);
      setStatusOpen(false);
    }
  }

  return (
    <Container>
      <BackButton onClick={goBack}>
        <img src={LeftArrow} />
        Go Back
      </BackButton>
      <ContentContainer onClick={toggleDropdown}>
        <StyledLogo src={EditLogo} />
        <Heading>Editing '{title}'</Heading>
        <Title>Feedback Title</Title>
        <Description>Add a short, descriptive headline</Description>
        <StyledTextArea
          rows={1}
          defaultValue={title}
          onChange={(e) => {
            updateFeedbackTitle(e);
          }}
        />
        <Title>Category</Title>
        <Description>Choose a category for your feedback</Description>
        <DropDownContainer
          onClick={toggleCategory}
          style={categoryOpen ? activeDropdown : null}
        >
          <SelectedCategory>
            {selectedCategory
              ? selectedCategory
              : category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : null}
            <StyledArrow src={categoryOpen ? UpArrow : DownArrow} />
          </SelectedCategory>
          {categoryOpen && (
            <StyledDropDown>
              <Item onClick={(e) => updateFeedbackCategory(e)}>
                Feature
                {selectedCategory === "Feature" && <img src={CheckIcon} />}
              </Item>
              <Divider />
              <Item onClick={(e) => updateFeedbackCategory(e)}>
                UI
                {(selectedCategory === "UI" || category === "UI") && (
                  <img src={CheckIcon} />
                )}
              </Item>
              <Divider />
              <Item onClick={(e) => updateFeedbackCategory(e)}>
                UX
                {selectedCategory === "UX" && <img src={CheckIcon} />}
              </Item>
              <Divider />
              <Item onClick={(e) => updateFeedbackCategory(e)}>
                Enhancement
                {selectedCategory === "Enhancement" && <img src={CheckIcon} />}
              </Item>
              <Divider />
              <Item onClick={(e) => updateFeedbackCategory(e)}>
                Bug
                {selectedCategory === "Bug" && <img src={CheckIcon} />}
              </Item>
            </StyledDropDown>
          )}
        </DropDownContainer>
        <Title>Update Status</Title>
        <Description>Change feature state</Description>
        <DropDownContainer
          onClick={toggleStatus}
          style={statusOpen ? activeDropdown : null}
        >
          <SelectedCategory>
            {selectedStatus
              ? selectedStatus
              : status === "in-progress"
              ? "In-Progress"
              : status
              ? status.charAt(0).toUpperCase() + status.slice(1)
              : status}
            <StyledArrow src={statusOpen ? UpArrow : DownArrow} />
          </SelectedCategory>
          {statusOpen && (
            <StyledDropDown>
              <Item onClick={(e) => updateFeedbackStatus(e)}>
                Suggestion
                {selectedStatus === "Suggestion" && <img src={CheckIcon} />}
              </Item>
              <Divider />
              <Item onClick={(e) => updateFeedbackStatus(e)}>
                Planned
                {selectedStatus === "Planned" && <img src={CheckIcon} />}
              </Item>
              <Divider />
              <Item onClick={(e) => updateFeedbackStatus(e)}>
                In-Progress
                {selectedStatus === "In-Progress" && <img src={CheckIcon} />}
              </Item>
              <Divider />
              <Item onClick={(e) => updateFeedbackStatus(e)}>
                Live
                {selectedStatus === "Live" && <img src={CheckIcon} />}
              </Item>
            </StyledDropDown>
          )}
        </DropDownContainer>
        <Title>Feedback Detail</Title>
        <Description>
          Include any specific comments on what should be improved, added, etc.
        </Description>
        <StyledTextArea
          rows={4}
          defaultValue={description}
          onChange={(e) => {
            updateFeedbackDetail(e);
          }}
        />
        <ButtonContainer>
          <SaveButton onClick={updateFeedback}>Save Changes</SaveButton>
          <CancelButton onClick={goBack}>Cancel</CancelButton>
          <DeleteButton onClick={deleteFeedback}>Delete</DeleteButton>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default EditFeedback;
