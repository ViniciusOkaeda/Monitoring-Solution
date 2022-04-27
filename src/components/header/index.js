import React, {useEffect, useState, useRef} from 'react';

import Container from '../../styles/theme/components/Container';
import IconStyle from '../../styles/theme/components/IconStyle';
import DropDownHeader from '../../styles/theme/components/DropDownHeader';
import DropDownList from '../../styles/theme/components/DropDownList';

import styled from "styled-components";

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


import './index.css';
import { useNavigate } from 'react-router-dom';

const DropDownListContainer = styled("div")``;

const ListItem = styled("li")`
    list-style: none;
    margin-bottom: 0.8em;
  `;

  let useClickOutside = (handler) => {
    let domNode = useRef();
  
    useEffect(() => {
      let maybeHandler = (event) => {
        if (!domNode.current.contains(event.target)) {
          handler();
        }
      };
  
      document.addEventListener("mousedown", maybeHandler);
  
      return () => {
        document.removeEventListener("mousedown", maybeHandler);
      };
    });
  
    return domNode;
  };

function Header(props) {
    const navigate = useNavigate();
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [isOpen, setIsOpen] = useState(false);
    
    const toggling = () => setIsOpen(!isOpen);
    let domNode = useClickOutside(() => {
        setIsOpen(false);
      });
  
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
                      <div ref={domNode} >
                        <DropDownHeader className={isOpen === true ? 'openDropDown' : '' } onClick={toggling}>
                          <AccountCircle/>
                        </DropDownHeader>
                        {isOpen && (
                          <DropDownListContainer>
                            <DropDownList>
                              <ListItem >
                                <div style={{fontSize: 14}}>
                                  <p>Profile</p>
                                  <p onClick={logoutSystem}>Logout</p>
                                </div>
                              </ListItem>
                            </DropDownList>
                          </DropDownListContainer>
                        )}
                      </div>
                        
                    </div>
                </div>
            </Container >
        </header>
      </div>
      );
}

export default Header;