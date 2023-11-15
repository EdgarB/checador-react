import { configureStore } from "@reduxjs/toolkit";
import { logsReducer } from "../features/logs/LogsSlice";
import {personsReducer} from "../features/persons/PersonsSlice";
// import reducers
export const store = configureStore({
  reducer: {
    logs: logsReducer,
    persons: personsReducer,
  },
});
