import { render, screen } from "@testing-library/react";
import RoadmapStats from "../RoadmapStats";
import { GlobalContext } from "../../../../App/App";
import { BrowserRouter } from "react-router-dom";
import { Circle } from "../RoadmapStats";

const MockedRoadmapStats = () => {
  const plannedArray = [];
  const progressArray = [];
  const liveArray = [];

  return (
    <GlobalContext.Provider value={{ plannedArray, progressArray, liveArray }}>
      <BrowserRouter>
        <RoadmapStats />
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

describe("RoadmapStats Component", () => {
  it("should render Roadmap", () => {
    render(<MockedRoadmapStats />);

    const plannedCircle = screen.getByTestId("planned-circle");
    const progressCircle = screen.getByTestId("progress-circle");
    const liveCircle = screen.getByTestId("live-circle");

    expect(plannedCircle).toBeInTheDocument();
    expect(progressCircle).toBeInTheDocument();
    expect(liveCircle).toBeInTheDocument();
  });

  it("should render null background when no bgc prop passed", async () => {
    render(<Circle data-testid="circle" />);
    const circle = screen.getByTestId("circle");
    expect(circle).toHaveStyle({ backgroundColor: null });
  });
});
