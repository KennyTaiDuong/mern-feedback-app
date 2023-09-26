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
  });
});

const MockCircle = ({ bgc }) => {
  return <Circle bgc={bgc} data-testid="circle" />;
};

describe("Circle Component", () => {
  it("should render small circle", () => {
    render(<MockCircle bgc="--magenta-400" />);
    const circleElement = screen.getByTestId("circle");
    expect(circleElement).toBeInTheDocument();
  });
});
