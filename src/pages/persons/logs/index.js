import React from "react";
import { Table } from "../../../components/Table";
import { Logs } from "../../../features/logs/Logs";
import { useParams } from "react-router-dom";

export const PersonsLogsPage = ()=>{
  const {personId} = useParams()
  return(
    <div>
      <Logs personId={personId}/>
    </div>
  )
}