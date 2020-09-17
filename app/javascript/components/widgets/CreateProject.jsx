import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Actions } from "../../data/projects";
import { Selectors as CurrentUserSelectors } from "../../data/current-user";
import ProjectEditor from "./ProjectEditor";

const Header = styled.div(({ theme: { inverseColor } }) => ({
  color: inverseColor,
  fontWeight: "bold",
  textTransform: "uppercase",
}));

const CreateProject = ({ onCancel }) => {
  const { id } = useSelector(CurrentUserSelectors.getUser);

  const dispatch = useDispatch();
  const onSave = useCallback(
    ({ name, text, members }) => {
      dispatch(Actions.createProject({ name, questions: text, members }));
      onCancel();
    },
    [dispatch, onCancel]
  );

  return (
    <>
      <Header>Create New Project</Header>
      <ProjectEditor
        projectAdminIds={[id]}
        onCancel={onCancel}
        onSave={onSave}
      />
    </>
  );
};

export default CreateProject;
