import React, { useState } from "react";
import styled from "@emotion/styled";
import TextInput from "./library/text-input";

const FlexContainer = styled.div({
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const Container = styled(FlexContainer)({
  backgroundColor: "white",
  height: "25vh",
  padding: 20,
  width: "25vw",
  maxWidth: 300,
});

const Header = styled.div(({ theme: { primaryColor } }) => ({
  color: primaryColor,
  fontWeight: "bold",
  textTransform: "uppercase",
  marginBottom: 20,
}));

const Logo = styled(Header)({
  color: "white",
});

const Input = styled(TextInput)({
  marginBottom: 20,
  width: "100%",
});

const Button = styled.button(({ theme: { inverseColor } }) => ({
  backgroundColor: inverseColor,
  border: "none",
  borderRadius: 3,
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 10,
  width: "100%",
  padding: 5,
  "&:active, &:focus": {
    outline: "none",
  },
  "&:hover": {
    cursor: "pointer",
    boxShadow: "-2.5px 2.5px 2.5px 0px rgba(0,0,0,0.1)",
  },
}));

const TextButton = styled.button(({ theme: { primaryColor } }) => ({
  backgroundColor: "white",
  border: "none",
  color: primaryColor,
  fontSize: 12,
  padding: 5,
  "&:active, &:focus": {
    outline: "none",
  },
  "&:hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
}));

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState("login");
  const label = page === "login" ? "Login" : "Sign up";

  return (
    <FlexContainer>
      <Logo>Intervention</Logo>
      <Container>
        <Header>{label}</Header>
        <form>
          <Input
            onChange={setUsername}
            placeholder="Username"
            value={username}
          />
          <Input
            onChange={setPassword}
            placeholder="Password"
            type="password"
            value={password}
          />
        </form>
        <Button>{label}</Button>
        <TextButton
          onClick={() => setPage(page === "login" ? "signup" : "login")}
        >
          {page !== "login" ? "Login" : "Sign up"}
        </TextButton>
      </Container>
    </FlexContainer>
  );
};

export default LoginPage;
