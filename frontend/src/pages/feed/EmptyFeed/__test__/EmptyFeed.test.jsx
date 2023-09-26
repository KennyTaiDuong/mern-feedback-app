import { render, screen } from "@testing-library/react";
import EmptyFeed from "../EmptyFeed";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const MockEmptyFeed = () => {
  return (
    <BrowserRouter>
      <EmptyFeed />
    </BrowserRouter>
  );
};

describe("Empty Feed page", () => {
  it("should navigate to '/newfeedback'", async () => {
    const user = userEvent.setup();
    render(<MockEmptyFeed />);
    const buttonElement = screen.getByRole("button", {
      name: "+ Add Feedback",
    });
    await user.click(buttonElement);
    expect(window.location.pathname).toBe("/newfeedback");
  });
});
