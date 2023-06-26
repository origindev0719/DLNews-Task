import { configureStore } from "@reduxjs/toolkit";
import protocolsReducer from "./features/ProtocolSlice";
// import logger from "redux-logger";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: { protocol: protocolsReducer },
  middleware: [thunk],
});
