import React, {useState, useEffect} from 'react';

import { darkModeAction } from '../../redux/actions/config_action';
import { useSelector, useDispatch } from "react-redux";

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';
import Container from '../../styles/theme/components/Container'

import './index.css';


export default function ThemeMenu() {
    const dispatch = useDispatch();
    const config = useSelector(state => state.config)
  const [ drawerType, setDrawerType] = useState('');

    useEffect(() => {
        if (!config.darkMode) {
          dispatch(darkModeAction(window.localStorage.getItem('theme')))
        }
      }, [config.darkMode, dispatch])
    
      const themeChange = (value) => {
        window.localStorage.setItem('theme', value)
        dispatch(darkModeAction(value))
      }
      const [state, setState] = React.useState({
        top: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (
          event &&
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <div style={{width: '100%', height: '100%',}}>
          <Container style={{width: '100%', height: '100%'}}>
            <Box
              sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
              role="presentation"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <List style={{margin: 'auto', display: 'flex', flexDirection: 'column' }}>

                <div onClick={() => themeChange('light')} style={{width: '100%', height: 40, }}>
                  <div style={{width: '90%', height: '100%',  margin: 'auto', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                    <div style={{ width: 30, height: 30, backgroundColor: 'white', borderStyle: 'solid', borderColor: '#333333', borderWidth: '1px', borderRadius: '50%',}}></div>
                    <p style={{fontWeight: 'bold', margin: 'auto'}}>Light Mode</p>
                  </div>
                </div>

                <div onClick={() => themeChange('dark')} style={{width: '100%', height: 40, }}>
                  <div style={{width: '90%', height: '100%',  margin: 'auto', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                    <div style={{ width: 30, height: 30, backgroundColor: 'black', borderStyle: 'solid', borderColor: '#333333', borderWidth: '1px', borderRadius: '50%',}}></div>
                    <p style={{fontWeight: 'bold', margin: 'auto'}}>Dark Mode</p>
                  </div>
                </div>


              </List>
            </Box>
          </Container>
        </div>

      );
    
      return (
        <div style={{width: 40, height: 40,}}>
          {['right', ].map((anchor) => (
            <React.Fragment key={anchor}>
                <div onClick={toggleDrawer(anchor, true)} 
                style={{
                    width: 40, 
                    height: 35, 
                    backgroundColor: 'rgb(255, 208, 0)', 
                    cursor: 'pointer', 
                    boxShadow: '2px 2px 2px black', 
                    borderRadius: '70% 70% 0 70%', 
                    position: 'fixed',
                    bottom: 20,
                    right: 20,

                    }}>
                    <SettingsIcon style={{
                        color: '#efefef', 
                        width: 25, 
                        height: 25,
                        paddingTop: 7, 
                        paddingLeft: 4, 
                        display: 'flex', 
                        margin: 'auto', 
                        alignItems: 'center', 
                        }} className="effect"/>

                </div>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))}
        </div>
      );

}
