import { render, screen } from "@testing-library/react";
import FeedbackDetail from "../FeedbackDetail";
import { GlobalContext } from "../../../../App/App";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

const MockFeedbackDetail = () => {
  const [refreshCount, setRefreshCount] = useState(0);
  const id = "64c870dbedb470fd5dce61f2";

  return (
    <GlobalContext.Provider value={{ refreshCount, setRefreshCount }}>
      <MemoryRouter initialEntries={[`/${id}`]}>
        <Routes>
          <Route path="/:id" element={<FeedbackDetail />} />
        </Routes>
      </MemoryRouter>
    </GlobalContext.Provider>
  );
};

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useParams: () => ({
    id: "64c870dbedb470fd5dce61f2",
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    NavLink: "a",
  };
});

vi.mock("nanoid", () => ({
  nanoid: vi.fn(() => "mocked-comment-id"), // Use a specific ID here
}));

describe("Feedback Detail page", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            _id: "64c870dbedb470fd5dce61f2",
            id: 3,
            title: "Q&A within the challenge hubs",
            category: "feature",
            upvotes: 65,
            status: "suggestion",
            description:
              "Challenge-specific Q&A would make for easy reference.",
            comments: [
              {
                id: 5,
                content:
                  "Much easier to get answers from devs who can relate, since they've either finished the challenge themselves or are in the middle of it.",
                user: {
                  image: "./assets/user-images/image-george.jpg",
                  name: "George Partridge",
                  username: "soccerviewer8",
                },
                replies: [
                  {
                    content:
                      "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
                    replyingTo: "soccerviewer8",
                    user: {
                      image: "./assets/user-images/image-anne.jpg",
                      name: "Anne Valentine",
                      username: "annev1990",
                    },
                  },
                ],
              },
            ],
            upvoted: false,
            updatedAt: {
              $date: "2023-09-06T18:27:14.339Z",
            },
          }),
      })
    );
  });

  it("should render detail page", async () => {
    const user = userEvent.setup();
    render(<MockFeedbackDetail />);
    const backButton = screen.getByRole("button", { name: /go back/i });
    await user.click(backButton);
    expect(window.location.pathname).toBe("/");
  });

  it("should change value of comment box when typed", async () => {
    const user = userEvent.setup();
    render(<MockFeedbackDetail />);
    const commentBox = screen.getByRole("textbox");
    await user.type(commentBox, "Hello");
    expect(commentBox.value).toBe("Hello");
  });

  it("should display reply section to comments", async () => {
    const user = userEvent.setup();
    render(<MockFeedbackDetail />);
    // rerenders page for comments to be grabbed
    const commentBox = screen.getByRole("textbox");
    await user.type(commentBox, "Hello");
    const replyButton = screen.getByTestId("comment-0");
    await user.click(replyButton);
    expect(screen.getByTestId("post-reply-0")).toBeInTheDocument();
  });

  it("should unsuccessfully send patch request", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockFeedbackDetail />);
    });

    const upvoteButton = screen.getByAltText(/upvote button/i);

    fetch = vi.fn(() => {
      return Promise.reject(new Error("HTTP error"));
    });

    await user.click(upvoteButton);

    expect(fetch).toHaveBeenCalledWith(
      "http://3.135.141.179:27017/api/feedback/64c870dbedb470fd5dce61f2",
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upvotes: 66,
          upvoted: true,
        }),
      }
    );
  });

  it("should successfully post comment", async () => {
    const user = userEvent.setup();
    render(<MockFeedbackDetail />);
    const commentBox = screen.getByPlaceholderText(/type your comment here/i);
    const commentButton = screen.getByRole("button", { name: /post comment/i });

    fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    await user.type(commentBox, "test comment");
    await user.click(commentButton);

    expect(fetch).toHaveBeenCalledWith(
      "http://3.135.141.179:27017/api/feedback/64c870dbedb470fd5dce61f2",
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          comments: [
            {
              id: 5,
              content:
                "Much easier to get answers from devs who can relate, since they've either finished the challenge themselves or are in the middle of it.",
              user: {
                image: "./assets/user-images/image-george.jpg",
                name: "George Partridge",
                username: "soccerviewer8",
              },
              replies: [
                {
                  content:
                    "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
                  replyingTo: "soccerviewer8",
                  user: {
                    image: "./assets/user-images/image-anne.jpg",
                    name: "Anne Valentine",
                    username: "annev1990",
                  },
                },
              ],
            },
            {
              id: "mocked-comment-id",
              content: "test comment",
              user: {
                image: "./assets/user-images/kd_faceshot.jpeg",
                name: "Kenny Duong",
                username: "kdtheegreat",
              },
              replies: [],
            },
          ],
        }),
      }
    );
  });

  it("should successfully post reply", async () => {
    const user = userEvent.setup();
    render(<MockFeedbackDetail />);
    // types in comment box to update state and laod data
    const commentBox = screen.getByPlaceholderText(/type your comment here/i);
    await user.type(commentBox, "i");
    const replyButton = screen.getByTestId("comment-0");
    await user.click(replyButton);
    const replyBox = screen.getByTestId("reply-box-0");
    const postReplyButton = screen.getByTestId("post-reply-0");

    fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    await user.type(replyBox, "test reply");
    await user.click(postReplyButton);

    expect(fetch).toHaveBeenCalledWith(
      "http://3.135.141.179:27017/api/feedback/64c870dbedb470fd5dce61f2",
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          comments: [
            {
              id: 5,
              content:
                "Much easier to get answers from devs who can relate, since they've either finished the challenge themselves or are in the middle of it.",
              user: {
                image: "./assets/user-images/image-george.jpg",
                name: "George Partridge",
                username: "soccerviewer8",
              },
              replies: [
                {
                  content:
                    "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
                  replyingTo: "soccerviewer8",
                  user: {
                    image: "./assets/user-images/image-anne.jpg",
                    name: "Anne Valentine",
                    username: "annev1990",
                  },
                },
                {
                  content: "test reply",
                  replyingTo: "soccerviewer8",
                  user: {
                    image: "./assets/user-images/kd_faceshot.jpeg",
                    name: "Kenny Duong",
                    username: "kdtheegreat",
                  },
                  id: "mocked-comment-id",
                },
              ],
            },
          ],
        }),
      }
    );
  });
});
