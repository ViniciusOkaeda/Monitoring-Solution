import React from 'react';

import './index.css';

import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Link from '@material-ui/core/Link';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SummarizeIcon from '@mui/icons-material/Summarize';

import Links from '../../styles/theme/components/Links';
import BackgroundLogo from '../../styles/theme/components/BackgroundLogo';
import Container from '../../styles/theme/components/Container';

export default function PermanentDrawerLeft() {


    return (
      <div className='drawerConfig'>

      <Container style={{ borderRadius: 10, minWidth: 60, height: '100%', maxWidth: 80, position: 'fixed', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Toolbar />
      <BackgroundLogo/>

      <Divider />
      <List style={{paddingTop: 50, paddingBottom: 10, paddingLeft: 30  }}>

      <ListItem button className='click' >
        <ListItemIcon className='icone'>
          <Links>
          <DashboardIcon />
          </Links>
        </ListItemIcon >
        <Link href="/dashboard" className='linkEffect' underline="none" >
          <ListItemText primary="Home"   className='link' />
        </Link>
      </ListItem>

      <ListItem button className='click' >
        <ListItemIcon className='icone'>
          <Links>
          <MonitorHeartIcon />
          </Links>
        </ListItemIcon >
        <Link href="/watching" className='linkEffect' underline="none" >
          <ListItemText primary="Watching" className='link' />
        </Link>
      </ListItem>

      <ListItem button className='click' >
        <ListItemIcon className='icone'>
          <Links>
          <SummarizeIcon />
          </Links>
        </ListItemIcon >
        <Link href="/packages" className='linkEffect' underline="none" >
          <ListItemText primary="Packages"  className='link'/>
        </Link>
      </ListItem>

      </List>

      </Container>
      </div>
      );
}