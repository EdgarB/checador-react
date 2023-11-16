import moment from "moment";
import { END_MEAL_LOG_TYPE, END_WORK_LOG_TYPE, LATE_LOG_STATE, ON_TIME_LOG_STATE, START_WORK_LOG_TYPE } from "./app/constants";

const nowTime = moment().format();
export const logsData = {
  '25': {
    id: '25',
    createdAt: nowTime,
    state: ON_TIME_LOG_STATE,
    type: START_WORK_LOG_TYPE,
    personId: '1',
  },
  '26': {
    id: '26',
    createdAt: nowTime,
    state: LATE_LOG_STATE,
    type: END_MEAL_LOG_TYPE,
    personId: '1',
  },
  '28': {
    id: '28',
    createdAt: nowTime,
    state: ON_TIME_LOG_STATE,
    type: END_WORK_LOG_TYPE,
    personId: '1',
  },
}


export const persons = {
  '1': {
    id: 1,
    firstName: 'Edgar',
    secondName: 'Daniel',
    firstLastName: 'Bustillos',
    secondLastName: 'Rivera'
  },
  '2': {
    id: 2,
    firstName: 'Edgardo',
    secondName: 'Antonio',
    firstLastName: 'Bustillos',
    secondLastName: 'Terrazas'
  },
  '3': {
    id: 3,
    firstName: 'Rosa',
    secondName: 'Amelia',
    firstLastName: 'Rivera',
    secondLastName: 'Ayon'
  },
  '4': {
    id: 4,
    firstName: 'Rosa',
    secondName: 'Isabel',
    firstLastName: 'Bustillos',
    secondLastName: 'Rivera'
  }
};