import React, { useState, createContext } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const OpenContext = createContext();

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <OpenContext.Provider value={{ isOpen, setIsOpen }}>
      <Container>
        <Outlet />
      </Container>
    </OpenContext.Provider>
  );
};

export default Layout;
