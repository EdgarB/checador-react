import React from 'react';
import './NavBar.scss';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
    return(
        <div className='c-navbar'>
            <NavLink to='/'>Inicio</NavLink>
            <NavLink to='/persons'>Personas</NavLink>
        </div>
    )
}