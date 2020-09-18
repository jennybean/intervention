import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Selectors as CurrentUserSelectors } from "../../data/current-user";
import {
  Actions as ProjectActions,
  Selectors as ProjectSelectors,
} from "../../data/project";
import styled from "@emotion/styled";
import SwitchButton from "../library/switch-button";

const Title = styled.div(({ theme: { primaryColor } }) => ({
  color: primaryColor,
  fontSize: 13,
  fontWeight: "bold",
  marginBottom: 10,
  textTransform: "uppercase",
}));

const StyledSwitchButton = styled(SwitchButton)({
  marginBottom: 10,
});

const Question = ({ question }) => {
  const { id: userId } = useSelector(CurrentUserSelectors.getUser);

  const dispatch = useDispatch();
  const updateVote = useCallback(
    (votedYes, questionId) => {
      if (votedYes) {
        const updatedYes = [...question.yesVotes, userId];
        const updatedNo = question.noVotes.filter((no) => no !== userId);
        dispatch(
          ProjectActions.updateVote({
            id: questionId,
            yesVotes: updatedYes,
            noVotes: updatedNo,
          })
        );
      } else {
        const updatedNo = [...question.noVotes, userId];
        const updatedYes = question.yesVotes.filter((no) => no !== userId);
        dispatch(
          ProjectActions.updateVote({
            id: questionId,
            yesVotes: updatedYes,
            noVotes: updatedNo,
          })
        );
      }
    },
    [dispatch, userId, question]
  );

  return (
    <StyledSwitchButton
      id={question.id}
      label={question.text}
      votedYes={question.vote === "yes"}
      updateVote={updateVote}
    />
  );
};

const MemberProject = () => {
  const { name, questions } = useSelector(ProjectSelectors.getMemberProject);

  if (!name) return null;

  return (
    <>
      <Title>{name}</Title>
      {questions.map((q, i) => (
        <Question key={q.id} question={q} />
      ))}
    </>
  );
};

export default MemberProject;
