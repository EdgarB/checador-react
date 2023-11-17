import React from "react";
import { Table } from "../../components/Table";
import { createOrUpdateLogAction, selectPersonLogsGroupedByDay } from "./LogsSlice";
import { selectPerson } from "../persons/PersonsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";
import { DEFAULT_DATE_FORMAT, END_MEAL_LOG_TYPE, END_WORK_LOG_TYPE, JUSTIFIED_LOG_STATE, TIME_DELAY_LOG_STATE, START_MEAL_LOG_TYPE, START_WORK_LOG_TYPE, LOGGER_OMMITED_DAYS } from "../../app/constants";
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
  const {logObj, type, logDate} = props;

  const logState = logObj !== undefined ? logObj.state : 'Sin registro';

  const canJustify = !logObj || (logObj.state === TIME_DELAY_LOG_STATE);

  const onJustifyClick = () => {
    if(logObj){
      dispatch(createOrUpdateLogAction({...logObj, state: JUSTIFIED_LOG_STATE}))
    }else{
      dispatch(createOrUpdateLogAction({
        id: uuidv4(),
        state: JUSTIFIED_LOG_STATE,
        createdAt: moment().format(),
        logDate: logDate,
        type: type,
        personId: props.personId,
      }))
    }
  }

  const button = () => {
    if(canJustify){
      return(
        <Button onClick={onJustifyClick}>Justificar</Button>
      )
    }else{
      return(null)
    }
  }

  return(
    <div className="flex flex-col">
      <div className="mb-2">{logState}</div>
      {logObj && (
        <div className="mb-2">{moment(logObj.createdAt).format('h:mm:ss a')}</div>
      )}
      {button()}
    </div>
  )
}

export const Logs = (props) => {
  const person = useSelector(selectPerson(props.personId))
  const personLogs = useSelector(selectPersonLogsGroupedByDay(props.personId))
  console.log('personLogs ->', personLogs)

  const logRow = (logsInDate, logDate) => {
    return [
      moment(logDate).format(`${DEFAULT_DATE_FORMAT} dddd`),
      <Log key={`${logDate}-1`} logObj={logsInDate[START_WORK_LOG_TYPE]} type={START_WORK_LOG_TYPE} personId={props.personId} logDate={logDate}/>,
      <Log key={`${logDate}-2`} logObj={logsInDate[START_MEAL_LOG_TYPE]} type={START_MEAL_LOG_TYPE} personId={props.personId} logDate={logDate}/>,
      <Log key={`${logDate}-3`} logObj={logsInDate[END_MEAL_LOG_TYPE]} type={END_MEAL_LOG_TYPE} personId={props.personId} logDate={logDate}/>,
      <Log key={`${logDate}-4`} logObj={logsInDate[END_WORK_LOG_TYPE]} type={END_WORK_LOG_TYPE} personId={props.personId} logDate={logDate}/>
    ]
  }

  let tBody = [];
  if(person){
    let date = moment(person.loggingSince);
    console.log(date)
    const tomorrow = moment().add(1, 'days');
    while(date.isBefore(tomorrow)){
      if(!LOGGER_OMMITED_DAYS.includes(date.day())){
        const dateS = date.format(DEFAULT_DATE_FORMAT)
        tBody = [logRow(personLogs[dateS] || {}, dateS), ...tBody]
      }
      date.add(1, 'days');
    }
  }
  
  const personsName = () => {
    if(!person){
      return '';
    }
    return ` de ${person.firstName} ${person.firstSurname}`;
  }

  return(
      <div>
        <h1 className='w-full text-center mb-2 text-2xl'>Registros{personsName()}</h1>
          <Table 
          headers= {header}
          body= {tBody}
        />
      </div>
  );
}