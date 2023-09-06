import React, { useContext, useState } from "react";
import styled from "styled-components";

import { ContentContainer, FilterButton } from "../../globalStyles";

import { GlobalContext } from "../../App";

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
  const { filter, setFilter, setRefreshCount, setSort } =
    useContext(GlobalContext);

  const SelectedStyle = {
    backgroundColor: "var(--blue-900)",
    color: "var(--neutral-100)",
  };

  function filterFeedback(e) {
    setFilter(e.target.outerText);
    setSort("Most Upvotes");
    setRefreshCount((prev) => prev + 1);
  }

  return (
    <FilterContainer>
      <FilterButton
        onClick={(e) => filterFeedback(e)}
        style={filter === "All" ? SelectedStyle : null}
      >
        All
      </FilterButton>
      <FilterButton
        onClick={(e) => filterFeedback(e)}
        style={filter === "UI" ? SelectedStyle : null}
      >
        UI
      </FilterButton>
      <FilterButton
        onClick={(e) => filterFeedback(e)}
        style={filter === "UX" ? SelectedStyle : null}
      >
        UX
      </FilterButton>
      <FilterButton
        onClick={(e) => filterFeedback(e)}
        style={filter === "Enhancement" ? SelectedStyle : null}
      >
        Enhancement
      </FilterButton>
      <FilterButton
        onClick={(e) => filterFeedback(e)}
        style={filter === "Bug" ? SelectedStyle : null}
      >
        Bug
      </FilterButton>
      <FilterButton
        onClick={(e) => filterFeedback(e)}
        style={filter === "Feature" ? SelectedStyle : null}
      >
        Feature
      </FilterButton>
    </FilterContainer>
  );
};

export default Filter;
