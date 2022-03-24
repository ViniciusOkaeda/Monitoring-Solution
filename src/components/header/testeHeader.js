import React, {useEffect, useState} from 'react';

import Container from '../../styles/theme/components/Container';
import IconStyle from '../../styles/theme/components/IconStyle';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


import './index.css';

export default function TesteHeader() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };



    return (
      <div className='headerConfig'>
          <header>
            <div></div>
            <Container className='headerContent'>
                <div className='headerJustify'>
                    <div className='responsiveMenu'>
                        <IconButton>
                          <IconStyle>
                            <MenuIcon style={{width: 30, height: 30}} />
                          </IconStyle>
                        </IconButton>
                        
                    </div>

                    <div className='responsiveProfileMenu'>

                    <IconButton 
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
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
                            vertical: 'top',
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
                            <Container style={{width: '100%', height: '100%', padding: 10}}>

                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </Container>
                        </Menu>
                    </div>
                </div>
            </Container >
        </header>
      </div>
      );
}