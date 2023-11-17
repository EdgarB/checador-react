import React, { useEffect } from "react";
import { Table } from '../../components/Table';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loadPersons, selectPersonsAsArray } from './PersonsSlice';

const header = [
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
              person.firstName,
              person.secondName,
              person.firstSurname,
              person.secondSurname, 
              (<Link to={`/persons/${person.id}`}> Go to person</Link>)]
          }
        ) 
      } 
    />
  )
}