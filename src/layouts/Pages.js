import React from 'react';
import { NavBar } from '../components/NavBar';
import './Pages.scss';
import { Outlet } from 'react-router-dom';

export const PagesLayout = (props) => {
  return(
    <main className='l-global-layout'>
      <NavBar/>
      <div className='l-global-layout__body'>
        <Outlet/>
      </div>
      
    </main>
  )
}