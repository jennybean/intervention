import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Selectors as ProjectSelectors } from "../../data/projects";
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
  const [panel, setPanel] = useState("edit");
  const { name, questions } = useSelector(ProjectSelectors.getProject);

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
      projectName={name}
      projectQuestions={questions.map((q) => q.text)}
      onCancel={() => setPanel("projects")}
      onSave={(x, y) => console.log("onSave", x, y)}
    />
  );
};

export default AdminProject;
