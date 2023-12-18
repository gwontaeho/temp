export const SET_BIKE = "SET_BIKE";
export const CLOSE_BIKE = "CLOSE_BIKE";

export const setBike = (payload) => {
  return {
    type: SET_BIKE,
    payload,
  };
};

export const closeBike = () => ({
  type: CLOSE_BIKE,
});
