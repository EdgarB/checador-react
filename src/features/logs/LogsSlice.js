import { createSlice } from '@reduxjs/toolkit'
import {logsData} from '../../data.js'

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
      return Object.assign({}, state, {[action.payload.id]: action.payload})
    },
    justifyLog: (state, action) => {
      if(action.payload in state){
        state[action.payload].state = 'justified';
      }
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
    console.log(personLogs)
    personLogs.forEach((log) => {
      const sDate = formatLogCreatedAt(log.createdAt);

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
    const todaysLogCreatedAt = formatLogCreatedAt(new Date());

    if(personLogs && todaysLogCreatedAt in personLogs){
      return personLogs[todaysLogCreatedAt];
    }else{
      return null;
    }
  }
}


export const formatLogCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  const sDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear}`;
  return sDate;
}


export const {
  createLog,
  justifyLog
} = logsSlice.actions;

export const logsReducer = logsSlice.reducer;
export default logsReducer;