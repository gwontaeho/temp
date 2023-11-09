import { useEffect, useReducer, useState } from "react";

const initializerArg = (initialData) => {
  return {
    data: initialData,
    isLoading: false,
    isSuccess: false,
    isError: false,
  };
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "success":
      return { ...state, isLoading: false, isError: false, isSuccess: true, data: action.payload };
    case "error":
      return { ...state, isLoading: false, isError: true, isSuccess: false };
  }
}

export const useFetch = (props) => {
  const { api, key, enabled } = props;

  const isArray = Array.isArray(api);
  const initialData = isArray ? Array(api.length).fill({}) : {};

  const [_key, _setKey] = useState(key);
  const [{ data, isLoading, isSuccess, isError }, dispatch] = useReducer(reducer, initializerArg(initialData));

  useEffect(() => {
    if (enabled) fetchData();
  }, [enabled, _key]);

  useEffect(() => {
    if (String(key) === String(_key)) return;
    _setKey(key);
  }, [key, _key]);

  const fetchData = async (variables) => {
    try {
      dispatch({ type: "loading" });
      const fetchFn = () => (isArray ? Promise.all(api.map((_) => _(variables))) : api(variables));
      const res = await fetchFn();
      const data = isArray ? res.map(({ data }) => data) : res.data;
      dispatch({ type: "success", payload: data });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  return { data, fetchData, isLoading, isSuccess, isError };
};
