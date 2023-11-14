
import React from 'react';
import { NavBar } from '../../components/NavBar';
import { GlobalLayout } from '../../layouts/Pages';
import { Table } from '../../components/Table';
import { Link } from 'react-router-dom';

const header = [
  'Primer Nombre', 
  'Segundo Nombre',
  'Primer Apellido',
  'Segundo Apellido'
]

const data = [
  {
    id: 1,
    firstName: 'Edgar',
    secondName: 'Daniel',
    firstLastName: 'Bustillos',
    secondLastName: 'Rivera'
  },
  {
    id: 2,
    firstName: 'Edgardo',
    secondName: 'Antonio',
    firstLastName: 'Bustillos',
    secondLastName: 'Terrazas'
  },
  {
    id: 3,
    firstName: 'Rosa',
    secondName: 'Amelia',
    firstLastName: 'Rivera',
    secondLastName: 'Ayon'
  },
  {
    id: 4,
    firstName: 'Rosa',
    secondName: 'Isabel',
    firstLastName: 'Bustillos',
    secondLastName: 'Rivera'
  }
];

export const PersonsPage = ()=>{
  return(
    <div>   
      <Table 
        headers={[...header, '']}  
        body={
          data.map(
            (person) => {
              return [
                ...Object.values(person).filter((elem, index)=>{return index !== 0}), 
                  (<Link to={`/persons/${person.id}`}> Go to person</Link>)]
            }
          ) 
        } />
    </div>
  )
}
