import React from "react";
import Select from "react-select";
import useTheme from "../helpers/useTheme";

const styles = {
  container: (provided) => ({
    ...provided,
    fontSize: 12,
    width: "100%",
  }),
  menu: (provided) => ({
    ...provided,
    background: "white",
  }),
};

const getTheme = ({ lighterColor }) => (defaultTheme) => ({
  ...defaultTheme,
  colors: {
    primary: lighterColor,
  },
});

const Dropdown = ({ isMulti, name, onChange, options, value, ...props }) => {
  const currentTheme = useTheme();
  const theme = getTheme(currentTheme);

  return (
    <Select
      isClearable={false}
      isMulti={isMulti}
      name="Projects"
      onChange={onChange}
      options={options}
      styles={styles}
      theme={theme}
      value={value}
      {...props}
    />
  );
};

Dropdown.defaultProps = {
  isMulti: false,
  name: "",
  onChange: () => undefined,
  options: [],
  value: {},
};
export default Dropdown;
