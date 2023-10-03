import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

describe("App component", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              _id: "64c870dbedb470fd5dce61f5",
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
              upvoted: false,
            },
            {
              _id: "64c870dbedb470fd5dce61fa",
              id: 11,
              title: "Animated solution screenshots",
              category: "enhancement",
              upvotes: 9,
              status: "in-progress",
              description:
                "Screenshots of solutions with animations don’t display correctly.",
              upvoted: false,
              updatedAt: {
                $date: "2023-09-08T20:40:17.127Z",
              },
              comments: [],
            },
          ]),
      })
    );
  });

  it("should render App component", async () => {
    await act(async () => {
      render(<App />);
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://3.135.141.179:27017/api/feedback"
    );
  });

  it("should render mocked data", async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText(/preview images not loading/i)).toBeInTheDocument();
  });

  it("should have no feedbacks when ui filter clicked", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<App />);
    });
    await user.click(screen.getByRole("button", { name: /ui/i }));

    expect(screen.getByText(/there is no feedback yet/i)).toBeInTheDocument();
  });

  it("should have no feedbacks when ux filter clicked", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<App />);
    });
    await user.click(screen.getByRole("button", { name: /ux/i }));

    expect(screen.getByText(/there is no feedback yet/i)).toBeInTheDocument();
  });

  it("should have one feedback for when enhancement fliter clicked", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<App />);
    });
    await user.click(screen.getByRole("button", { name: /enhancement/i }));

    expect(
      screen.getByText(/animated solution screenshots/i)
    ).toBeInTheDocument();
  });

  it("should have no feedbacks when bug filter clicked", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<App />);
    });
    await user.click(screen.getByRole("button", { name: /bug/i }));

    expect(screen.getByText(/preview images not loading/i)).toBeInTheDocument();
  });

  it("should have no feedbacks when feature filter clicked", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<App />);
    });
    await user.click(screen.getByRole("button", { name: /feature/i }));

    expect(screen.getByText(/there is no feedback yet/i)).toBeInTheDocument();
  });

  it("should handle rejected fetch", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await act(async () => {
      render(<App />);
    });

    expect(screen.getByText(/there is no feedback yet/i)).toBeInTheDocument();
  });
});
