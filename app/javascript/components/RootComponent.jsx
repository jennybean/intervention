import React from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";
import getTheme from "./helpers/getTheme";
import LoginPage from "./LoginPage";

const StyledApp = styled.div(({ theme: { lighterColor } }) => ({
  alignItems: "center",
  background: lighterColor,
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  width: "100vw",
}));

const RootComponent = ({ current_user }) => (
  <ThemeProvider theme={getTheme()}>
    <StyledApp>
      {!current_user ? <LoginPage /> : <div>RootComponent</div>}
    </StyledApp>
  </ThemeProvider>
);

export default RootComponent;
