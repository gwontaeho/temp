import { useEffect, useReducer, useState } from "react";

const initializerArg = (initialData) => {
  return {
    data: initialData,
    isLoading: false,
    isSuccess: false,
    isError: false,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "success":
      return { ...state, isLoading: false, isError: false, isSuccess: true, data: action.payload };
    case "error":
      return { ...state, isLoading: false, isError: true, isSuccess: false };
  }
};

/**
 * @param {Object} props
 * @param {Function} props.api
 * @param {Function} props.onSuccess
 * @param {Array} props.key
 * @param {Boolean} props.enabled
 * @returns
 */
export const useFetch = (props) => {
  const { api, key, enabled, onSuccess, onError } = props;

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
    if (isLoading) return;
    try {
      dispatch({ type: "loading" });
      const fn = () => (isArray ? Promise.all(api.map((_) => _(variables))) : api(variables));
      const res = await fn();
      const data = isArray ? res.map(({ data }) => data) : res.data;
      dispatch({ type: "success", payload: data });
      if (onSuccess) onSuccess(data);
      return data;
    } catch (error) {
      dispatch({ type: "error" });
      if (onError) onError(error);
    }
  };

  return { data, fetchData, isLoading, isSuccess, isError };
};
