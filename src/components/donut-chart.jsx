// http://jsfiddle.net/4azpfk3r/
import React from "react";
import styled from "@emotion/styled";
import "./donut-chart.css";

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

const Circle = styled.circle(
  ({ showInverseColor, theme: { inverseColor, primaryColor } }) => ({
    stroke: showInverseColor ? inverseColor : primaryColor,
    strokeWidth: 8,
  })
);

const Description = styled.div({
  marginLeft: 20,
});

const DonutChart = ({ description, showInverseColor, value }) => {
  return (
    <FlexContainer>
      <RelativeContainer>
        <Label>{value * 100 + "%"}</Label>
        <div class="donut">
          <Svg xmlns="http://www.w3.org/2000/svg">
            <g>
              <Circle
                class="circle_animation"
                cx="81"
                cy="81"
                fill="none"
                id="circle_animation"
                r="69.85699"
                showInverseColor={showInverseColor}
              />
            </g>
          </Svg>
        </div>
      </RelativeContainer>
      <Description>{description}</Description>
    </FlexContainer>
  );
};

export default DonutChart;
