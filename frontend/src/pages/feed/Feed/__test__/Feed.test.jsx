import { render, screen } from "@testing-library/react";
import Feed from "../Feed";
import { GlobalContext } from "../../../../App/App";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";

const MockFeed = () => {
  const [feedbackArray, setFeedbackArray] = useState([]);
  const [suggestionArray, setSuggestionArray] = useState([]);
  const setRefresCount = vitest.fn();

  return (
    <GlobalContext.Provider
      value={{ feedbackArray, setRefresCount, suggestionArray }}
    >
      <BrowserRouter>
        <Feed />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

describe("Feed page", () => {
  it("should render feed page", () => {
    render(<MockFeed />);
    screen.debug();
  });
});
