export const getUserOptions = (state) =>
  Object.keys(state.users)
    .map((key) => state.users[key])
    .map(({ id, first_name, last_name }) => ({
      label: first_name + " " + last_name,
      value: id,
    }));
