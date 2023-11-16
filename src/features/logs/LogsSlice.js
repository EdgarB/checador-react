import { createSlice } from '@reduxjs/toolkit'
import {logsData} from '../../data.js'
import moment from 'moment';
import { START_WORK_LOG_TYPE, START_MEAL_LOG_TYPE, END_MEAL_LOG_TYPE, END_WORK_LOG_TYPE } from '../../app/constants.js';

export const loadLogs = () => {
  return {
    type: 'logs/loadLogs',
    payload: logsData
  }
}
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

const logsSlice = createSlice({
  name: 'logs',
  initialState: {},
  reducers: {
    loadLogs: (state, action) => {
      return action.payload;
    },
    createLog: (state, action) =>{
      state[action.payload.id] = action.payload
      return state;
    },
    justifyLog: (state, action) => {
      if(!(action.payload.id in state)){
        state[action.payload.id] = action.payload
      }
      state[action.payload.id].state = 'justified';
      return state;
    }
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


export const {
  createLog,
  justifyLog
} = logsSlice.actions;

export const logsReducer = logsSlice.reducer;
export default logsReducer;