import React, {useEffect, useState, useRef} from 'react';

import './index.css';

import { useNavigate } from "react-router-dom";

import api from '../../services/api';

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
import WorkIcon from '@mui/icons-material/Work';

import Links from '../../styles/theme/components/Links';
import BackgroundLogo from '../../styles/theme/components/BackgroundLogo';
import Container from '../../styles/theme/components/Container';

export default function PermanentDrawerLeft() {
  const [authVerify, setAuthVerify] = React.useState('');
  const [error, setError] = useState('');

  //console.log("o verify", authVerify);
  const navigate  = useNavigate();

  useEffect(() => {
    //const token = localStorage.getItem("token");
    //console.log("aqui", token);

    {/*
    (async () => {
      const result = await api.get('auth/verify', {
        headers: {
          token: localStorage.getItem("token")
        }
      })      
      .then((result) => {
        //console.log("o resultado", result.data.response)
        setAuthVerify(result.data.response.user)
        //setQtdVendor(result.data.response.length)
        //setLoading2(true);

  })
      .catch((error) => {
        if(error) {
          setError("Token Expirado, faça login novamente!");
          window.localStorage.clear()
          navigate('/');
      }
  })
    
    })();*/}

  }, [])


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
        <Link href="/now" className='linkEffect' underline="none" >
          <ListItemText primary="Home"   className='link' />
        </Link>
      </ListItem>

      <ListItem button className='click' >
        <ListItemIcon className='icone'>
          <Links>
          <MonitorHeartIcon />
          </Links>
        </ListItemIcon >
        <Link href="/history" className='linkEffect' underline="none" >
          <ListItemText primary="History"   className='link' />
        </Link>
      </ListItem>

      </List>

      

      </Container>
      </div>
      );
  }