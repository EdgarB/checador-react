import React from 'react';
import { NewPersonForm } from '../../features/persons/NewPersonForm';
import { Link } from 'react-router-dom';

export const NewPersonPage = ()=>{
  return(
    <div className='flex items-center flex-col w-full'>
      <Link className=' mb-4 self-start' to={`/persons`}> {'<'} <span className='underline'>Regresar a Personas</span></Link>
      <h1 className="w-full text-center mb-2 text-2xl">Registrar nueva persona</h1>
      <NewPersonForm/>
    </div>
  )
}