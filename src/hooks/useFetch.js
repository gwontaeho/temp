import { useEffect, useReducer, useState } from "react";

const initializerArg = {
  data: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
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
  const { api, params } = props;

  const [_params, _setParams] = useState(params);
  const [{ data, isLoading, isSuccess, isError }, dispatch] = useReducer(reducer, initializerArg);

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   console.log("a", Object.entries({ alang: "ko" }).toString());
  //   console.log("b", Object.entries({ lang: "ko" }).toString());
  //   console.log("b", params);
  //   console.log({ lang: "ko" } == { lang: "ko" });
  // }, [params]);

  const fetchData = async () => {
    dispatch({ type: "loading" });
    try {
      const { data } = await api();
      dispatch({ type: "success", payload: data });
    } catch (error) {
      dispatch({ type: "error" });
    }
  };

  return { data, fetchData, isLoading, isSuccess, isError };
};
