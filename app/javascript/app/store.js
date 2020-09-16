import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "./reducers";
import middleware from "./middleware";

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);
