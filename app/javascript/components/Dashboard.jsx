import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions as CurrentUserActions } from "../data/current-user";
import {
  Actions as ProjectActions,
  Selectors as ProjectSelectors,
} from "../data/projects";

import styled from "@emotion/styled";
import AdminProject from "./widgets/AdminProject";
import CreateProject from "./widgets/CreateProject";
import CreateProjectButton from "./widgets/CreateProjectButton";
import Profile from "./widgets/Profile";

const Container = styled.div({
  maxWidth: 400,
  width: "100%",
});

const Panel = styled.div({
  backgroundColor: "white",
  padding: 20,
});

const CreateButtonWrapper = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  marginBottom: 20,
});

const Dashboard = ({ id }) => {
  const [panel, setPanel] = useState("projects");
  const { isAdmin } = useSelector(ProjectSelectors.getProject);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CurrentUserActions.getUser({ id }));
    dispatch(ProjectActions.getProjects());
  }, [dispatch, id]);

  return (
    <Container>
      <Profile />
      <Panel>
        {panel === "create" ? (
          <CreateProject onCancel={() => setPanel("projects")} />
        ) : (
          <>
            <CreateButtonWrapper>
              <CreateProjectButton onClick={() => setPanel("create")} />
            </CreateButtonWrapper>
            {isAdmin ? <AdminProject /> : <div>SwitchButtons</div>}
          </>
        )}
      </Panel>
    </Container>
  );
};

export default Dashboard;
