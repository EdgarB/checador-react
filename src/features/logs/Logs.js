import React, { useEffect } from "react";
import { Table } from "../../components/Table";
import { justifyLog, loadLogs, selectLogs, selectPersonLogsGroupedByDay } from "./LogsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Button";

const header = [
  'Fecha',
  'Entrada',
  'Salida a comer',
  'Regreso de comer',
  'Salida'
]


const Log = (props) =>{
  const dispatch = useDispatch()
  const {logObj} = props;

  const logState = logObj !== undefined ? logObj.state : 'Not registered';
  const canJustify = !logObj || logObj.state !== 'A tiempo';

  return(
    <div>
      {logState}
      {canJustify && <Button>Justify</Button>}
    </div>
  )
}

export const Logs = (props) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadLogs())
  }, [])

  console.log(useSelector(selectLogs))
  const personLogs = useSelector(selectPersonLogsGroupedByDay(props.personId))
  const tBody = Object.keys(personLogs).map((logDate) => {
    const logsInDate = personLogs[logDate]
    return [
      logDate,
      <Log logObj={logsInDate['Entrada']}/>,
      <Log logObj={logsInDate['Salida a comer']}/>,
      <Log logObj={logsInDate['Regreso de comer']}/>,
      <Log logObj={logsInDate['Salida']}/>
    ]
  });

  return(
    <Table 
      headers= {header}
      body= {tBody}
    />
  );
}