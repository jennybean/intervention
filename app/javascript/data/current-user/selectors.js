export const getUser = (state) => ({
  name: state.currentUser.first_name + " " + state.currentUser.last_name,
  id: state.currentUser.id,
});
