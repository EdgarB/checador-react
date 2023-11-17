import React from "react";
import { Logs } from "../../../features/logs/Logs";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

export const PersonsLogsPage = ()=>{
  const {personId} = useParams()
  return(
    <div className="w-full flex flex-col items-center">
      <Link className=' mb-4 self-start' to={`/persons`}> {'<'} <span className='underline'>Regresar a Personas</span></Link>
      <h1 className='w-full text-center mb-2 text-2xl'>Registros</h1>
      <Logs personId={personId}/>
    </div>
  )
}