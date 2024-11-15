import React from 'react'
import './header.css';
import { NavLink} from 'react-router-dom';
import { Button } from '@mui/material';

const Header = ({signOutFunction}) => {
  return (
      <div className='nav'>
        <div className='logo'>
          <img src={require('../images/logo.png')}  alt='' className='headerLogo'></img>
        </div>
        <div className='navbarItems'>
          <NavLink end to='/'> Home </NavLink>
          <NavLink end to='/highlights'> Highlights </NavLink>
          <Button style={{backgroundColor: "orange", color: "white"}} onClick={signOutFunction}> Sign Out</Button>
        </div>
      </div>
  )
}

export default Header