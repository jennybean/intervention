import { createSelector } from "reselect";
import { Selectors as CurrentUserSelectors } from "../current-user";
import { Selectors as UserSelectors } from "../users";

const emptyObject = {};
const emptyArray = [];
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
          memberIds: data.team_member_user_ids || emptyArray,
          adminIds: data.team_lead_user_ids || emptyArray,
          questions: data.questions.map((q) => ({
            id: q.id,
            text: q.question_text,
            value: q.yes_votes.length
              ? q.yes_votes.length / (q.no_votes.length + q.yes_votes.length)
              : 0,
          })),
        }
);

export const getProjectMemberOptions = createSelector(
  getProject,
  UserSelectors.getUserOptions,
  ({ memberIds }, users) =>
    users.filter(({ value }) => memberIds.includes(value))
);
