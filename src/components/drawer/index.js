import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Container from '../../styles/theme/components/Container';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Link from '@material-ui/core/Link';
import Links from '../../styles/theme/components/Links';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import './index.css';
import YplayLogo from '../../assets/yplay.png';
import BackgroundLogo from '../../styles/theme/components/BackgroundLogo';


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
        <Link href="/" className='linkEffect' underline="none" >
        <Links >
          <ListItemText   className='link'>Home a</ListItemText>
        </Links>
        </Link>
      </ListItem>

      <ListItem button className='click' >
        <ListItemIcon className='icone'>
          <Links>
          <NotificationAddIcon />
          </Links>
        </ListItemIcon >
        <Link href="/products" className='linkEffect' underline="none" >
        <Links>
          <ListItemText primary="New Product" className='link' />
        </Links>
        </Link>
      </ListItem>

      <ListItem button className='click' >
        <ListItemIcon className='icone'>
          <Links>
          <DashboardIcon />
          </Links>
        </ListItemIcon >
        <Link href="/" className='linkEffect' underline="none" >
        <Links >
          <ListItemText primary="Home"  className='link'/>
        </Links>
        </Link>
      </ListItem>

      <ListItem button className='click' >
        <ListItemIcon className='icone'>
          <Links>
          <NotificationAddIcon />
          </Links>
        </ListItemIcon >
        <Link href="/products" className='linkEffect' underline="none" >
        <Links>
          <ListItemText primary="New Product" className='link' />
        </Links>
        </Link>
      </ListItem>




      </List>

      </Container>
      </div>
      );
}