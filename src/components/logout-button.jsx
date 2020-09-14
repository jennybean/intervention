import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled.button(({ theme: { primaryColor } }) => ({
  backgroundColor: "white",
  border: "none",
  borderRadius: 3,
  color: primaryColor,
  fontSize: 12,
  fontWeight: "bold",
  "&:active, &:focus": {
    outline: "none",
  },
  "&:hover": {
    cursor: "pointer",
    boxShadow: "-2.5px 2.5px 2.5px 0px rgba(0,0,0,0.1)",
  },
}));

const LogoutButton = () => <StyledButton>Log out</StyledButton>;

export default LogoutButton;
