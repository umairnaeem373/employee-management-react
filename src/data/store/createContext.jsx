import axios from "axios";
import React from "react";
import { createContext, useReducer } from "react";

const AppContext = createContext();
const initialState = { data: [] };

const reducer = (state, action) => {
  console.log(state, "<<<");

  switch (action.type) {
    case "Get":
      return { ...state, data: action.payload };

    case "Add":
      return { ...state, data: [state.data, action.payload] };

    case "Del":
      const filterData = state.data.filter((e) => e.id !== action.payload);
      return { ...state, data: filterData };

    case "getSingleUser":
      return { ...state, single: action.payload };

    case "Edit":
      return {...state , data:[...state.data , state.data[action.payload.id] = action.payload ] }

    default:
      return state;
  }
};

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://json-api-wsnl.onrender.com/data");
      dispatch({ type: "Get", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
  
  const getSingleUser = async (id) => {
    const res = await axios.get(`https://json-api-wsnl.onrender.com/data/${id}`);
    dispatch({ type: "getSingleUser", payload: res.data });
  };

  const add = async () => {
    const res = await axios.post("https://json-api-wsnl.onrender.com/data");
    dispatch({ type: "Add", payload: res.data });
  };

  const del = async (id) => {
    await axios.delete(`https://json-api-wsnl.onrender.com/data/${id}`);
    dispatch({ type: "Del", payload: id });
  };

  const updateUser = async (id , obj) =>{
    const res = await axios.patch(`https://json-api-wsnl.onrender.com/data/${id}` , obj)
    dispatch({type: "Edit" , payload: res.data})
  }




  return (
    <AppContext.Provider value={{ state, fetchData, del, add, getSingleUser , updateUser }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };
