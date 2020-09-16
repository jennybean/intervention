import React from "react";
import styled from "@emotion/styled";
import TextInput from "./components/text-input";

const Container = styled.div({
  backgroundColor: "white",
  maxWidth: 400,
  padding: 20,
  width: "100%",
});

const Header = styled.div(({ theme: { primaryColor } }) => ({
  color: primaryColor,
  fontSize: 16,
  fontWeight: "bold",
  paddingBottom: 10,
  textTransform: "uppercase",
}));

const LoginPage = () => (
  <Container>
    <Header>Sign in to your account</Header>
    <TextInput placeholder="Username" />
  </Container>
);

export default LoginPage;
