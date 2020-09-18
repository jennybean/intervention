import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions as CurrentUserActions } from "../data/current-user";
import { Selectors as ProjectSelectors } from "../data/project";

import styled from "@emotion/styled";
import AdminProject from "./widgets/AdminProject";
import CreateProject from "./widgets/CreateProject";
import MemberProject from "./widgets/MemberProject";
import Profile from "./widgets/Profile";
import ProjectsDropdown from "./widgets/ProjectsDropdown";
import TextButton from "./library/text-button";

const Container = styled.div({
  maxHeight: "90vh",
  maxWidth: 400,
  width: "100%",
});

const Panel = styled.div({
  backgroundColor: "white",
  padding: 20,
});

const Dropdown = styled(ProjectsDropdown)({
  marginRight: 5,
});

const CreateButtonWrapper = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: 20,
});

const Dashboard = ({ id }) => {
  const [panel, setPanel] = useState("projects");
  const { isAdmin } = useSelector(ProjectSelectors.getProject);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CurrentUserActions.getUser({ id }));
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
              <Dropdown />
              <TextButton
                label="Create new project +"
                size="small"
                onClick={() => setPanel("create")}
              />
            </CreateButtonWrapper>
            {isAdmin ? <AdminProject /> : <MemberProject />}
          </>
        )}
      </Panel>
    </Container>
  );
};

export default Dashboard;
