import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
  Actions as ProjectsActions,
  Selectors as ProjectsSelectors,
} from "../../data/projects";
import {
  Actions as ProjectActions,
  Selectors as ProjectSelectors,
} from "../../data/project";
import Dropdown from "../library/dropdown";

const ProjectsDropdown = ({ ...props }) => {
  const options = useSelector(ProjectsSelectors.getProjectOptions);
  const { name: label = "", id: value = "" } = useSelector(
    ProjectSelectors.getProject
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ProjectsActions.getProjects());
  }, [dispatch]);

  const onChange = useCallback(
    ({ value }) => {
      dispatch(ProjectActions.getProject({ id: value }));
    },
    [dispatch]
  );

  if (options.length < 2) return null;

  return (
    <Dropdown
      name="Projects"
      onChange={onChange}
      options={options}
      value={{ label, value }}
      {...props}
    />
  );
};

export default ProjectsDropdown;
