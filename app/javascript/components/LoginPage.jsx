import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../data/authentication";

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
  "&:disabled": {
    cursor: "not-allowed",
    boxShadow: "none",
    opacity: 0.5,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [page, setPage] = useState("login");
  const label = page === "login" ? "Login" : "Sign up";

  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    if (page === "login") {
      dispatch(Actions.login({ email, password }));
    } else {
      dispatch(Actions.signup({ email, password, firstName, lastName }));
    }
  }, [dispatch, email, password, firstName, lastName, page]);

  return (
    <FlexContainer>
      <Logo>Intervention</Logo>
      <Container>
        <Header>{label}</Header>
        <form>
          <Input onChange={setEmail} placeholder="Email" value={email} />
          <Input
            onChange={setPassword}
            placeholder="Password"
            type="password"
            value={password}
          />
          {page === "signup" && (
            <>
              <Input
                onChange={setFirstName}
                placeholder="First name (optional)"
                value={firstName}
              />
              <Input
                onChange={setLastName}
                placeholder="Last name (optional)"
                value={lastName}
              />
            </>
          )}
        </form>
        <Button disabled={!email || !password} onClick={onClick}>
          {label}
        </Button>
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
