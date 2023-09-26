import { render, screen } from "@testing-library/react";
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
    render(<MockSortBar suggestionArray={[]} />);
    const sortText = screen.getByTestId("sort-text");
    const liElement = screen.getByTestId("item-3");
    await user.click(sortText);
    await user.click(liElement);
    expect(sortText.textContent).toBe("Most Comments");
  });

  it("should change sort to 'Least Comments'", async () => {
    const user = userEvent.setup();
    render(<MockSortBar suggestionArray={[]} />);
    const sortText = screen.getByTestId("sort-text");
    const liElement = screen.getByTestId("item-4");
    await user.click(sortText);
    await user.click(liElement);
    expect(sortText.textContent).toBe("Least Comments");
  });
});
