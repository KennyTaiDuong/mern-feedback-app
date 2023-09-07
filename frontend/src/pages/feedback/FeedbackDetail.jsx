import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";

// Image Imports
import LeftArrow from "../../assets/shared/icon-arrow-left.svg";
import UpArrowIcon from "../../assets/shared/icon-arrow-up.svg";
import CommentIcon from "../../assets/shared/icon-comments.svg";

// Components
import { AddButton, ContentContainer } from "../../globalStyles";
import {
  CommentDisplay,
  Description,
  FilterText,
  Title,
  UpvoteButton,
} from "../feed/Feed";
import { GlobalContext } from "../../App";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem;

  @media screen and (min-width: 1024px) {
    width: clamp(0rem, 100vw, 46rem);
    margin: 0 auto;
    padding: 5rem 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ pt }) => (pt ? pt : null)};
`;

const FeedbackContainer = styled(ContentContainer)`
  @media screen and (min-width: 640px) {
    display: flex;
    gap: 2.5rem;
  }
`;

const TextContainer = styled.div`
  @media screen and (min-width: 640px) {
    display: flex;
    justify-content: space-between;
    order: 2;
    width: 100%;
    gap: 1rem;
  }
`;

const StyledIcon = styled.img`
  height: 100%;
`;

const BackButton = styled.button`
  background: transparent;
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--blue-300);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 0;
`;

const EditButton = styled(NavLink)`
  background-color: var(--blue-900);
  color: var(--neutral-700);
  font-size: 0.8125rem;
  font-weight: 700;
  padding: 0.625rem 0.75rem;
  border: 0;
  border-radius: 0.625rem;
  text-decoration: 0;

  @media screen and (min-width: 640px) {
    padding: 0.75rem 1.5rem;
  }
`;

export const Heading = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--blue-500);
  padding-bottom: 1.5rem;
`;

const CommentBox = styled.textarea`
  width: 100%;
  min-height: 5rem;
  resize: none;
  padding: 1rem;
  border: 0;
  border-radius: 5px;
  background-color: var(--neutral-700);
  margin-bottom: 1rem;

  &::placeholder {
    color: #8c92b3;
  }
`;

const ReplyBox = styled(CommentBox)`
  @media screen and (min-width: 640px) {
    margin-left: 4.5rem;
    margin-bottom: 0;
  }
`;

const CharacterCount = styled.p`
  font-size: 0.8125rem;
  color: var(--blue-300);
`;

const CommentsSection = styled(ContentContainer)`
  @media screen and (min-width: 640px) {
    padding: 2rem;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;

const ProfileInfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileName = styled.div`
  margin-left: 1rem;

  @media screen and (min-width: 640px) {
    margin-left: 2rem;
  }
`;

const ReplyButton = styled.button`
  border: 0;
  background: transparent;
  color: var(--blue-900);
  font-size: 0.8125rem;
  font-weight: 600;
  margin-left: auto;
`;

const PostReplyButton = styled(AddButton)`
  min-width: 7rem;
`;

const ProfilePic = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 50%;
`;

const Name = styled(Title)`
  padding: 0;
`;

const Username = styled(Description)`
  padding: 0;
`;

const CommentDescription = styled(Description)`
  @media screen and (min-width: 640px) {
    padding-left: 4.5rem;
  }
`;

const RepliesContainer = styled.div`
  padding-left: 1.5rem;
  border-left: 1px solid rgba(100, 113, 150, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReplySection = styled.div`
  display: flex;
  align-items: start;
  gap: 1rem;

  @media screen and (max-width: 640px) {
    flex-direction: column;
  }
`;

const Divider = styled.div`
  border-top: 1px solid #8c92b3;
  opacity: 0.25;
  width: 100%;
  margin: 1rem 0;
`;

const StyledSpan = styled.span`
  color: var(--magenta-400);
  font-weight: 700;
