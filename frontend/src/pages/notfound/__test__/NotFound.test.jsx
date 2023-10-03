import { render, screen } from "@testing-library/react";
import NotFound from "../NotFound";
import { BrowserRouter } from "react-router-dom";

const MockNotFound = () => {
  return (
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
};

describe("Not Found page", () => {
  it("should render not found page", () => {
    render(<MockNotFound />);
  });
});
