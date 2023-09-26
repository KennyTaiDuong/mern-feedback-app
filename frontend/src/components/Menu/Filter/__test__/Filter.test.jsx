import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vitest } from "vitest";

import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import Filter from "../Filter";
import { GlobalContext } from "../../../../App/App";

const MockFilter = () => {
  const [filter, setFilter] = useState("All");
  const setRefreshCount = vitest.fn();
  const setSort = vitest.fn();

  return (
    <GlobalContext.Provider
      value={{ filter, setFilter, setRefreshCount, setSort }}
    >
      <BrowserRouter>
        <Filter />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

describe("Filter Component", () => {
  it("should render 6 buttons", () => {
    render(<MockFilter />);
    const allButtons = screen.getAllByRole("button");
    expect(allButtons.length).toBe(6);
  });

  it("should have selected 'All' on render", async () => {
    render(<MockFilter />);
    const allButton = screen.getByRole("button", { name: /all/i });
    expect(allButton.id).toBe("selected");
  });

  it("should select 'All' on click", async () => {
    const user = userEvent.setup();
    render(<MockFilter />);
    const allButton = screen.getByRole("button", { name: /all/i });
    await user.click(allButton);
    expect(allButton.id).toBe("selected");
  });

  it("should select 'UI' on click", async () => {
    const user = userEvent.setup();
    render(<MockFilter />);
    const uiButton = screen.getByRole("button", { name: /ui/i });
    await user.click(uiButton);
    expect(uiButton.id).toBe("selected");
  });

  it("should select 'UX' on click", async () => {
    const user = userEvent.setup();
    render(<MockFilter />);
    const uxButton = screen.getByRole("button", { name: /ux/i });
    await user.click(uxButton);
    expect(uxButton.id).toBe("selected");
  });

  it("should select 'Enhancement' on click", async () => {
    const user = userEvent.setup();
    render(<MockFilter />);
    const enhancementButton = screen.getByRole("button", {
      name: /enhancement/i,
    });
    await user.click(enhancementButton);
    expect(enhancementButton.id).toBe("selected");
  });

  it("should select 'Bug' on click", async () => {
    const user = userEvent.setup();
    render(<MockFilter />);
    const bugButton = screen.getByRole("button", { name: /bug/i });
    await user.click(bugButton);
    expect(bugButton.id).toBe("selected");
  });

  it("should select 'Feature' on click", async () => {
    const user = userEvent.setup();
    render(<MockFilter />);
    const featureButton = screen.getByRole("button", { name: /feature/i });
    await user.click(featureButton);
    expect(featureButton.id).toBe("selected");
  });
});
