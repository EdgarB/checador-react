import React from 'react';
import { Persons } from '../../features/persons/Persons';

export const PersonsPage = ()=>{
  return(
    <div className='flex items-center flex-col w-full'>
      <h1 className='w-full text-center text-2xl mb-2'>Persons</h1>
      <Persons/>
    </div>
  )
}
