import React from "react";
import { Table } from "../../../components/Table";
import { Logs } from "../../../features/logs/Logs";
import { useParams } from "react-router-dom";

export const PersonsLogsPage = ()=>{
  const {personId} = useParams()
  return(
    <div className="w-full flex flex-col items-center">
      <h1 className='w-full text-center mb-2 text-2xl'>Logs</h1>
      <Logs personId={personId}/>
    </div>
  )
}