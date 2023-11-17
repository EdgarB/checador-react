import React from "react";
import { Table } from '../../components/Table';
import { Link } from 'react-router-dom';
import {useSelector } from "react-redux";
import {selectPersonsAsArray } from './PersonsSlice';

const header = [
  'ID',
  'Primer Nombre', 
  'Segundo Nombre',
  'Primer Apellido',
  'Segundo Apellido',
  ''
]

export const Persons = () => {
  const personsData = useSelector(selectPersonsAsArray);

  return(
    <Table 
      headers={header}  
      body={
        personsData.map(
          (person) => {
            console.log(person)
            return [
              person.id,
              person.firstName,
              person.secondName,
              person.firstSurname,
              person.secondSurname, 
              (<Link className='underline' to={`/persons/${person.id}`}> Ver registros</Link>)]
          }
        ) 
      } 
    />
  )
}