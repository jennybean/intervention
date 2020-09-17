import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Actions as ProjectActions,
  Selectors as ProjectSelectors,
} from "../../data/projects";
import styled from "@emotion/styled";
import DonutChart from "../library/donut-chart";
import TextButton from "../library/text-button";
import ProjectEditor from "./ProjectEditor";

const Header = styled.div({
  alignItems: "center",
  display: "flex",
  marginBottom: 20,
});

const Title = styled.div(({ theme: { primaryColor } }) => ({
  color: primaryColor,
  fontSize: 13,
  fontWeight: "bold",
  marginRight: 5,
  textTransform: "uppercase",
}));

const AdminProject = () => {
  const [panel, setPanel] = useState("projects");
  const { name, questions, adminIds, id } = useSelector(
    ProjectSelectors.getProject
  );
  const members = useSelector(ProjectSelectors.getProjectMemberOptions);

  const dispatch = useDispatch();
  const onSave = useCallback(
    ({ name, members }) => {
      dispatch(ProjectActions.updateProject({ id, name, members }));
    },
    [dispatch, id]
  );

  return panel === "projects" ? (
    <>
      <Header>
        <Title>{name}</Title>
        <TextButton
          onClick={() => setPanel("edit")}
          label="Edit"
          size="small"
          variant="secondary"
        />
      </Header>
      {questions.map((q, i) => (
        <DonutChart
          key={q.id}
          description={q.text}
          showInverseColor={i % 2 === 0}
          value={q.value}
        />
      ))}
    </>
  ) : (
    <ProjectEditor
      onCancel={() => setPanel("projects")}
      onSave={onSave}
      projectAdminIds={adminIds}
      projectMembers={members}
      projectName={name}
      projectQuestionsText={questions.map((q) => q.text)}
      readOnlyQuestions
    />
  );
};

export default AdminProject;
