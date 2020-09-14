import { transparentize } from "polished";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const calculatorTextColor = (color) =>
  !(parseInt(color.replace("#", ""), 16) > 0xffffff / 2);

const getTheme = () => {
  const primaryColor = getRandomColor();

  return {
    lighterColor: transparentize(0.4, primaryColor),
    primaryColor,
    textColor: calculatorTextColor(primaryColor) ? "white" : "black",
    buttonTextColor: calculatorTextColor(primaryColor) ? primaryColor : "black",
  };
};

export default getTheme;
