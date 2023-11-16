import React from "react";
import './Table.scss';
export const Table = (props) => {
  return(
    <table className="c-table">
      <thead className="c-table__row">
        {props.headers.map((header)=>{
          return(<th className="c-table__data">{header}</th>)
        })} 
      </thead>
      <tbody>
        {props.body.map( (rowData) => {
          return(
            <tr className="c-table__row">
              {rowData.map((data)=>{return(<td className="c-table__data">{data}</td>)})}
            </tr>
          )
        })} 
      </tbody>
    </table>
  )
}