import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import constants from "../Constants";
import queryString from "query-string";
import axios from "axios";

// Sets nakamoto coeffs from URL params.

export default combineReducers({
  routing: routerReducer,
  data: (state = {}, action) => {
    return state;
  }
});

/* Actions */
export const getData = () => {
  return {
    type: "GET_DATA"
  };
};
