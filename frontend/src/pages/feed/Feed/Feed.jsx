import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Components
import { ContentContainer, FilterButton } from "../../../globalStyles";
import { GlobalContext } from "../../../App/App";
import EmptyFeed from "../EmptyFeed/EmptyFeed";
import Header from "../../../components/Menu/Header/Header";
import SortBar from "../../../components/Menu/SortBar/SortBar";

// Icons
import UpArrowIcon from "../../../assets/shared/icon-arrow-up.svg";
import CommentIcon from "../../../assets/shared/icon-comments.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
  margin-top: 103px;
  padding: 1.5rem;

  @media screen and (min-width: 690px) and (max-width: 1024px) {
    margin-top: 0;
    padding: 3.5rem 2.5rem;
  }

  @media screen and (min-width: 1024px) {
    flex-direction: row;
    max-width: 70rem;
    margin: 0 auto;
    padding: 6rem 2rem;
  }
`;

const Main = styled.main`
  width: 100%;
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const FeedbackContainer = styled(ContentContainer)`
  @media screen and (min-width: 690px) {
    display: flex;
    gap: 2.5rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  @media screen and (min-width: 690px) {
    order: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export const Title = styled.h3`
  font-size: 0.8125rem;
  color: var(--blue-500);
  padding-bottom: ${({ pb }) => (pb ? pb : null)};

  @media screen and (min-width: 690px) {
    font-size: 1.125rem;
  }
`;

export const Description = styled.p`
  font-size: 0.8125rem;
  color: var(--blue-300);
  padding-bottom: ${({ pb }) => (pb ? pb : null)};

  @media screen and (min-width: 690px) {
    font-size: 1rem;
  }
`;

export const FilterText = styled.p`
  border-radius: 10px;
  background-color: var(--neutral-700);
  border: 0;
  padding: 0.375rem 1rem;
  color: var(--blue-900);
  font-size: 0.8125rem;
  font-weight: 700;
  display: inline-block;
  margin-bottom: ${({ mb }) => (mb ? mb : null)};
`;

export const ButtonContainer = styled.div`
  display: flex;
  padding-top: 1rem;

  @media screen and (min-width: 690px) {
  }
`;

export const UpvoteButton = styled(FilterButton)`
  color: var(--blue-500);
  display: flex;
  gap: 0.5rem;
  align-items: center;
  position: absolute;
  margin-top: -1.75rem;

  &:hover {
    background-color: rgba(207, 215, 255, 1);
  }

  @media screen and (min-width: 690px) {
    margin-top: 0;
    position: static;
    align-self: flex-start;
    justify-content: space-between;
    padding: 0.3125rem 0.56125rem;
  }
`;

export const CommentDisplay = styled.div`
  border: 0;
  background: var(--neutral-100);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--blue-500);
  margin-left: auto;
  padding: 0.3125rem 0;
`;

const Feed = () => {
  const { feedbackArray, setRefreshCount } = useContext(GlobalContext);

  if (feedbackArray.length === 0) {
    return (
      <Container>
        <Header />
        <Main data-testid="empty-container">
          <SortBar />
          <EmptyFeed />
        </Main>
      </Container>
    );
  }

  const feedbackCardElements = feedbackArray.map((feedback, index) => {
    const {
      title,
      category,
      upvotes,
      description,
      comments,
      _id,
      upvoted,
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

    const activeUpvote = {
      backgroundColor: "var(--blue-900)",
      color: "var(--neutral-100)",
    };

    const activeFilter = {
      filter: "brightness(1000%)",
    };

    async function patchUpvotes(id, newUpvotes, upvoted) {
      try {
        const res = await fetch(
          `http://3.135.141.179:27017/api/feedback/${id}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "PATCH",

            body: JSON.stringify({
              upvotes: newUpvotes,
              upvoted: upvoted,
            }),
          }
        );

        setRefreshCount((prev) => prev + 1);
      } catch (error) {
        console.error(error);
      }
    }

    async function handleUpvote() {
      if (!upvoted) {
        const newUpvotes = upvotes + 1;

        await patchUpvotes(_id, newUpvotes, true);
      }

      if (upvoted) {
        const newUpvotes = upvotes - 1;
        await patchUpvotes(_id, newUpvotes, false);
      }
    }

    return (
      <FeedbackContainer key={_id}>
        <StyledNavLink to={`/${_id}`} style={{ textDecoration: "none" }}>
          <div>
            <Title pb={"0.5rem"} data-testid={`title-${index}`}>
              {title}
            </Title>
            <Description pb={"0.5rem"}>{description}</Description>
            <FilterText disabled={true}>
              {category.length === 2
                ? category.toUpperCase()
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </FilterText>
          </div>
          <ButtonContainer>
            <CommentDisplay
              style={commentsCount === 0 ? { opacity: "0.5" } : null}
              data-testid={`comment-count-${index}`}
            >
              <img src={CommentIcon} />
              {commentsCount}
            </CommentDisplay>
          </ButtonContainer>
        </StyledNavLink>
        <UpvoteButton
          onClick={handleUpvote}
          style={upvoted ? activeUpvote : null}
          data-testid={`upvote-btn-${index}`}
        >
          <img src={UpArrowIcon} style={upvoted ? activeFilter : null} />
          {upvotes}
        </UpvoteButton>
      </FeedbackContainer>
    );
  });

  return (
    <Container>
      <Header />
      <FeedContainer>
        <SortBar />
        {feedbackCardElements}
      </FeedContainer>
    </Container>
  );
};

export default Feed;
