import React, {useEffect, useState, useRef} from 'react';

import Container from '../../styles/theme/components/Container';
import DropDownHeader from '../../styles/theme/components/DropDownHeader';
import DropDownList from '../../styles/theme/components/DropDownList';

import styled from "styled-components";

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import './index.css';
import { useNavigate } from 'react-router-dom';

const DropDownListContainer = styled("div")`
`;

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

  let useClickOutside2 = (handler) => {
    let domNode2 = useRef();
  
    useEffect(() => {
      let maybeHandler = (event) => {
        if (!domNode2.current.contains(event.target)) {
          handler();
        }
      };
  
      document.addEventListener("mousedown", maybeHandler);
  
      return () => {
        document.removeEventListener("mousedown", maybeHandler);
      };
    });
  
    return domNode2;
  };

function Header(props) {
    const navigate = useNavigate();
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    
    const toggling = () => setIsOpen(!isOpen);
    let domNode = useClickOutside(() => {
      setIsOpen(false);
    });
    const toggling2 = () => setIsOpen2(!isOpen2);
    let domNode2 = useClickOutside2(() => {
      setIsOpen2(false);
    });
    
    const handleMenu2 = (event) => {
      setAnchorEl2(event.currentTarget);
    };
  
    const handleClose2 = () => {
      setAnchorEl2(null);
    };
  
    const logoutSystem = () => {
      localStorage.removeItem("token");
      clSystem();

    };

    const clSystem = () => {
      navigate('/');
      window.location.reload();
    }



    return (
      <div className='headerConfig'>
          <header>
            <div></div>
            <Container className='headerContent'>
                <div className='headerJustify'>
                    <div className='responsiveMenu'>
                    <div ref={domNode2} >
                        <DropDownHeader className={isOpen2 === true ? 'openDropDown' : '' } onClick={toggling2}>
                          <MenuIcon/>
                        </DropDownHeader>
                        {isOpen2 && (
                          <DropDownListContainer style={{position: 'absolute', zIndex: 3}}>
                            <DropDownList>
                              <ListItem className='listConfig'>
                                <ul>
                                  <li ><a href="/now">Home</a></li>
                                  <li><a href="/history">History</a></li>
                                </ul>
                                
                                
                                
                                
                              </ListItem>
                            </DropDownList>
                          </DropDownListContainer>
                        )}
                      </div>
                        
                    </div>

                    <div className='responsiveProfileMenu'>
                      <div ref={domNode} >
                        <DropDownHeader className={isOpen === true ? 'openDropDown' : '' } onClick={toggling}>
                          <AccountCircle/>
                        </DropDownHeader>
                        {isOpen && (
                          <DropDownListContainer className='dropDownList'>
                            <DropDownList>
                              <ListItem >
                                <div style={{fontSize: 14, cursor: 'pointer'}}>
                                  <p   onClick={logoutSystem} >Logout</p>
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