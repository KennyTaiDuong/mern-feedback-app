import { render, screen, waitFor } from "@testing-library/react";
import SortBar from "../SortBar";
import { GlobalContext } from "../../../../App/App";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

const MockSortBar = ({ suggestionArray }) => {
  const [sort, setSort] = useState("Most Upvotes");
  const feedbackArray = [];
  const setFeedbackArray = vitest.fn();

  return (
    <GlobalContext.Provider
      value={{
        sort,
        setSort,
        feedbackArray,
        setFeedbackArray,
        suggestionArray,
      }}
    >
      <BrowserRouter>
        <SortBar />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

describe("SortBar Component", () => {
  it("should render component", () => {
    render(<MockSortBar suggestionArray={[]} />);
  });

  it("should display '0 Suggestions'", () => {
    render(<MockSortBar suggestionArray={[]} />);
    const textElement = screen.getByTestId("suggestions-count");
    expect(textElement.textContent).toBe("0 Suggestions");
    expect(textElement.textContent).not.toBe("5 Suggestions");
  });

  it("should display '1 Suggestion'", () => {
    render(<MockSortBar suggestionArray={[{ mockObj: true }]} />);
    const textElement = screen.getByTestId("suggestions-count");
    expect(textElement.textContent).toBe("1 Suggestion");
    expect(textElement).not.toBe("1 Suggestions");
  });

  it("should open dropdown menu", async () => {
    const user = userEvent.setup();
    render(<MockSortBar suggestionArray={[]} />);
    const sortContainer = screen.getByTestId("sort-container");
    const dropdownContainer = screen.getByTestId("dropdown-container");
    await user.click(sortContainer);
    expect(dropdownContainer).toHaveStyle("display: block");
  });

  it("should close dropdown menu", async () => {
    const user = userEvent.setup();
    render(<MockSortBar suggestionArray={[]} />);
    const sortContainer = screen.getByTestId("sort-container");
    const dropdownContainer = screen.getByTestId("dropdown-container");
    await user.click(sortContainer);
    await user.click(sortContainer);
    expect(dropdownContainer).toHaveStyle("display: none");
  });

  it("should change sort to 'Most Upvotes'", async () => {
    const user = userEvent.setup();
    render(<MockSortBar suggestionArray={[]} />);
    const sortText = screen.getByTestId("sort-text");
    const liElement = screen.getByTestId("item-1");
    await user.click(sortText);
    await user.click(liElement);
    expect(sortText.textContent).toBe("Most Upvotes");
  });

  it("should change sort to 'Least Upvotes'", async () => {
    const user = userEvent.setup();
    render(<MockSortBar suggestionArray={[]} />);
    const sortText = screen.getByTestId("sort-text");
    const liElement = screen.getByTestId("item-2");
    await user.click(sortText);
    await user.click(liElement);
    expect(sortText.textContent).toBe("Least Upvotes");
  });

  it("should change sort to 'Most Comments'", async () => {
    const user = userEvent.setup();
    render(
      <MockSortBar
        suggestionArray={[
          {
            _id: {
              $oid: "64c870dbedb470fd5dce61f5",
            },
            id: 6,
            title: "Preview images not loading",
            category: "bug",
            upvotes: 5,
            status: "suggestion",
            description:
              "Challenge preview images are missing when you apply a filter.",
            updatedAt: {
              $date: "2023-09-08T20:39:59.678Z",
            },
            comments: [],
            upvoted: true,
          },
          {
            _id: {
              $oid: "64c870dbedb470fd5dce61f0",
            },
            id: 1,
            title: "Add tags for solutions",
            category: "enhancement",
            upvotes: 115,
            status: "suggestion",
            description:
              "Easier to search for solutions based on a specific stack.",
            comments: [
              {
                id: 1,
                content:
                  "Awesome idea! Trying to find framework-specific projects within the hubs can be tedious",
                user: {
                  image: "./assets/user-images/image-suzanne.jpg",
                  name: "Suzanne Chang",
                  username: "upbeat1811",
                },
              },
              {
                id: 2,
                content:
                  "Please use fun, color-coded labels to easily identify them at a glance",
                user: {
                  image: "./assets/user-images/image-thomas.jpg",
                  name: "Thomas Hood",
                  username: "brawnybrave",
                },
              },
              {
                id: "nbl2vyNY7n-1KkRt-Qmu6",
                content: "Boo",
                user: {
                  image: "./assets/user-images/kd_faceshot.jpeg",
                  name: "Kenny Duong",
                  username: "kdtheegreat",
                },
                replies: [],
              },
            ],
            updatedAt: {
              $date: "2023-10-02T03:48:09.015Z",
            },
            upvoted: false,
          },
        ]}
      />
    );
    const sortText = screen.getByTestId("sort-text");
    const liElement = screen.getByTestId("item-3");
    await waitFor(async () => {
      await user.click(sortText);
      await user.click(liElement);
    });
    expect(sortText.textContent).toBe("Most Comments");
  });

  it("should change sort to 'Least Comments'", async () => {
    const user = userEvent.setup();
    render(
      <MockSortBar
        suggestionArray={[
          {
            _id: "64c870dbedb470fd5dce61f6",
            id: 7,
            title: "More comprehensive reports",
            category: "feature",
            upvotes: 143,
            status: "planned",
            description:
              "It would be great to see a more detailed breakdown of solutions.",
            comments: [
              {
                id: 10,
                content:
                  "This would be awesome! It would be so helpful to see an overview of my code in a way that makes it easy to spot where things could be improved.",
                user: {
                  image: "./assets/user-images/image-victoria.jpg",
                  name: "Victoria Mejia",
                  username: "arlen_the_marlin",
                },
                replies: [
                  {
                    content: "B",
                    replyingTo: "arlen_the_marlin",
                    user: {
                      image: "./assets/user-images/kd_faceshot.jpeg",
                      name: "Kenny Duong",
                      username: "kdtheegreat",
                    },
                  },
                ],
              },
              {
                id: 11,
                content:
                  "Yeah, this would be really good. I'd love to see deeper insights into my code!",
                user: {
                  image: "./assets/user-images/image-jackson.jpg",
                  name: "Jackson Barker",
                  username: "countryspirit",
                },
              },
              {
                id: "arfDcjNNvH7av-FA14446",
                content: "Ter",
                user: {
                  image: "./assets/user-images/kd_faceshot.jpeg",
                  name: "Kenny Duong",
                  username: "kdtheegreat",
                },
                replies: [
                  {
                    content: "H",
                    replyingTo: "kdtheegreat",
                    user: {
                      image: "./assets/user-images/kd_faceshot.jpeg",
                      name: "Kenny Duong",
                      username: "kdtheegreat",
                    },
                  },
                ],
              },
              {
                id: "tzDTLXa8LuGTtZplBqEyE",
                content: "Terrific",
                user: {
                  image: "./assets/user-images/kd_faceshot.jpeg",
                  name: "Kenny Duong",
                  username: "kdtheegreat",
                },
                replies: [
                  {
                    content: "H",
                    replyingTo: "kdtheegreat",
                    user: {
                      image: "./assets/user-images/kd_faceshot.jpeg",
                      name: "Kenny Duong",
                      username: "kdtheegreat",
                    },
                  },
                ],
              },
            ],
            updatedAt: "2023-09-21T01:04:28.750Z",
            upvoted: true,
          },
        ]}
      />
    );
    const sortText = screen.getByTestId("sort-text");
    const liElement = screen.getByTestId("item-4");
    await user.click(sortText);
    await user.click(liElement);
    expect()
    expect(sortText.textContent).toBe("Least Comments");
  });
});
