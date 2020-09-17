import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../data/authentication";

import styled from "@emotion/styled";
import Button from "./library/button";
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

const SubmitButton = styled(Button)({
  width: "100%",
});

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
      setPage("login");
    }
  }, [dispatch, email, password, firstName, lastName, page, setPage]);

  return (
    <FlexContainer>
      <Logo>Intervention</Logo>
      <Container>
        <Header>{label}</Header>
        <form>
          <Input onChange={setEmail} placeholder="Email" value={email} />
          <Input
            // autocomplete="current-password"
            onChange={setPassword}
            placeholder="Password"
            type="password"
            value={password}
          />
          {page === "signup" && (
            <>
              <Input
                onChange={setFirstName}
                placeholder="First name"
                value={firstName}
              />
              <Input
                onChange={setLastName}
                placeholder="Last name"
                value={lastName}
              />
            </>
          )}
        </form>
        <SubmitButton
          disabled={
            page === "login"
              ? !email || !password
              : !email || !password || !firstName || !lastName
          }
          onClick={onClick}
          label={label}
        />
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
