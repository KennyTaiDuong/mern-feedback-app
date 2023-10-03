import { render, screen } from "@testing-library/react";
import Roadmap from "../Roadmap";
import { BrowserRouter } from "react-router-dom";
import { GlobalContext } from "../../../App/App";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

const MockRoadmap = ({ plannedItem, liveItem, progressItem }) => {
  const plannedArray = [plannedItem];
  const liveArray = [liveItem];
  const progressArray = [progressItem];
  const [allFeedback, setAllFeedback] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ plannedArray, progressArray, liveArray, allFeedback }}
    >
      <BrowserRouter>
        <Roadmap />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

describe("Roadmap page", () => {
  it("should navigate to root path", async () => {
    const user = userEvent.setup();
    render(<MockRoadmap />);
    const buttonElement = screen.getByRole("button", { name: "Go Back" });
    await user.click(buttonElement);
    expect(window.location.pathname).toBe("/");
  });

  it("should navigate to add feedback page", async () => {
    const user = userEvent.setup();
    render(<MockRoadmap />);
    const buttonElement = screen.getByRole("button", {
      name: "+ Add Feedback",
    });
    await user.click(buttonElement);
    expect(window.location.pathname).toBe("/newfeedback");
  });

  it("should navigate to detail", async () => {
    const user = userEvent.setup();
    render(<MockRoadmap />);
    const navElement = screen.getByTestId("nav-item-1");
    await user.click(navElement);
    expect(navElement.id).toBe("active");
  });

  it("should navigate to detail", async () => {
    const user = userEvent.setup();
    render(<MockRoadmap />);
    const navElement = screen.getByTestId("nav-item-2");
    await user.click(navElement);
    expect(navElement.id).toBe("active");
  });

  it("should navigate to detail", async () => {
    const user = userEvent.setup();
    render(<MockRoadmap />);
    const navElement = screen.getByTestId("nav-item-3");
    await user.click(navElement);
    expect(navElement.id).toBe("active");
  });
});
