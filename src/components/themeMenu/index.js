import React, {useState, useEffect} from 'react';

import { darkModeAction } from '../../redux/actions/config_action';
import { useSelector, useDispatch } from "react-redux";

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
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
        <div className='fullwh'>
          <Container className='fullwh'>
            <Box
              sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
              role="presentation"
              onClick={toggleDrawer(anchor, false)}
              onKeyDown={toggleDrawer(anchor, false)}
            >
              <List style={{margin: 'auto', display: 'flex', flexDirection: 'column' }}>

                <div onClick={() => themeChange('light')} className='modeContainer'>
                  <div className='modeConfig'>
                    <div className='modeConfigColor modeColorLight'></div>
                    <p className='modeConfigP'>Light Mode</p>
                  </div>
                </div>

                <div onClick={() => themeChange('dark')} className='modeContainer'>
                  <div className='modeConfig'>
                    <div className='modeConfigColor modeColorDark'></div>
                    <p className='modeConfigP'>Dark Mode</p>
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
                <div onClick={toggleDrawer(anchor, true)} className='buttonEventConfig'>
                    <SettingsIcon  className="effect buttonEventConfigIcon"/>

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
