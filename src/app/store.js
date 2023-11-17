import { configureStore } from "@reduxjs/toolkit";
import { logsReducer } from "../features/logs/LogsSlice";
import {personsReducer} from "../features/persons/PersonsSlice";
import appStatusReducer from '../features/appStatus/AppStatusSlice';
// import reducers
export const store = configureStore({
  reducer: {
    logs: logsReducer,
    persons: personsReducer,
    appStatus: appStatusReducer,
  },
});
