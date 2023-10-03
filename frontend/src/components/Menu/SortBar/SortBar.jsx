import React, { useContext, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import UpArrowIcon from "../../../assets/shared/icon-arrow-up.svg";
import DownArrowIcon from "../../../assets/shared/icon-arrow-down.svg";
import CheckIcon from "../../../assets/shared/icon-check.svg";
import SuggestionIcon from "../../../assets/suggestions/icon-suggestions.svg";

import { GlobalContext } from "../../../App/App";

const Container = styled.div`
  background-color: var(--blue-400);
  position: absolute;
  top: 71px;
  left: 0;
  right: 0;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;

  @media screen and (max-width: 319px) {
    flex-direction: column;
    gap: 0.5rem;
  }

  @media screen and (min-width: 690px) {
    position: static;
    border-radius: 0.6125rem;
    padding: 0.875rem 0.75rem;
    gap: 2.5rem;
    min-width: 42.25rem;
  }
`;

const SuggestionsContainer = styled.div`
  display: none;

  @media screen and (min-width: 690px) {
    display: flex;
    gap: 1rem;
    align-items: center;
    color: var(--neutral-100);
    font-size: 1.125rem;
    font-weight: 700;
    padding-left: 0.75rem;
  }
`;

const SortContainer = styled.div`
  color: var(--neutral-400);
  font-size: 0.8125rem;
  position: relative;
  cursor: pointer;
  z-index: 2;
`;

const StyledIcon = styled.img`
  filter: brightness(1000%);
`;

const Check = styled.img`
  height: 100%;
`;

const DropDownContainer = styled.ul`
  position: absolute;
  top: 30px;
  border-radius: 0.64rem;
  width: 125%;
  box-shadow: 0px 10px 40px -7px rgba(55, 63, 104, 0.35);
  background-color: var(--neutral-100);
  color: var(--blue-300);
  text-align: left;
`;

const DropDownContent = styled.li`
  list-style: none;
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.div`
  border-top: 1px solid rgb(0, 0, 0, 0.15);
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: 0;
  background-color: var(--magenta-400);
  color: var(--neutral-700);
  font-size: 0.8125rem;
  font-weight: 700;
  padding: 0.64rem 0.75rem;
  border: 0;
  border-radius: 0.64rem;

  @media screen and (min-width: 690px) {
    margin-left: auto;
  }
`;

const SortBar = () => {
  const {
    sort,
    setSort,
    feedbackArray,
    setFeedbackArray,
    suggestionArray,
  } = useContext(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);

  function handleSortChange(e) {
    setSort(e.target.textContent);
    setIsOpen(false);
  }

  function getTotalComments(obj) {
    let totalComments = obj.comments.length;

    for (const comment of obj.comments) {
      if (comment.replies) {
        totalComments += comment.replies.length;
      }
    }

    return totalComments;
  }

  function sortMostUpvotes() {
    setFeedbackArray(
      feedbackArray.sort((a, b) => {
        return b.upvotes - a.upvotes;
      })
    );
  }

  function sortLeastUpvotes() {
    setFeedbackArray(
      feedbackArray.sort((a, b) => {
        return a.upvotes - b.upvotes;
      })
    );
  }

  function sortMostComments() {
    setFeedbackArray(
      feedbackArray.sort((a, b) => {
        return getTotalComments(b) - getTotalComments(a);
      })
    );
  }

  function sortLeastComments() {
    setFeedbackArray(
      feedbackArray.sort((a, b) => {
        return getTotalComments(a) - getTotalComments(b);
      })
    );
  }

  return (
    <Container>
      <SuggestionsContainer>
        <StyledIcon src={SuggestionIcon} />
        <span data-testid="suggestions-count">
          {suggestionArray.length} Suggestion
          {suggestionArray.length === 1 ? "" : "s"}
        </span>
      </SuggestionsContainer>
      <SortContainer
        onClick={() => setIsOpen(!isOpen)}
        data-testid="sort-container"
      >
        Sort by :
        <strong style={{ padding: "0 0.25rem" }} data-testid="sort-text">
          {sort}
        </strong>
        <StyledIcon src={isOpen ? UpArrowIcon : DownArrowIcon} />
        <DropDownContainer
          style={{ display: isOpen ? "block" : "none" }}
          data-testid="dropdown-container"
        >
          <DropDownContent
            onClick={(e) => {
              handleSortChange(e);
              sortMostUpvotes();
            }}
            style={
              sort === "Most Upvotes" ? { color: "var(--magenta-400)" } : null
            }
            data-testid="item-1"
          >
            Most Upvotes
            {sort === "Most Upvotes" && <Check src={CheckIcon} />}
          </DropDownContent>
          <Divider />
          <DropDownContent
            onClick={(e) => {
              handleSortChange(e);
              sortLeastUpvotes();
            }}
            style={
              sort === "Least Upvotes" ? { color: "var(--magenta-400)" } : null
            }
            data-testid="item-2"
          >
            Least Upvotes
            {sort === "Least Upvotes" && <Check src={CheckIcon} />}
          </DropDownContent>
          <Divider />
          <DropDownContent
            onClick={(e) => {
              handleSortChange(e);
              sortMostComments();
            }}
            style={
              sort === "Most Comments" ? { color: "var(--magenta-400)" } : null
            }
            data-testid="item-3"
          >
            Most Comments
            {sort === "Most Comments" && <Check src={CheckIcon} />}
          </DropDownContent>
          <Divider />
          <DropDownContent
            onClick={(e) => {
              handleSortChange(e);
              sortLeastComments();
            }}
            style={
              sort === "Least Comments" ? { color: "var(--magenta-400)" } : null
            }
            data-testid="item-4"
          >
            Least Comments
            {sort === "Least Comments" && <Check src={CheckIcon} />}
          </DropDownContent>
        </DropDownContainer>
      </SortContainer>
      <StyledNavLink to="/newfeedback">+ Add Feedback</StyledNavLink>
    </Container>
  );
};

export default SortBar;
