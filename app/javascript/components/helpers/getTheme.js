import { transparentize } from "polished";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const invertHex = (hex) =>
  "#" +
  (Number(`0x1${hex.replace("#", "")}`) ^ 0xffffff)
    .toString(16)
    .substr(1)
    .toUpperCase();

export const calculateTextColor = (color) =>
  !(parseInt(color.replace("#", ""), 16) > 0xffffff / 2) ? "white" : "black";

const getTheme = () => {
  const primaryColor = getRandomColor();
  const inverseColor = invertHex(primaryColor);

  return {
    inverseColor,
    lighterColor: transparentize(0.4, primaryColor),
    primaryColor,
    textColor: calculateTextColor(primaryColor),
  };
};

export default getTheme;
