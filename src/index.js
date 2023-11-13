import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {HomePage} from './pages/Home';
import {PersonsPage} from './pages/persons';
import {ErrorPage} from './pages/errors/show';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PagesLayout } from './layouts/Pages';
import { PersonsLogsPage } from './pages/persons/logs';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/"
    element={<PagesLayout/>}
    errorElement ={<ErrorPage/>} >
      <Route path='home' element={<HomePage/>}></Route>
      <Route path='persons/' element={<PersonsPage/>}></Route>
      <Route path='persons/:personId' element={<PersonsLogsPage/>}></Route>
  </Route>
));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
