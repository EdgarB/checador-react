import React, { useEffect, useState } from "react";
import { InputText } from "../components/InputText";
import { Button } from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectPerson } from "./persons/PersonsSlice";
import { createLog, selectOrderedTodaysPersonLogs, selectTodaysPersonLogs} from "./logs/LogsSlice";
import './Logger.scss';
import { END_MEAL_LOG_TYPE, END_WORK_LOG_TYPE, END_WORK_TIME, START_MEAL_LOG_TYPE, START_WORK_LOG_TYPE, TIMES_BY_LOG_TYPE } from "../app/constants";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export const Logger = () => {

  const [personId, setPersonId] = useState('')
  const person = useSelector(selectPerson(personId));
  const orderedTodaysLogs = useSelector(selectOrderedTodaysPersonLogs(personId));
 
  const dispatch = useDispatch();

  
  const createLogFor = (logType)=>{
    return () => {
      const logTypeTimeLimit = moment(TIMES_BY_LOG_TYPE[logType], 'hh:mm');
      const currentTime = moment();
      const isOnTime = currentTime.isBefore(logTypeTimeLimit);
      const state = isOnTime ? 'onTime' : 'late';

      const newLog = {
        id: uuidv4(),
        state: state,
        created_at: currentTime.format(),
        type: logType,
        personId: personId,
      }
      console.log(newLog)
      dispatch(createLog(newLog))
    }
  }


  const actions = () => {
    if(person){
      return(
        <div className="c-logger__actions">
          {Object.keys(orderedTodaysLogs).map((logKey)=>{
            const hasValue = orderedTodaysLogs[logKey] !== null;
            if(hasValue){

              return(
                <div>Checado {orderedTodaysLogs[logKey].toLowerCase()} para {logKey}</div>
              )
            }else{
              return(
                <Button onClick={createLogFor(logKey)} >Checa para {logKey}</Button>
              )
            }
            
          })}

        </div>
        
      )
    }else if(personId){
      return 'Please add a correct Id';
    }else{
      return 'Insert an ID to check'
    }
  }

  return(
    <div className="c-logger">
      <InputText placeholder={'Escribe tu id aqui'} className='c-logger__input' value={personId} onChange={(event)=>{setPersonId(event.currentTarget.value)}}/>
      {actions()}
    </div>
  )
}