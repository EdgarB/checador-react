import React from "react";
import { Table } from "../../../components/Table";

const header = [
  'Fecha',
  'Entrada',
  'Salida a comer',
  'Regreso de comer',
  'Salida'
]

const body = [
  ['12/10/2023','A tiempo', 'Tardio', '-', 'A tiempo'],
  ['13/10/2023','A tiempo', 'Tardio', '-', 'A tiempo'],
  ['14/10/2023','A tiempo', 'Tardio', '-', 'A tiempo'],
  ['15/10/2023','A tiempo', 'Tardio', '-', 'A tiempo']
]

export const PersonsLogsPage = ()=>{
  return(
    <div>
      <Table headers={header} body={body}/>
    </div>
  )
}