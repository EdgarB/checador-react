import React from 'react';
import './NavBar.scss';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
    return(
        <div className='c-navbar'>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/persons'>Persons</NavLink>
        </div>
    )
}