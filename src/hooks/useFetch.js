import { useEffect, useState, useReducer } from "react";

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
  const { api } = props;

  const [{ data, isLoading, isSuccess, isError }, dispatch] = useReducer(reducer, initializerArg);

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
