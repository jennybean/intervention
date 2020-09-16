import React from "react";
import styled from "@emotion/styled";
import Profile from "./library/profile";
import DonutChart from "./library/donut-chart";

import data from "./library/data";

const Container = styled.div({
  maxWidth: 400,
  width: "100%",
});

const Survey = styled.div({
  backgroundColor: "white",
  padding: 20,
});

const AdminPage = () => (
  <Container>
    <Profile />
    <Survey>
      <DonutChart
        value={data.selfNeedsIntervention}
        description="I am stressed. I need a day off."
      />
      <DonutChart
        showInverseColor
        value={data.teamNeedsIntervention}
        description="Team morale is low. We all need a day off."
      />
    </Survey>
  </Container>
);

export default AdminPage;
