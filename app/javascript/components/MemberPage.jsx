import React from "react";
import styled from "@emotion/styled";
import Profile from "./components/profile";
import SwitchButton from "./components/switch-button";

const Container = styled.div({
  maxWidth: 400,
  width: "100%",
});

const Survey = styled.div({
  backgroundColor: "white",
  padding: 20,
});

const Header = styled.div(({ theme: { primaryColor } }) => ({
  color: primaryColor,
  fontSize: 12,
  fontWeight: "bold",
  paddingBottom: 10,
  textTransform: "uppercase",
}));

const SwitchWrapper = styled.div({
  marginBottom: 10,
});

const MemberPage = () => (
  <Container>
    <Profile />
    <Survey>
      <Header>How are you feeling lately?</Header>
      <SwitchWrapper>
        <SwitchButton label="I am stressed. I need a day off." />
      </SwitchWrapper>
      <SwitchButton label="Team morale is low. We all need a day off." />
    </Survey>
  </Container>
);

export default MemberPage;