`;

const FeedbackDetail = () => {
  const [feedback, setFeedback] = useState({});
  const [commentLength, setCommentLength] = useState(250);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [replyTarget, setReplyTarget] = useState("");
  const { refreshCount, setRefreshCount } = useContext(GlobalContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const commentId = nanoid();

  const { title, category, upvotes, description, comments, _id, upvoted } =
    feedback;

  const activeUpvote = {
    backgroundColor: "var(--blue-900)",
    color: "var(--neutral-100)",
  };

  const activeFilter = {
    filter: "brightness(1000%)",
  };

  useEffect(() => {
    async function fetchDetail() {
      const response = await fetch(
        `http://3.135.141.179:27017/api/feedback/${id}`
      );

      if (response.ok) {
        const feedback = await response.json();
        setFeedback(feedback);
        return;
      }

      navigate("*");
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    fetchDetail();
  }, [refreshCount]);

  function goBack() {
    navigate("/");
    setRefreshCount((prev) => prev + 1);
  }

  function getTotalComments(array) {
    if (array) {
      let totalComments = array.length;

      for (const comment of array) {
        if (comment.replies) {
          totalComments += comment.replies.length;
        }
      }
      return totalComments;
    }
  }

  function handleCommentChange() {
    setNewComment(document.getElementById("new-comment").value);
    setCommentLength(250 - document.getElementById("new-comment").value.length);
  }

  function handleReplyChange(e) {
    setNewReply(e.target.value);
  }

  async function handleUpvote() {
    if (!upvoted) {
      const res = await fetch(
        `http://3.135.141.179:27017/api/feedback/${_id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PATCH",

          body: JSON.stringify({
            upvotes: `${upvotes + 1}`,
            upvoted: true,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    }

    if (upvoted) {
      const res = await fetch(
        `http://3.135.141.179:27017/api/feedback/${_id}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PATCH",

          body: JSON.stringify({
            upvotes: `${upvotes - 1}`,
            upvoted: false,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    }

    setRefreshCount((prev) => prev + 1);
  }

  async function postComment() {
    comments.push({
      id: commentId,
      content: newComment,
      user: {
        image: "./assets/user-images/kd_faceshot.jpeg",
        name: "Kenny Duong",
        username: "kdtheegreat",
      },
      replies: [],
    });

    const res = await fetch(`http://3.135.141.179:27017/api/feedback/${_id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",

      body: JSON.stringify({
        comments: comments,
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    setRefreshCount((prev) => prev + 1);
  }

  async function postReply() {
    // new reply object model
    const replyModel = {
      content: newReply,
      replyingTo: replyTarget,
      user: {
        image: "./assets/user-images/kd_faceshot.jpeg",
        name: "Kenny Duong",
        username: "kdtheegreat",
      },
    };

    // PATCH request to update reply array
    const res = await fetch(`http://3.135.141.179:27017/api/feedback/${_id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",

      body: JSON.stringify({
        comments: comments.map((comment) => {
          // Find the comment with the target comment
          if (comment.user.username === replyModel.replyingTo) {
            // if replies array exists, add new reply to array
            if (comment.replies) {
              return {
                ...comment,
                replies: [...comment.replies, replyModel],
              };
            } else {
              // if replies array doesn't exist, create replies array
              return {
                ...comment,
                replies: [replyModel],
              };
            }
          }
          // if target comment not found, search through each comment's replies
          else if (comment.replies) {
            comment.replies.map((reply) => {
              // if the username of the reply = target reply add reply to array
              if (reply.user.username === replyModel.replyingTo) {
                comment.replies.push(replyModel);
              }
            });
          }

          return comment;
        }),
      }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    // re-render the data and reset the states to default
    setRefreshCount((prev) => prev + 1);
    setNewComment("");
    setReplyTarget("");
  }

  let commentElements;

  if (!comments) {
    commentElements = <Title>Loading...</Title>;
  }

  // Replies of replies
  if (comments) {
    commentElements = comments.map((comment, index) => {
      const { content, user, id, replies } = comment;

      let repliesElements;

      if (replies) {
        repliesElements = replies.map((reply, index) => {
          const { content, user, replyingTo } = reply;

          return (
            <CommentContainer key={`reply-${index}`}>
              <ProfileInfoContainer>
                <ProfilePic src={`src/${user.image}`} />
                <ProfileName>
                  <Name>{user.name}</Name>
                  <Username>@{user.username}</Username>
                </ProfileName>
                <ReplyButton onClick={() => setReplyTarget(user.username)}>
                  Reply
                </ReplyButton>
              </ProfileInfoContainer>
              <CommentDescription>
                <StyledSpan>@{replyingTo}</StyledSpan> {content}
              </CommentDescription>
              <ReplySection
                style={
                  replyTarget === user.username
                    ? { display: "flex" }
                    : { display: "none" }
                }
              >
                <ReplyBox
                  id={user.username}
                  placeholder="Type your reply here"
                  maxLength={"250"}
                  cols="10"
                  rows="3"
                  onChange={(e) => handleReplyChange(e)}
                />
                <PostReplyButton onClick={postReply}>
                  Post Reply
                </PostReplyButton>
              </ReplySection>
            </CommentContainer>
          );
        });
      }

      // Replies to comments
      return (
        <div key={`comment-${id}`}>
          <CommentContainer>
            <ProfileInfoContainer>
              <ProfilePic src={`src/${user.image}`} />
              <ProfileName>
                <Name>{user.name}</Name>
                <Username>@{user.username}</Username>
              </ProfileName>
              <ReplyButton onClick={() => setReplyTarget(user.username)}>
                Reply
              </ReplyButton>
            </ProfileInfoContainer>
            <CommentDescription>{content}</CommentDescription>
            <ReplySection
              style={
                replyTarget === user.username
                  ? { display: "flex" }
                  : { display: "none" }
              }
            >
              <ReplyBox
                id={user.username}
                placeholder="Type your reply here"
                maxLength={"250"}
                cols="10"
                rows="3"
                onChange={(e) => handleReplyChange(e)}
              />
              <PostReplyButton onClick={postReply}>Post Reply</PostReplyButton>
            </ReplySection>
            <RepliesContainer>{repliesElements}</RepliesContainer>
          </CommentContainer>
          {index + 1 !== comments.length && <Divider />}
        </div>
      );
    });
  }

  return (
    <Container>
      {/* Go Back/Edit Buttons */}
      <ButtonContainer>
        <BackButton onClick={goBack}>
          <StyledIcon src={LeftArrow} />
          Go Back
        </BackButton>
        <EditButton to={`/edit/${id}`}>Edit Feedback</EditButton>
      </ButtonContainer>

      {/* Originial Post */}
      <FeedbackContainer>
        <TextContainer>
          <div>
            <Title pb="0.5rem">{title}</Title>
            <Description pb="0.5rem">{description}</Description>
            <FilterText disabled={true}>
              {category
                ? category.charAt(0).toUpperCase() + category.slice(1)
                : null}
            </FilterText>
          </div>
          <ButtonContainer pt={"1rem"}>
            <CommentDisplay
              style={
                getTotalComments(comments) === 0 ? { opacity: "0.5" } : null
              }
            >
              <StyledIcon src={CommentIcon} />
              {getTotalComments(comments)}
            </CommentDisplay>
          </ButtonContainer>
        </TextContainer>
        <UpvoteButton
          onClick={handleUpvote}
          style={upvoted ? activeUpvote : null}
        >
          <StyledIcon src={UpArrowIcon} style={upvoted ? activeFilter : null} />
          {upvotes}
        </UpvoteButton>
      </FeedbackContainer>

      {/* Comments Section */}
      <CommentsSection>
        <Heading>{getTotalComments(comments)} Comments</Heading>
        {commentElements}
      </CommentsSection>

      {/* Add Comment Section */}
      <ContentContainer>
        <Heading>Add Comment</Heading>
        <CommentBox
          id="new-comment"
          placeholder="Type your comment here"
          maxLength={"250"}
          cols="10"
          rows="3"
          onChange={() => handleCommentChange()}
        />
        <ButtonContainer>
          <CharacterCount>{commentLength} characters left</CharacterCount>
          <AddButton onClick={postComment}>Post Comment</AddButton>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
};

export default FeedbackDetail;
