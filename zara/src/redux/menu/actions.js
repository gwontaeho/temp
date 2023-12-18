export const OPEN_MENU = "OPEN_MENU";
export const CLOSE_MENU = "CLOSE_MENU";
export const SET_NAV = "SET_NAV";

export const openMenu = () => ({
  type: OPEN_MENU,
});

export const closeMenu = () => ({
  type: CLOSE_MENU,
});

export const setNav = (payload) => {
  return {
    type: SET_NAV,
    payload,
  };
};
