import { useContext } from "react";
import { ThemeContext } from "@emotion/core";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
