import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import { Actions } from "../../data/projects";
import ProjectEditor from "./ProjectEditor";

const Header = styled.div(({ theme: { primaryColor } }) => ({
  color: primaryColor,
  fontWeight: "bold",
  textTransform: "uppercase",
}));

const CreateProject = ({ onCancel }) => {
  const dispatch = useDispatch();
  const onSave = useCallback(
    (name, questions) => {
      dispatch(Actions.createProject({ name, questions }));
    },
    [dispatch]
  );

  return (
    <>
      <Header>Create New Project</Header>
      <ProjectEditor onCancel={onCancel} onSave={onSave} />
    </>
  );
};

export default CreateProject;
