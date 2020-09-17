import React from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";
import getTheme from "./helpers/getTheme";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";

import { Provider } from "react-redux";
import store from "../app/store";
import saga from "../app/sagas";
import { sagaMiddleware } from "../app/middleware";

const StyledApp = styled.div(({ theme: { lighterColor } }) => ({
  alignItems: "center",
  background: lighterColor,
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  overflow: "auto",
  width: "100vw",
}));

const RootComponent = ({ id }) => (
  <Provider store={store}>
    <ThemeProvider theme={getTheme()}>
      <StyledApp>{!id ? <LoginPage /> : <Dashboard id={id} />}</StyledApp>
    </ThemeProvider>
  </Provider>
);

export default RootComponent;

sagaMiddleware.run(saga);
