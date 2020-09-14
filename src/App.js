import React from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";
import getTheme from "./getTheme";
import Widget from "./components/widget";

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
      <Widget />
    </StyledApp>
  </ThemeProvider>
);

export default App;
