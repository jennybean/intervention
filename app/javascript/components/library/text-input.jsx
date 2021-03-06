import React from "react";
import styled from "@emotion/styled";

const Input = styled.input(({ theme: { primaryColor } }) => ({
  border: "1px solid #767676",
  borderRadius: 2,
  boxSizing: "border-box",
  padding: 5,
  width: "100%",
  "&:active, &:focus": {
    border: `1px solid ${primaryColor}`,
    outline: "none",
  },
}));

const TextInput = ({
  onChange,
  onSubmit,
  placeholder,
  type,
  value,
  ...props
}) => (
  <Input
    onChange={(e) => onChange(e.currentTarget.value)}
    onSubmit={onSubmit}
    placeholder={placeholder}
    type={type}
    value={value}
    {...props}
  />
);

TextInput.defaultProps = {
  onChange: () => undefined,
  onSubmit: () => undefined,
  placeholder: "",
  type: "text",
  value: "",
};

export default TextInput;
