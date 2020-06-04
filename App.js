import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import AppNavigator from "./navigator/AppNavigator";

const initialState = {
  action: "closeMenu",
  name: "Stranger",
  avatar: "http://p23.f4.n0.cdn.getcloudapp.com/items/DOuQlXJv/avatar_none.png"
};

const reducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case "OPEN_MENU":
      newState = { action: "openMenu" };
      break;
    case "CLOSE_MENU":
      newState = { action: "closeMenu" };
      break;
    case "UPDATE_NAME":
      newState = { name: action.name };
      break;
    case "UPDATE_AVATAR":
      newState = { avatar: action.avatar };
      break;
    case "OPEN_CARD":
      newState = { action: "openCard" };
      break;
    case "CLOSE_CARD":
      newState = { action: "closeCard" };
      break;
    case "OPEN_LOGIN":
      newState = { action: "openLogin" };
      break;
    case "CLOSE_LOGIN":
      newState = { action: "closeLogin" };
      break;
  }
  return { ...state, ...newState };
};

const store = createStore(reducer);

const App = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

export default App;
