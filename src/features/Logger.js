import React, { useState } from "react";
import { InputText } from "../components/InputText";
import { Button } from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectPerson } from "./persons/PersonsSlice";
import { createOrUpdateLogAction, selectOrderedTodaysPersonLogs} from "./logs/LogsSlice";
import './Logger.scss';
import {DEFAULT_DATE_FORMAT, END_MEAL_LOG_TYPE, END_WORK_LOG_TYPE, TIME_DELAY_LOG_STATE, ON_TIME_LOG_STATE, START_MEAL_LOG_TYPE, START_WORK_LOG_TYPE, TIMES_BY_LOG_TYPE } from "../app/constants";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


export const Logger = () => {

  const [personId, setPersonId] = useState('')
  const person = useSelector(selectPerson(personId));
  const orderedTodaysLogs = useSelector(selectOrderedTodaysPersonLogs(personId));
 
  const dispatch = useDispatch();
  
  const isLogOnTime = (logType, logTime, logTypeTimeLimit) => {
    switch(logType) {
      case START_WORK_LOG_TYPE:
        return logTime.isBefore(logTypeTimeLimit);
      case START_MEAL_LOG_TYPE:
        return logTime.isAfter(logTypeTimeLimit);
      case END_MEAL_LOG_TYPE:
        return logTime.isBefore(logTypeTimeLimit);
      case END_WORK_LOG_TYPE:
        return logTime.isAfter(logTypeTimeLimit);
      default:
        return null;
    }
  }



  const createLogFor = (logType)=>{
    return () => {
      const logTypeTimeLimit = moment(TIMES_BY_LOG_TYPE[logType], 'hh:mm');
      const currentTime = moment();
      const state = isLogOnTime(logType, currentTime, logTypeTimeLimit) ? ON_TIME_LOG_STATE : TIME_DELAY_LOG_STATE;

      const newLog = {
        id: uuidv4(),
        state: state,
        created_at: currentTime.format(),
        type: logType,
        personId: personId,
        logDate: currentTime.format(DEFAULT_DATE_FORMAT)
      }
      console.log(newLog)
      dispatch(createOrUpdateLogAction(newLog))
    }
  }

  const logTypeCell = (logType, state) => {
    if(state){
      return(
        <div className='c-logger__log-type-cell'>
          <span className="mb-2">{logType}</span>
          <span className="mb-2">Checado</span> 
          {state} 
        </div>
      )
    }else{
      return(
        <div className='c-logger__log-type-cell'>
          <span className="mb-2">{logType}</span>
          <Button onClick={createLogFor(logType)} >Checar</Button>
        </div>
      )
    }
  }

  const actions = () => {
    if(person){
      return(
        <div className="c-logger__actions">
          {Object.keys(orderedTodaysLogs).map((logType)=>{
            return logTypeCell(logType,orderedTodaysLogs[logType] ) 
          })}
        </div>
      )
    }else if(personId){
      return 'Por favor escriba una ID correcta';
    }else{
      return 'Escriba su ID por favor'
    }
  }

  const personsName = () => {
    if(!person){
      return '';
    }
    return ` ${person.firstName} ${person.firstSurname}`
  }

  return(
    <div className="c-logger">
      <h1 className='c-logger__header'>Bienvenido{personsName()}</h1>
      <InputText placeholder={'Escribe tu id aqui'} className='c-logger__input mb-2' value={personId} onChange={(event)=>{setPersonId(event.currentTarget.value)}}/>
      {actions()}
    </div>
  )
}