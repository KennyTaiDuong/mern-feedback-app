import { render, screen } from "@testing-library/react";
import EditFeedback from "../EditFeedback";
import { GlobalContext } from "../../../../App/App";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const MockEditFeedback = () => {
  const setRefreshCount = vitest.fn();
  const id = "64c870dbedb470fd5dce61f2";

  return (
    <GlobalContext.Provider value={{ setRefreshCount }}>
      <MemoryRouter initialEntries={[`/edit/${id}`]}>
        <Routes>
          <Route path="/edit/:id" element={<EditFeedback />} />
        </Routes>
      </MemoryRouter>
    </GlobalContext.Provider>
  );
};

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
        description: "Challenge-specific Q&A would make for easy reference.",
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
          },
        ],
        upvoted: false,
        updatedAt: {
          $date: "2023-09-06T18:27:14.339Z",
        },
      }),
  })
);

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

describe("Edit Feedback page", () => {
  it("should fetch data", async () => {
    await act(async () => {
      render(<MockEditFeedback />);
    });
    expect(fetch).toHaveBeenCalledWith(
      "http://3.135.141.179:27017/api/feedback/64c870dbedb470fd5dce61f2"
    );
  });

  it("Should navigate to root path", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const backButton = screen.getByRole("button", { name: "Go Back" });
    await user.click(backButton);
    expect(window.location.pathname).toBe("/");
  });

  it("should change content of title textarea", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const textArea = screen.getByTestId("title-textarea");

    await user.type(textArea, " Test");

    expect(textArea.value).toBe("Q&A within the challenge hubs Test");
  });

  it("should change content of desc textarea", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const textArea = screen.getByTestId("desc-textarea");

    await user.clear(textArea);
    await user.type(textArea, "Test");

    expect(textArea.value).toBe("Test");
  });

  it("should open category dropdown", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const dropDown = screen.getByTestId("category-dropdown");
    await user.click(dropDown);

    expect(screen.getByTestId("category-1")).toBeInTheDocument();
    expect(screen.getByTestId("category-2")).toBeInTheDocument();
    expect(screen.getByTestId("category-3")).toBeInTheDocument();
    expect(screen.getByTestId("category-4")).toBeInTheDocument();
    expect(screen.getByTestId("category-5")).toBeInTheDocument();
  });

  it("should change category to Feature", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const dropDown = screen.getByTestId("category-dropdown");
    await user.click(dropDown);
    const itemElement = screen.getByTestId("category-1");
    expect(screen.getByAltText("check icon")).toBeInTheDocument();
    await user.click(itemElement);
    await user.click(dropDown);
    expect(screen.getByAltText("check icon").id).toBe("feature");
    await user.click(dropDown);
    expect(dropDown.textContent).toBe("Feature");
  });

  it("should change category to UI", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const dropDown = screen.getByTestId("category-dropdown");
    await user.click(dropDown);
    const itemElement = screen.getByTestId("category-2");
    expect(screen.getByAltText("check icon")).toBeInTheDocument();
    await user.click(itemElement);
    await user.click(dropDown);
    expect(screen.getByAltText("check icon").id).toBe("ui");
    await user.click(dropDown);

    expect(dropDown.textContent).toBe("UI");
  });

  it("should change category to UX", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const dropDown = screen.getByTestId("category-dropdown");
    await user.click(dropDown);
    const itemElement = screen.getByTestId("category-3");
    expect(screen.getByAltText("check icon")).toBeInTheDocument();
    await user.click(itemElement);
    await user.click(dropDown);
    expect(screen.getByAltText("check icon").id).toBe("ux");
    await user.click(dropDown);
    expect(dropDown.textContent).toBe("UX");
  });

  it("should change category to Enhancement", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const dropDown = screen.getByTestId("category-dropdown");
    await user.click(dropDown);
    const itemElement = screen.getByTestId("category-4");
    expect(screen.getByAltText("check icon")).toBeInTheDocument();
    await user.click(itemElement);
    await user.click(dropDown);
    expect(screen.getByAltText("check icon").id).toBe("enhancement");
    await user.click(dropDown);
    expect(dropDown.textContent).toBe("Enhancement");
  });

  it("should change category to Bug", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const dropDown = screen.getByTestId("category-dropdown");
    await user.click(dropDown);
    const itemElement = screen.getByTestId("category-5");
    expect(screen.getByAltText("check icon")).toBeInTheDocument();
    await user.click(itemElement);
    await user.click(dropDown);
    expect(screen.getByAltText("check icon").id).toBe("bug");
    await user.click(dropDown);
    expect(dropDown.textContent).toBe("Bug");
  });

  it("should open status dropdown", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const dropDown = screen.getByTestId("status-dropdown");
    await user.click(dropDown);
    expect(screen.getByTestId("status-1")).toBeInTheDocument();
    expect(screen.getByTestId("status-2")).toBeInTheDocument();
    expect(screen.getByTestId("status-3")).toBeInTheDocument();
    expect(screen.getByTestId("status-4")).toBeInTheDocument();
  });

  it("should change status to Suggestion", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const dropDown = screen.getByTestId("status-dropdown");
    await user.click(dropDown);
    const itemElement = screen.getByTestId("status-1");
    await user.click(itemElement);
    await user.click(dropDown);
    expect(screen.getByAltText("check icon").id).toBe("suggestion");
    await user.click(dropDown);
    expect(dropDown.textContent).toBe("Suggestion");
  });

  it("should change status to Planned", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const dropDown = screen.getByTestId("status-dropdown");
    await user.click(dropDown);
    const itemElement = screen.getByTestId("status-2");
    await user.click(itemElement);
    await user.click(dropDown);
    expect(screen.getByAltText("check icon").id).toBe("planned");
    await user.click(dropDown);
    expect(dropDown.textContent).toBe("Planned");
  });

  it("should change status to In-Progress", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const dropDown = screen.getByTestId("status-dropdown");
    await user.click(dropDown);
    const itemElement = screen.getByTestId("status-3");
    await user.click(itemElement);
    await user.click(dropDown);
    expect(screen.getByAltText("check icon").id).toBe("progress");
    await user.click(dropDown);
    expect(dropDown.textContent).toBe("In-Progress");
  });

  it("should change status to Live", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const dropDown = screen.getByTestId("status-dropdown");
    await user.click(dropDown);
    const itemElement = screen.getByTestId("status-4");
    await user.click(itemElement);
    await user.click(dropDown);
    expect(screen.getByAltText("check icon").id).toBe("live");
    await user.click(dropDown);
    expect(dropDown.textContent).toBe("Live");
  });

  it("should send successful delete request", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });

    fetch = vi.fn(() => {
      Promise.resolve({
        ok: true,
        method: "DELETE",
      });
    });

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    expect(fetch).toHaveBeenCalledWith(
      "http://3.135.141.179:27017/api/feedback/64c870dbedb470fd5dce61f2",
      {
        method: "DELETE",
      }
    );
  });

  it("should send unsuccessful delete request", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });

    fetch = vi.fn(() => {
      return Promise.reject(new Error("HTTP error"));
    });

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    await user.click(deleteButton);

    expect(fetch).toHaveBeenCalledWith(
      "http://3.135.141.179:27017/api/feedback/undefined",
      {
        method: "DELETE",
      }
    );
  });

  it("should send successful patch request to save changes", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const updateButton = screen.getByRole("button", { name: /save changes/i });

    fetch = vi.fn(() => {
      Promise.resolve({
        ok: true,
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          _id: "64c870dbedb470fd5dce61f2",
          id: 3,
          title: "Testing patch request",
          category: "feature",
          upvotes: 65,
          status: "suggestion",
          description: "New test description",
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
            },
          ],
          upvoted: false,
          updatedAt: {
            $date: "2023-09-06T18:27:14.339Z",
          },
        }),
      });
    });

    await user.click(updateButton);
    expect(fetch).toHaveBeenCalledWith(
      "http://3.135.141.179:27017/api/feedback/64c870dbedb470fd5dce61f2",
      {
        method: "PATCH",
        body: JSON.stringify({}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("should send unsuccessful patch request when saving changes", async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<MockEditFeedback />);
    });
    const updateButton = screen.getByRole("button", { name: /save changes/i });

    fetch = vi.fn(() => {
      return Promise.reject(new Error("HTTP error"));
    });

    await user.click(updateButton);
    expect(fetch).toHaveBeenCalledWith(
      "http://3.135.141.179:27017/api/feedback/64c870dbedb470fd5dce61f2",
      {
        method: "PATCH",
        body: JSON.stringify({}),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  });
});
