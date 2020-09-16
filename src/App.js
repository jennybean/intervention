import React from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";
import getTheme from "./getTheme";
import AdminPage from "./AdminPage";
import MemberPage from "./MemberPage";
import LoginPage from "./LoginPage";

import data from "./components/data";

const StyledApp = styled.div(({ theme: { lighterColor } }) => ({
  alignItems: "center",
  background: lighterColor,
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  width: "100vw",
}));

const App = () => (
  <ThemeProvider theme={getTheme()}>
    <StyledApp>
      <LoginPage />
    </StyledApp>
  </ThemeProvider>
);

export default App;
