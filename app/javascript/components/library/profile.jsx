import React from "react";
import styled from "@emotion/styled";
import LogoutButton from "./logout-button";

import data from "./data";

const StyledProfile = styled.div(({ theme: { primaryColor } }) => ({
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

const Name = styled.div(({ theme: { textColor } }) => ({
  color: textColor,
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 5,
}));

const Badge = styled.div(({ theme: { inverseColor, textColor } }) => ({
  backgroundColor: inverseColor,
  borderRadius: 3,
  color: textColor,
  fontSize: 10,
  fontWeight: "bold",
  marginTop: 5,
  textTransform: "uppercase",
  padding: 3,
}));

const Avatar = styled.img({
  height: 100,
  width: 100,
  borderRadius: "50%",
  marginTop: 15,
});

const Profile = () => (
  <StyledProfile>
    <LogoutButton />
    <User>
      <Name>{data.name}</Name>
      {data.isAdmin && <Badge>Admin</Badge>}
      <Avatar src={data.avatar} />
    </User>
  </StyledProfile>
);

export default Profile;
