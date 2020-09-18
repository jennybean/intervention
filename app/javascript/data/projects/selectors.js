export const getProjectOptions = (state) =>
  Object.keys(state.projects)
    .map((key) => state.projects[key])
    .map(({ id, name }) => ({
      label: name,
      value: id,
    }));
