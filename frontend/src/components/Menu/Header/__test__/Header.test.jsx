// Testing-Library imports
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// React imports
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

// Component Imports
import Header from "../Header";
import { GlobalContext } from "../../../../App/App";

const MockHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GlobalContext.Provider value={{ isOpen, setIsOpen }}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

describe("Header Component", () => {
  it("initial render should be hamburger-icon", async () => {
    render(<MockHeader />);
    const imgElement = screen.getByRole("img");
    expect(imgElement.id).toBe("hamburger-icon");
  });

  it("the first click on icon should change to x-icon", async () => {
    const user = userEvent.setup();
    render(<MockHeader />);
    const imgElement = screen.getByRole("img");
    await user.click(imgElement);
    expect(imgElement.id).toBe("x-icon");
  });

  it("two clicks on icon should change back to hamburger-icon", async () => {
    const user = userEvent.setup();
    render(<MockHeader />);
    const imgElement = screen.getByRole("img");
    await user.click(imgElement);
    await user.click(imgElement);
    expect(imgElement.id).toBe("hamburger-icon");
  });
});
