import { TOGGLE_SPINNER, USER_LOGGEDIN_STATUS, GET_USER_LIST } from "./actions";

const intiState = {
    showSpinner: false,
    isUserLoggedIn: false,
    users: []
}

export function appReducer(state=intiState, action ){
  switch (action.type) {
    case TOGGLE_SPINNER:
      return {...state, showSpinner: action.payload};
    case USER_LOGGEDIN_STATUS:
      return {...state, isUserLoggedIn: action.payload};
    case GET_USER_LIST:
      return {...state, users: action.payload};
      default:
      return state;
  }
} 