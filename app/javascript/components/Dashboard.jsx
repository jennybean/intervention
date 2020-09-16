import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../data/current-user";

import styled from "@emotion/styled";
import Profile from "./library/profile";
import SwitchButton from "./library/switch-button";

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

const Dashboard = ({ id }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.getUser({ id }));
  }, [dispatch, id]);

  return (
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
};

export default Dashboard;
