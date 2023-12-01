import { useEffect, useReducer, useRef } from "react";
import _ from "lodash";

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
 * @param {Function} props.onError
 * @param {Array} props.key
 * @param {Boolean} props.enabled
 */
export const useFetch = (props) => {
  const { api, key = [], enabled, onSuccess, onError, notifyStatus } = props;

  const isArray = Array.isArray(api);
  const initialData = isArray ? Array(api.length).fill(undefined) : undefined;

  const keyRef = useRef({});
  const statusRef = useRef({ isLoading: false, isSuccess: false, isError: false });

  const [{ data, isLoading, isSuccess, isError }, dispatch] = useReducer(reducer, initializerArg(initialData));

  useEffect(() => {
    if (enabled) {
      if (_.isEqual(keyRef.current.key, key)) {
        if (new Date().getTime() - keyRef.current.t < 1000) return;
      }
      keyRef.current.key = key;
      keyRef.current.t = new Date().getTime();
      fetch();
    }
  }, [enabled, ...key]);

  const fetch = async (...variables) => {
    if (statusRef.current.isLoading) return;
    try {
      statusRef.current.isLoading = true;
      if (notifyStatus) dispatch({ type: "loading" });
      const fn = () => (isArray ? Promise.all(api.map((_) => _(...variables))) : api(...variables));
      const res = await fn();
      const data = isArray ? res.map(({ data }) => data) : res.data;
      dispatch({ type: "success", payload: data });
      if (onSuccess) onSuccess(data);
      statusRef.current.isLoading = false;
      statusRef.current.isSuccess = true;
      return data;
    } catch (error) {
      if (notifyStatus) dispatch({ type: "error" });
      if (onError) onError(error);
      statusRef.current.isLoading = false;
      statusRef.current.isError = true;
    }
  };

  return { data, fetch, isLoading, isSuccess, isError };
};
