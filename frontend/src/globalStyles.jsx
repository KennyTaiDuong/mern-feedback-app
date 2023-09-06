import styled, { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "Jost", sans-serif;
  }

  body {
    background-color: var(--neutral-400);
    min-height: 100vh;
  }

  button, a { 
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  #root {
    display: flex;
  }

  :root {
    // Neutral colors
    --neutral-100: #FFF;
    --neutral-400: #F7F8FD;
    --neutral-700: #F2F4FF;

    // Blues
    --blue-300: #647196;
    --blue-400: #373F68;
    --blue-500: #3A4374;
    --blue-700: #62BCFA;
    --blue-900: #4661E6;

    // Other Colors
    --orange-400: #F49F85;
    --magenta-400: #AD1FEA;
    --red-400: #D73737;
  }
`;

export const ContentContainer = styled.div`
  background-color: var(--neutral-100);
  border-radius: 10px;
  padding: 1.5rem;
`;

export const FilterButton = styled.button`
  border-radius: 10px;
  background-color: var(--neutral-700);
  border: 0;
  padding: 0.375rem 0.75rem;
  color: var(--blue-900);
  font-size: 0.8125rem;
  font-weight: 700;
  align-self: center;
`;

export const AddButton = styled.button`
  background-color: var(--magenta-400);
  color: var(--neutral-700);
  font-size: 0.8125rem;
  font-weight: 700;
  padding: 0.625rem 0.75rem;
  border: 0;
  border-radius: 0.625rem;

  @media screen and (min-width: 640px) {
    padding: 0.75rem 1.5rem;
  }
`;

export default Global;
