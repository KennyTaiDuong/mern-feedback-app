import { fireEvent, render, screen } from "@testing-library/react";
import Sidebar from "../Sidebar";
import { GlobalContext } from "../../../../App/App";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { vitest } from "vitest";

const MockSidebar = ({ setIsOpen }) => {
  const isOpen = false;

  return (
    <GlobalContext.Provider value={{ isOpen, setIsOpen }}>
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

describe("Sidebar Component", () => {
  it("should render sidebar", () => {
    const setIsOpen = vitest.fn();
    render(<MockSidebar setIsOpen={setIsOpen} />);
  });

  it("should call setIsOpen", async () => {
    const user = userEvent.setup();
    const setIsOpen = vitest.fn();
    render(<MockSidebar setIsOpen={setIsOpen} />);
    const darkBgElement = screen.getByTestId("dark-bg");
    await user.click(darkBgElement);
    expect(setIsOpen).toBeCalled();
  });
});
