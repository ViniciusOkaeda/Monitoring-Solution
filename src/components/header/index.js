import React, {useEffect, useState} from 'react';

import Container from '../../styles/theme/components/Container';
import IconStyle from '../../styles/theme/components/IconStyle';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


import './index.css';
import { Navigate, useNavigate } from 'react-router-dom';

function Header(props) {
    const navigate = useNavigate();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleMenu2 = (event) => {
      setAnchorEl2(event.currentTarget);
    };
  
    const handleClose2 = () => {
      setAnchorEl2(null);
    };
  
    const logoutSystem = () => {
      localStorage.clear();
      navigate('/');

    };



    return (
      <div className='headerConfig'>
          <header>
            <div></div>
            <Container className='headerContent'>
                <div className='headerJustify'>
                    <div className='responsiveMenu'>
                        <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu2}
                        >
                          <IconStyle>
                            <MenuIcon style={{width: 30, height: 30}} />
                          </IconStyle>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl2}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl2)}
                            onClose={handleClose2}
                        > 
                            <Container style={{width: '100%', height: '100%', padding: '20px 10px 20px 10px', marginTop: '-10px', marginBottom: '-10px'}}>

                            <MenuItem >Home</MenuItem>
                            <MenuItem >Watching</MenuItem>
                            <MenuItem >Packages</MenuItem>
                            </Container>
                        </Menu>
                        
                    </div>

                    <div className='responsiveProfileMenu'>

                    <IconButton 
                        aria-label="navigation of current user"
                        aria-controls="menu-appbar-navigation"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        >
                        <IconStyle>
                          <AccountCircle style={{width: 30, height: 30}}/>
                        </IconStyle>
                    </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        > 
                            <Container style={{width: '100%', height: '100%', padding: 10, marginTop: '-10px', marginBottom: '-10px'}}>

                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={logoutSystem}>Logout</MenuItem>
                            </Container>
                        </Menu>
                    </div>
                </div>
            </Container >
        </header>
      </div>
      );
}

export default Header;