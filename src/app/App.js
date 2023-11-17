import React, { useEffect } from 'react';
import {HomePage} from '../pages/Home';
import {PersonsPage} from '../pages/persons';
import {ErrorPage} from '../pages/errors/show';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { AppLayout } from './AppLayout';
import { PersonsLogsPage } from '../pages/persons/logs';
import { useDispatch } from 'react-redux';
import { loadLogs } from '../features/logs/LogsSlice';
import { fetchPersons } from '../features/persons/PersonsSlice';
import './momentConfig';
import { NewPersonPage } from '../pages/persons/new';
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/"
    element={<AppLayout/>}
    errorElement ={<ErrorPage/>} >
      <Route path='' element={<HomePage/>}></Route>
      <Route path='persons/' element={<PersonsPage/>}></Route>
      <Route path='persons/:personId' element={<PersonsLogsPage/>}></Route>
      <Route path='persons/new' element={<NewPersonPage/>}></Route>
  </Route>
));

export const App = ()=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadLogs());
    dispatch(fetchPersons());
  }, [dispatch])

  return(
    <RouterProvider router={router} />
  )
}