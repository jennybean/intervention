import { createSelector } from "reselect";
import { Selectors as CurrentUserSelectors } from "../current-user";

const emptyObject = {};
const getData = (state) => state.projects;

export const getProject = createSelector(
  getData,
  CurrentUserSelectors.getUser,
  (data, { id }) =>
    !Object.keys(data).length
      ? emptyObject
      : {
          name: data.name,
          id: data.id,
          isAdmin: data.team_lead_user_ids.includes(id),
          questions: data.questions.map((q) => ({
            id: q.id,
            text: q.question_text,
            value: q.yes_votes.length
              ? q.yes_votes.length / (q.no_votes.length + q.yes_votes.length)
              : 0,
          })),
        }
);
