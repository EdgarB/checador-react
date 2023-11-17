import React from 'react';
import { NavBar } from '../components/NavBar';
import './AppLayout.scss';
import { Outlet } from 'react-router-dom';
import { AppStatusModal } from '../features/appStatus/AppStatusModal';

export const AppLayout = (props) => {
  return(
    <main className='l-global-layout'>
      <NavBar/>
      <AppStatusModal/>
      <div className='l-global-layout__body'>
        <Outlet/>
      </div>
      
    </main>
  )
}