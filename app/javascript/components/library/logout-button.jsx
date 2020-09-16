import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../../data/authentication";

import styled from "@emotion/styled";

const StyledButton = styled.button(({ theme: { primaryColor } }) => ({
  backgroundColor: "white",
  border: "none",
  borderRadius: 3,
  color: primaryColor,
  fontSize: 12,
  fontWeight: "bold",
  padding: 3,
  "&:active, &:focus": {
    outline: "none",
  },
  "&:hover": {
    cursor: "pointer",
    boxShadow: "-2.5px 2.5px 2.5px 0px rgba(0,0,0,0.1)",
  },
}));

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(Actions.logout());
  }, [dispatch]);

  return <StyledButton onClick={onClick}>Log out</StyledButton>;
};

export default LogoutButton;
