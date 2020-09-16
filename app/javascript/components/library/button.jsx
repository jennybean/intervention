import React from "react";
import styled from "@emotion/styled";

const StyledButton = styled.button(({ theme: { inverseColor } }) => ({
  backgroundColor: inverseColor,
  border: "none",
  borderRadius: 3,
  color: "white",
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 10,
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

const Button = ({ disabled, label, onClick, ...props }) => (
  <StyledButton disabled={disabled} onClick={onClick} {...props}>
    {label}
  </StyledButton>
);

Button.defaultProps = {
  disabled: false,
  label: "",
  onClick: () => undefined,
};

export default Button;
