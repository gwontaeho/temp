export const SET_PROJECT = "SET_PROJECT";
export const CLOSE_PROJECT = "CLOSE_PROJECT";

export const setProject = (payload) => ({
  type: SET_PROJECT,
  payload,
});

export const closeProject = () => ({
  type: CLOSE_PROJECT,
});
