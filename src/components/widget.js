import React from "react";
import styled from "@emotion/styled";
import LogoutButton from "./logout-button";
import SwitchButton from "./switch-button";

import data from "./data";

const Container = styled.div({
  maxWidth: 400,
  width: "100%",
});

const Profile = styled.div(({ theme: { primaryColor } }) => ({
  backgroundColor: primaryColor,
  borderTopLeftRadius: 3,
  borderTopRightRadius: 3,
  padding: "5px 5px 20px 5px",
}));

const User = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
});

const Avatar = styled.img({
  height: 100,
  width: 100,
  borderRadius: "50%",
});

const Name = styled.div(({ theme: { textColor } }) => ({
  color: textColor,
  fontSize: 16,
  fontWeight: "bold",
  paddingBottom: 20,
}));

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

const Widget = () => (
  <Container>
    <Profile>
      <LogoutButton />
      <User>
        <Name>{data.name}</Name>
        <Avatar src={data.avatar} />
      </User>
    </Profile>
    <Survey>
      <Header>How are you feeling today?</Header>
      <SwitchWrapper>
        <SwitchButton label="I am stressed. I need a day off." />
      </SwitchWrapper>
      <SwitchButton label="Team morale is low. We all need a day off." />
    </Survey>
  </Container>
);

export default Widget;
