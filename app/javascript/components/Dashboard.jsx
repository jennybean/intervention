import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../data/current-user";

import styled from "@emotion/styled";
import Profile from "./widgets/Profile";
import CreateProject from "./widgets/CreateProject";
import CreateProjectButton from "./widgets/CreateProjectButton";

const Container = styled.div({
  maxWidth: 400,
  width: "100%",
});

const Panel = styled.div({
  backgroundColor: "white",
  padding: 20,
});

const Dashboard = ({ id }) => {
  const [panel, setPanel] = useState("projects");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Actions.getUser({ id }));
  }, [dispatch, id]);

  return (
    <Container>
      <Profile />
      <Panel>
        {panel === "create" ? (
          <CreateProject onCancel={() => setPanel("projects")} />
        ) : (
          <CreateProjectButton onClick={() => setPanel("create")} />
        )}
      </Panel>
    </Container>
  );
};

export default Dashboard;
