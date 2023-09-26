import { render, screen } from "@testing-library/react";
import Layout from "../Layout";

describe("Layout Component", () => {
  it("renders component", () => {
    render(<Layout />);
    expect(screen.getByTestId("layout"));
  });
});
