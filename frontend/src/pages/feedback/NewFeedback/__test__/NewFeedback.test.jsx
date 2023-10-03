import { render, screen, act } from "@testing-library/react";
import NewFeedback from "../NewFeedback";
import { BrowserRouter } from "react-router-dom";
import { GlobalContext } from "../../../../App/App";
import userEvent from "@testing-library/user-event";

const MockNewFeedback = () => {
  const setRefreshCount = vitest.fn();

  return (
    <GlobalContext.Provider value={{ setRefreshCount }}>
      <BrowserRouter>
        <NewFeedback />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

globalThis.fetch = vi.fn();

globalThis.onerror = function(message, source, lineno, colno, error) {
  console.error(`Unhandled Rejection: ${message}`);
  if (error) {
    console.error(error.stack);
  }
};

describe("New Feedback page", () => {
  it("should navigate back to root path", async () => {
    const user = userEvent.setup();
    render(<MockNewFeedback />);
    const backButton = screen.getByTestId("back-button");
    await user.click(backButton);
    expect(window.location.pathname).toBe("/");
  });

  it("should recieve 200 response after post request", async () => {
    const user = userEvent.setup();
    render(<MockNewFeedback />);
    const addButton = screen.getByTestId("add-button");
    const title = screen.getByTestId("title");
    const desc = screen.getByTestId("desc");

    fetch.mockResolvedValueOnce({
      ok: true,
    });

    await act(async () => {
      await user.type(title, "Testing");
      await user.type(desc, "Test description");
      await user.click(addButton);
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://3.135.141.179:27017/api/feedback/",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          title: "Testing",
          description: "Test description",
          category: "feature",
          upvotes: 0,
          upvoted: false,
          status: "suggestion",
          comments: [],
        }),
      }
    );
  });

  it("should handle error when posting feedback", async () => {
    const user = userEvent.setup();
    render(<MockNewFeedback />);
    const addButton = screen.getByText(/add feedback/i);
    const title = screen.getByTestId("title");
    const desc = screen.getByTestId("desc");

    fetch = vi.fn(() => {
      return Promise.reject(new Error("HTTP Error!"));
    });

    await user.type(title, "test title");
    await user.type(desc, "test desc");
    await user.click(addButton);

    expect(fetch).toBeCalledWith("http://3.135.141.179:27017/api/feedback/", {
      body: JSON.stringify({
        title: "test title",
        description: "test desc",
        category: "feature",
        upvotes: 0,
        upvoted: false,
        status: "suggestion",
        comments: [],
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  });

  it("should navigate back to home when cancel button click", async () => {
    const user = userEvent.setup();
    render(<MockNewFeedback />);
    const cancelButton = screen.getByTestId("cancel-button");
    await user.click(cancelButton);
    expect(window.location.pathname).toBe("/");
  });

  it("should open dropdown menu", async () => {
    const user = userEvent.setup();
    render(<MockNewFeedback />);
    const dropDown = screen.getByTestId("dropdown");
    await user.click(dropDown);
    expect(dropDown.id).toBe("open");
  });

  it("should change arrow to opposite side", async () => {
    const user = userEvent.setup();
    render(<MockNewFeedback />);
    const dropDown = screen.getByTestId("dropdown");
    const arrowImg = screen.getByTestId("arrow");
    await user.click(dropDown);
    expect(arrowImg.id).toBe("uparrow");
  });

  it("should change category to feature", async () => {
    const user = userEvent.setup();
    render(<MockNewFeedback />);
    const dropDown = screen.getByTestId("dropdown");
    await act(async () => {
      await user.click(dropDown);
    });

    const liElement = screen.getByTestId("feature-item");
    await act(async () => {
      await user.click(liElement);
    });

    await screen.findByText(/feature/i);
    await user.click(dropDown);

    const updatedLiElement = screen.getByTestId("feature-item");
    expect(updatedLiElement.id).toBe("active");
  });

  it("should change category to UI", async () => {
    const user = userEvent.setup();
    render(<MockNewFeedback />);
    const dropDown = screen.getByTestId("dropdown");
    await act(async () => {
      await user.click(dropDown);
    });

    const liElement = screen.getByText(/ui/i);
    await act(async () => {
      await user.click(liElement);
    });

    await screen.findByText(/ui/i);
    await user.click(dropDown);

    const updatedLiElement = screen.getByTestId("ui-item");
    expect(updatedLiElement.id).toBe("active");
  });

  it("should change category to ux", async () => {
    const user = userEvent.setup();
    render(<MockNewFeedback />);
    const dropDown = screen.getByTestId("dropdown");
    await act(async () => {
      await user.click(dropDown);
    });

    const liElement = screen.getByText(/ux/i);
    await act(async () => {
      await user.click(liElement);
    });

    await screen.findByText(/ux/i);
    await user.click(dropDown);

    const updatedLiElement = screen.getByTestId("ux-item");
    expect(updatedLiElement.id).toBe("active");
  });

  it("should change category to enhancement", async () => {
    const user = userEvent.setup();
    render(<MockNewFeedback />);
    const dropDown = screen.getByTestId("dropdown");
    await act(async () => {
      await user.click(dropDown);
    });

    const liElement = screen.getByText(/enhancement/i);
    await act(async () => {
      await user.click(liElement);
    });

    await screen.findByText(/enhancement/i);
    await user.click(dropDown);

    const updatedLiElement = screen.getByTestId("enhancement-item");
    expect(updatedLiElement.id).toBe("active");
  });

  it("should change category to bug", async () => {
    const user = userEvent.setup();
    render(<MockNewFeedback />);
    const dropDown = screen.getByTestId("dropdown");
    await act(async () => {
      await user.click(dropDown);
    });

    const liElement = screen.getByText(/bug/i);
    await act(async () => {
      await user.click(liElement);
    });

    await screen.findByText(/bug/i);
    await user.click(dropDown);

    const updatedLiElement = screen.getByTestId("bug-item");
    expect(updatedLiElement.id).toBe("active");
  });
});

afterAll(() => {
  globalThis.onerror = null;
});
