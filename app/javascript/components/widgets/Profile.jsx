import React from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Selectors as CurrentUserSelectors } from "../../data/current-user";
import { Selectors as ProjectSelectors } from "../../data/projects";
import avatar from "../library/avatar-white.png";
import LogoutButton from "./LogoutButton";

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
  fontSize: 18,
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

const Avatar = styled.div({
  alignItems: "center",
  backgroundColor: "white",
  borderRadius: "50%",
  display: "flex",
  height: 100,
  justifyContent: "center",
  marginTop: 15,
  width: 100,
});

const Img = styled.img(({ theme: { lighterColor } }) => ({
  backgroundColor: lighterColor,
  height: 100,
  width: 100,
}));

const Profile = () => {
  const { name } = useSelector(CurrentUserSelectors.getUser);
  const { isAdmin } = useSelector(ProjectSelectors.getProject);

  return (
    <StyledProfile>
      <LogoutButton />
      <User>
        <Name>{name}</Name>
        {isAdmin && <Badge>Admin</Badge>}
        <Avatar>
          <Img src={avatar} />
        </Avatar>
      </User>
    </StyledProfile>
  );
};

export default Profile;
