import React, { useEffect, useState } from "react";
import { InputText } from "../components/InputText";
import { Button } from "../components/Button";

export const Logger = () => {

  const [personId, setPersonId] = useState('')
  const [todaysLogs, setTodaysLogs] = useState(null);
  const [orderedTodaysLogs, setOrderedTodaysLogs] = useState(null)
  useEffect(
    () => {
      if(todaysLogs !== null){
        const orderedLogs = {
          'Entrada':null,
          'Salida a comer': null,
          'Regreso de comer': null,
          'Salida': null
        };
        
        todaysLogs.forEach(element => {
          orderedLogs[element.type] = element.state
        });
  
        setOrderedTodaysLogs(orderedLogs);
      }
    }
  , [todaysLogs])

  function getTodaysPersonLogs(){
    return [
      {
        id: 25,
        createdAt: new Date(),
        state: 'A tiempo',
        type: 'Entrada'
      },
      {
        id: 26,
        createdAt: new Date(),
        state: 'Tardia',
        type: 'Salida a comer'
      },
     
      {
        id: 28,
        createdAt: new Date(),
        state: 'A tiempo',
        type: 'Salida'
      },
    ]
  }

  function onProceedToLog(){
    setTodaysLogs(getTodaysPersonLogs());
  }

  function actions(){
    if(orderedTodaysLogs !== null){
      return(
        <div>
          {Object.keys(orderedTodaysLogs).map((logKey)=>{
            const hasValue = orderedTodaysLogs[logKey] !== null;
            if(hasValue){
              console.log(orderedTodaysLogs)
              return(
                <div>Checado {orderedTodaysLogs[logKey].toLowerCase()} para {logKey}</div>
              )
            }else{
              return(
                <Button>Checa para {logKey}</Button>
              )
            }
            
          })}

        </div>
        
      )
    }else{
      return;
    }
  }

  return(
    <div>
      <InputText placeholder={'Escribe tu id aqui'} value={personId} onChange={(event)=>{setPersonId(event.currentTarget.value)}}/>
      <Button onClick={onProceedToLog}>Proceed to log time</Button>
      {actions()}
    </div>
  )
}