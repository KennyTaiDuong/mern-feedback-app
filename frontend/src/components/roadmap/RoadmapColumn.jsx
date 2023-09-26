import React, { useContext } from "react";
import styled from "styled-components";

import UpArrow from "../../assets/shared/icon-arrow-up.svg";
import CommentLogo from "../../assets/shared/icon-comments.svg";

import { GlobalContext } from "../../App/App";
import { ContentContainer } from "../../globalStyles";
import { Heading } from "../../pages/feedback/FeedbackDetail/FeedbackDetail";
import { Circle } from "../Menu/RoadmapStats/RoadmapStats";
import {
  ButtonContainer,
  CommentDisplay,
  Description,
  FilterText,
  Title,
  UpvoteButton,
} from "../../pages/feed/Feed/Feed";
import { useNavigate } from "react-router-dom";

const HeadingContainer = styled.div`
  padding: 1.5rem;

  @media screen and (min-width: 690px) {
    padding: 2rem 0;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 1rem;
`;

const CardSection = styled.section`
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media screen and (min-width: 690px) {
    padding: 1.5rem 0 0;
    gap: 1rem;
    display: grid;
    grid-template-rows: 1fr;
  }
`;

const StyledTitle = styled((props) => <Title {...props} />)`
  @media screen and (min-width: 690px) {
    font-size: 0.8125rem;
    letter-spacing: -0.181px;
  }
`;

const StyledDescription = styled((props) => <Description {...props} />)`
  @media screen and (min-width: 690px) {
    font-size: 0.8125rem;
    letter-spacing: -0.181px;
  }
`;

const RoadmapColumn = ({ currentTab }) => {
  const { allFeedback } = useContext(GlobalContext);
  const navigate = useNavigate();

  function filterByStatus(obj) {
    return obj.status === currentTab.split(" ")[0].toLowerCase();
  }

  const ContentContainerElements = allFeedback
    .filter(filterByStatus)
    .map((feedback) => {
      const {
        title,
        category,
        comments,
        description,
        upvotes,
        _id,
        id,
      } = feedback;

      const replies = comments.map((comment) => {
        if (comment.replies) {
          return comment.replies.length;
        } else {
          return 0;
        }
      });

      const commentsCount =
        replies.reduce((sum, current) => sum + current, 0) + comments.length;

      const cardBorder = {
        boxShadow: `inset 0px 506px 0px -500px var(--${
          currentTab.split(" ")[0] === "Planned"
            ? "orange-400"
            : currentTab.split(" ")[0] === "Live"
            ? "blue-700"
            : "magenta-400"
        })`,
      };

      return (
        <ContentContainer
          key={id}
          style={cardBorder}
          onClick={() => navigate(`/${_id}`)}
          data-testid="item"
        >
          <StatusContainer>
            <Circle
              bgc={`var(--${
                currentTab.split(" ")[0] === "Planned"
                  ? "orange-400"
                  : currentTab.split(" ")[0] === "Live"
                  ? "blue-700"
                  : "magenta-400"
              })`}
            />
            <StyledDescription>{currentTab.split(" ")[0]}</StyledDescription>
          </StatusContainer>
          <StyledTitle pb={"0.5rem"}>{title}</StyledTitle>
          <StyledDescription pb={"0.5rem"}>{description}</StyledDescription>
          <FilterText mb={"1rem"}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </FilterText>
          <ButtonContainer>
            <UpvoteButton>
              <img src={UpArrow} />
              {upvotes}
            </UpvoteButton>
            <CommentDisplay
              style={commentsCount === 0 ? { opacity: "0.5" } : null}
            >
              <img src={CommentLogo} />
              {commentsCount}
            </CommentDisplay>
          </ButtonContainer>
        </ContentContainer>
      );
    });

  return (
    <HeadingContainer>
      <Heading style={{ padding: "0" }} data-testid="heading">
        {currentTab}
      </Heading>
      <Description data-testid="desc">
        {currentTab.split(" ")[0] === "Planned"
          ? "Ideas prioritized for research"
          : currentTab.split(" ")[0] === "Live"
          ? "Released features"
          : "Currently being developed"}
      </Description>
      <CardSection data-testid="card-section">
        {ContentContainerElements}
      </CardSection>
    </HeadingContainer>
  );
};

export default RoadmapColumn;
