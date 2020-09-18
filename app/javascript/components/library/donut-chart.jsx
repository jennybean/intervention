// http://jsfiddle.net/4azpfk3r/
import React from "react";
import { css, keyframes } from "@emotion/core";
import styled from "@emotion/styled";

const FlexContainer = styled.div({
  alignItems: "center",
  display: "flex",
  position: "relative",
});

const RelativeContainer = styled(FlexContainer)({
  justifyContent: "center",
  position: "relative",
});

const Label = styled.h2({
  position: "absolute",
});

const Svg = styled.svg({
  height: 160,
  transform: "rotate(-90deg)",
  width: 160,
});

const Description = styled.div({
  marginLeft: 20,
});

const animation = (value) => keyframes`
  from {
    stroke-dashoffset: 440;
  }
  100% {
    stroke-dashoffset: ${440 - value * 440};
  }
`;

const Circle = styled.circle`
  stroke-width: 8;
  stroke-dasharray: 440;
  stroke: ${({ showInverseColor, theme: { inverseColor, primaryColor } }) =>
    showInverseColor ? inverseColor : primaryColor};
  animation: ${({ value }) =>
    css`
      ${animation(value)} 1s ease-out forwards
    `};
`;

const DonutChart = ({ description, showInverseColor, value }) => (
  <FlexContainer>
    <RelativeContainer>
      <Label>{Math.floor(value * 100) + "%"}</Label>
      <div className="donut">
        <Svg xmlns="http://www.w3.org/2000/svg">
          <g>
            <Circle
              // className="circle-animation"
              cx="81"
              cy="81"
              fill="none"
              id="circle_animation"
              r="69.85699"
              showInverseColor={showInverseColor}
              value={value}
            />
          </g>
        </Svg>
      </div>
    </RelativeContainer>
    <Description>{description}</Description>
  </FlexContainer>
);

export default DonutChart;
