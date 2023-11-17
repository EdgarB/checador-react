import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {logsData} from '../../data.js'
import moment from 'moment';
import { START_WORK_LOG_TYPE, START_MEAL_LOG_TYPE, END_MEAL_LOG_TYPE, END_WORK_LOG_TYPE } from '../../app/constants.js';
import { getLogs, createOrUpdateLog } from '../../app/firebase.js'; 


/*
Logs
{
  [id]: {
    id: @String,
    state: ['justified', 'onTime, 'late'],
    createdAt: @Date as @String,
    type: ['Entrada del dia','Salida a comer', 'Regreso de comer', 'Salida del dia']
  },
  ...
}

*/

export const loadLogs = createAsyncThunk(
  'logs/loadLogs',
  async (personId, thunkAPI) => {
    const response = await getLogs();
    return response;
  }
);

export const createOrUpdateLogAction = createAsyncThunk(
  'logs/createLogs',
  async(log, thunkAPI) => {
    const response = await createOrUpdateLog(log)
    return response;
  }
)

const logsSlice = createSlice({
  name: 'logs',
  initialState: {},
  reducers: {},
  extraReducers: {
    [loadLogs.fulfilled]: (state, action) => {
      console.log('logs!', action.payload)
      return {...state, ...action.payload}
    },
    [createOrUpdateLogAction.fulfilled]: (state, action) =>{
      state[action.payload.id] = action.payload
      return state;
    },
  }
}); 



export const selectLogs = (state) => {
  return state.logs;
}

export const selectPersonLogs = (personId) => {
  return (state) => {
    const logs = selectLogs(state)
    return  Object.values(logs).filter((log) => {
       return log.personId == personId})
  }
}

export const selectPersonLogsGroupedByDay = (personId) => {
  return (state) => {
    const logsGrouped = {};
    const personLogs = selectPersonLogs(personId)(state);
    personLogs.forEach((log) => {
      const sDate = moment(log.createdAt).format('MM/DD/YYYY');

      if(!(sDate in logsGrouped)){
        logsGrouped[sDate] = {};
      }
      logsGrouped[sDate][log.type] = log;
    })
    return logsGrouped;
  }
}

export const selectTodaysPersonLogs = (personId) => {
  return (state) => {
    const personLogs = selectPersonLogsGroupedByDay(personId)(state);
    const todaysLogCreatedAt = moment().format('MM/DD/YYYY');

    if(personLogs && todaysLogCreatedAt in personLogs){
      return personLogs[todaysLogCreatedAt];
    }else{
      return null;
    }
  }
}

export const selectOrderedTodaysPersonLogs = (personId) => {
  return (state) => {
    const todaysLogs = selectTodaysPersonLogs(personId)(state)
    const orderedLogs = {
      [START_WORK_LOG_TYPE]: null,
      [START_MEAL_LOG_TYPE]: null,
      [END_MEAL_LOG_TYPE]: null,
      [END_WORK_LOG_TYPE]: null
    };
    if(todaysLogs !== null){
      Object.values(todaysLogs).forEach(element => {
        orderedLogs[element.type] = element.state
      });
    }
    return orderedLogs;  
  } 
}



export const logsReducer = logsSlice.reducer;
export default logsReducer;