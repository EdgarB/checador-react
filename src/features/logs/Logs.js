import React, { useEffect } from "react";
import { Table } from "../../components/Table";
import { justifyLog, loadLogs, selectLogs, selectPersonLogsGroupedByDay } from "./LogsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { END_MEAL_LOG_TYPE, END_WORK_LOG_TYPE, JUSTIFIED_LOG_STATE, LATE_LOG_STATE, ON_TIME_LOG_STATE, START_MEAL_LOG_TYPE, START_WORK_LOG_TYPE } from "../../app/constants";
import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

const header = [
  'Fecha',
  'Entrada',
  'Salida a comer',
  'Regreso de comer',
  'Salida'
]


const Log = (props) =>{
  const dispatch = useDispatch()
  const {logObj, type} = props;

  const logState = logObj !== undefined ? logObj.state : 'Not registered';
  const canJustify = !logObj || (logObj.state == LATE_LOG_STATE);
  console.log('can justify', canJustify)
  const onJustifyClick = () => {
    if(logObj){
      dispatch(justifyLog(logObj))
    }else{
      dispatch(justifyLog({
        id: uuidv4(),
        state: JUSTIFIED_LOG_STATE,
        created_at: moment().format(),
        type: type,
        personId: props.personId,
      }))
    }
  }

  const button = () => {
    if(canJustify){
      console.log('justified!!!')
      return(
        <Button onClick={onJustifyClick}>Justify</Button>
      )
    }else{
      return(null)
    }
  }
  return(
    <div>
      {logState}
      {button()}
    </div>
  )
}

export const Logs = (props) => {
  const personLogs = useSelector(selectPersonLogsGroupedByDay(props.personId))
  const tBody = Object.keys(personLogs).map((logDate) => {
    const logsInDate = personLogs[logDate]
    return [
      logDate,
      <Log key={`${logDate}-1`} logObj={logsInDate[START_WORK_LOG_TYPE]} type={START_WORK_LOG_TYPE} personId={props.personId}/>,
      <Log key={`${logDate}-2`} logObj={logsInDate[START_MEAL_LOG_TYPE]} type={START_MEAL_LOG_TYPE} personId={props.personId}/>,
      <Log key={`${logDate}-3`} logObj={logsInDate[END_MEAL_LOG_TYPE]} type={END_MEAL_LOG_TYPE} personId={props.personId}/>,
      <Log key={`${logDate}-4`} logObj={logsInDate[END_WORK_LOG_TYPE]} type={END_WORK_LOG_TYPE} personId={props.personId}/>
    ]
  });

  return(
    
      <Table 
        headers= {header}
        body= {tBody}
      />
    
  );
}