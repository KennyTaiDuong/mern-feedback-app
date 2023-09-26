import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Layout = () => {
  return (
    <Container data-testid="layout">
      <Outlet />
    </Container>
  );
};

export default Layout;
