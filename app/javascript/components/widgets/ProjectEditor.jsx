import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import styled from "@emotion/styled";
import {
  Actions as UsersActions,
  Selectors as UsersSelectors,
} from "../../data/users";
import Button from "../library/button";
import TextButton from "../library/text-button";
import TextInput from "../library/text-input";

const Title = styled.div(({ theme: { primaryColor } }) => ({
  color: primaryColor,
  fontSize: 10,
  fontWeight: "bold",
  marginBottom: 15,
  marginTop: 10,
  textTransform: "uppercase",
}));

const Input = styled(TextInput)({
  marginTop: 5,
});

const AddButton = styled(TextButton)({
  marginTop: 5,
  marginBottom: 10,
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

const QuestionInput = ({
  index,
  question,
  updateQuestions,
  readOnlyQuestions,
}) => {
  const [value, setValue] = useState(question);

  const onChange = (v) => {
    setValue(v);
    updateQuestions(v, index);
  };

  return (
    <Input
      disabled={readOnlyQuestions}
      onChange={onChange}
      placeholder="Ask a yes or no question"
      value={value}
    />
  );
};

const MemberDropdown = ({ options, projectMembers, setMembers }) => {
  const [selections, setSelections] = useState(projectMembers);

  const onChange = useCallback(
    (values, event) => {
      if (event.action === "select-option") {
        setSelections(values);
        setMembers(values.map((v) => v.value));
      } else if (event.action === "remove-value") {
        const newValues = selections.filter(
          (member) => member.value !== event.removedValue.value
        );
        setSelections(newValues);
        setMembers(newValues.map((v) => v.value));
      }
    },
    [setMembers, setSelections, selections]
  );

  return (
    <>
      <Title>Members</Title>
      <Select
        value={selections}
        isMulti
        name="Members"
        options={options}
        isClearable={false}
        onChange={onChange}
        // className="basic-multi-select"
        // classNamePrefix="select"
      />
    </>
  );
};

const ProjectEditor = ({
  projectAdminIds,
  projectName,
  projectQuestionsText,
  projectMembers,
  onCancel,
  onSave,
  readOnlyQuestions,
}) => {
  const [name, setName] = useState(projectName);
  const [questions, setQuestions] = useState(projectQuestionsText);
  const [members, setMembers] = useState([]);

  const users = useSelector(UsersSelectors.getUserOptions);
  const options = users.filter((u) => !projectAdminIds.includes(u.value));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UsersActions.getUsers());
  }, [dispatch]);

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
    onSave({ name, text: questions, members });
  }, [onSave, name, questions, members]);

  return (
    <>
      <form>
        <Title>Name</Title>
        <Input onChange={setName} placeholder="Project name" value={name} />
        <Title>Questions</Title>
        {questions.map((q, i) => (
          <QuestionInput
            key={`question_${i}`}
            index={i}
            question={q}
            updateQuestions={updateQuestions}
            readOnlyQuestions={readOnlyQuestions}
          />
        ))}
      </form>
      {!readOnlyQuestions && (
        <AddButton
          label="Add new question +"
          onClick={addNewQuestion}
          size="small"
        />
      )}
      {!!options.length && (
        <MemberDropdown
          projectMembers={projectMembers}
          options={options}
          setMembers={setMembers}
        />
      )}
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
  onCancel: () => undefined,
  onSave: () => undefined,
  projectAdminIds: [],
  projectMembers: [],
  projectName: "",
  projectQuestionsText: [""],
  readOnlyQuestions: false,
};
export default ProjectEditor;
