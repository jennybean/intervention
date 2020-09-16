import React from "react";
import styled from "@emotion/styled";

const Button = styled.div(({ size, variant, theme: { inverseColor } }) => ({
  color: variant === "primary" ? inverseColor : "black",
  fontSize: size === "default" ? 16 : 12,
  fontWeight: variant === "primary" ? "bold" : "normal",
  paddingBottom: 10,
  "&:hover": {
    cursor: "pointer",
    textDecoration: "underline",
  },
}));

const TextButton = ({ label, onClick, ...props }) => (
  <Button onClick={onClick} {...props}>
    {label}
  </Button>
);

TextButton.defaultProps = {
  label: "",
  onClick: () => undefined,
  size: "default",
  variant: "primary",
};

export default TextButton;
