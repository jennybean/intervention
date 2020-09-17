import React, { useCallback, useState } from "react";
import styled from "@emotion/styled";
import Button from "../library/button";
import TextButton from "../library/text-button";
import TextInput from "../library/text-input";

const Input = styled(TextInput)({
  marginTop: 20,
});

const AddButton = styled(TextButton)({
  marginTop: 5,
});

const CancelButton = styled(TextButton)({
  marginLeft: 5,
});

const Buttons = styled.div({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  marginTop: 10,
});

const QuestionInput = ({ index, question, updateQuestions }) => {
  const [value, setValue] = useState(question);

  const onChange = (v) => {
    setValue(v);
    updateQuestions(v, index);
  };

  return (
    <Input
      onChange={onChange}
      placeholder="Ask a yes or no question"
      value={value}
    />
  );
};

const ProjectEditor = ({ projectName, projectQuestions, onCancel, onSave }) => {
  const [name, setName] = useState(projectName);
  const [questions, setQuestions] = useState(projectQuestions);

  const addNewQuestion = useCallback(() => {
    setQuestions([...questions, ""]);
  }, [questions, setQuestions]);

  const updateQuestions = useCallback(
    (question, index) => {
      const updatedQuestions = Object.assign([], questions, {
        [index]: question,
      });
      setQuestions(updatedQuestions);
    },
    [questions, setQuestions]
  );

  const handleSave = useCallback(() => {
    onSave({ name, questions });
  }, [onSave, name, questions]);

  return (
    <>
      <form>
        <Input onChange={setName} placeholder="Project name" value={name} />
        {questions.map((q, i) => (
          <QuestionInput
            key={`question_${i}`}
            index={i}
            question={q}
            updateQuestions={updateQuestions}
          />
        ))}
      </form>
      <AddButton
        label="Add new question +"
        onClick={addNewQuestion}
        size="small"
      />
      <Buttons>
        <Button
          disabled={!name || !questions[0]}
          label="Save"
          onClick={handleSave}
        />
        <CancelButton label="Cancel" onClick={onCancel} variant="secondary" />
      </Buttons>
    </>
  );
};

ProjectEditor.defaultProps = {
  projectName: "",
  projectQuestions: [""],
  onCancel: () => undefined,
  onSave: () => undefined,
};
export default ProjectEditor;
