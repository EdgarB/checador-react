import React from 'react';
import { Persons } from '../../features/persons/Persons';
import { Link } from 'react-router-dom';

export const PersonsPage = ()=>{
  return(
    <div className='flex items-center flex-col w-full'>
      <h1 className='w-full text-center text-2xl mb-2'>Personas</h1>
      <Link className='underline mb-4' to={`/persons/new`}> Registrar nueva persona</Link>
      <Persons/>
    </div>
  )
}
