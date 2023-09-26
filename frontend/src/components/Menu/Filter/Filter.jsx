import React, { useContext, useState } from "react";
import styled from "styled-components";

import { ContentContainer, FilterButton } from "../../../globalStyles";

import { GlobalContext } from "../../../App/App";

const FilterContainer = styled(ContentContainer)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;

  @media screen and (min-width: 640px) {
    height: 100%;
  }
`;

const Filter = () => {
  const { filter, setFilter, setRefreshCount, setSort } = useContext(
    GlobalContext
  );

  const SelectedStyle = {
    backgroundColor: "var(--blue-900)",
    color: "white",
  };

  function filterFeedback(e) {
    setFilter(e.target.textContent);
    setSort("Most Upvotes");
    setRefreshCount((prev) => prev + 1);
  }

  return (
    <FilterContainer>
      <FilterButton
        onClick={(e) => filterFeedback(e)}
        style={filter === "All" ? SelectedStyle : null}
        id={filter === "All" ? "selected" : "All"}
      >
        All
      </FilterButton>
      <FilterButton
        onClick={(e) => filterFeedback(e)}
        style={filter === "UI" ? SelectedStyle : null}
        id={filter === "UI" ? "selected" : "UI"}
      >
        UI
      </FilterButton>
      <FilterButton
        onClick={(e) => filterFeedback(e)}
        style={filter === "UX" ? SelectedStyle : null}
        id={filter === "UX" ? "selected" : "UX"}
      >
        UX
      </FilterButton>
      <FilterButton
        onClick={(e) => filterFeedback(e)}
        style={filter === "Enhancement" ? SelectedStyle : null}
        id={filter === "Enhancement" ? "selected" : "Enhancement"}
      >
        Enhancement
      </FilterButton>
      <FilterButton
        onClick={(e) => filterFeedback(e)}
        style={filter === "Bug" ? SelectedStyle : null}
        id={filter === "Bug" ? "selected" : "Bug"}
      >
        Bug
      </FilterButton>
      <FilterButton
        onClick={(e) => filterFeedback(e)}
        style={filter === "Feature" ? SelectedStyle : null}
        id={filter === "Feature" ? "selected" : "Feature"}
      >
        Feature
      </FilterButton>
    </FilterContainer>
  );
};

export default Filter;
