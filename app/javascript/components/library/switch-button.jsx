// https://upmostly.com/tutorials/build-a-react-switch-toggle-component
import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import "./switch-button.css";

const Container = styled.div(({ theme: { lighterColor } }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
}));

const Label = styled.label(({ checked, theme: { primaryColor } }) => ({
  backgroundColor: checked ? primaryColor : "lightgrey",
}));

const SwitchButton = ({ id, label, updateVote, votedYes, ...props }) => {
  const [checked, setChecked] = useState(votedYes);
  const uuid = uuidv4();

  const onChange = useCallback(() => {
    setChecked(!checked);
    updateVote(!checked, id);
  }, [checked, setChecked]);

  return (
    <Container {...props}>
      {label}
      <input
        checked={checked}
        className="react-switch-checkbox"
        id={uuid}
        onChange={onChange}
        type="checkbox"
      />
      <Label checked={checked} className="react-switch-label" htmlFor={uuid}>
        <span className="react-switch-button" />
      </Label>
    </Container>
  );
};

export default SwitchButton;
