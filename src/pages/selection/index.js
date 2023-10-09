import React, {useEffect, useState, useRef} from 'react';


import './index.css'

import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import axios from 'axios';

import api from '../../services/api';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltips from '@mui/material/Tooltip';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FilledInput from '@mui/material/FilledInput';



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

  function formatValue(duration) {

    const durationEvent = (duration / 60); 
  
    const total = durationEvent.toFixed(0);
  
    return total;
  
}


const ref = React.createRef();


function Reporting() {

    console.log("o window", window)


  const navigate  = useNavigate();

  const [service, setService] = useState('');
  const [serviceType, setServiceType] = useState(0);
  const [ openLabel, setOpenLabel] = useState(false);
  const  [ password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [loading7, setLoading7] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);



  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


    useEffect (() => {

  }, [])

  async function login() {
    setError('');
    setLoading(true);
    const requisicao = axios.post('https://monitoringv2.youcast.tv.br/auth/login', {
        service, password,
      
      })
    .then(function (response) {
        console.log("aqui tio", response)
        if(response.data.status === 1) {
            console.log("deu status 1")
            localStorage.setItem("token", response.data.token);
            setLoading(false);
            navigate('/now');
        } else if(response.data.status !== 1) {
            setLoading(false);
            setError(response.data.response)
        }
      })
      .catch(function (error) {
        setError("Senha inválida")
        setLoading(false);
      });

}

  return(
    <div className='styledContainer '>
        <div className='styledHeader' >
            <div class='styleHeaderContent'>
                <h1 className='styledH1One'>Selecione um</h1>
                <h1 className='styledH1Two'>SERVIÇO</h1>
            </div>
        </div>

        <div className='styledBody'>
            <button
                onClick={() => {
                    setService("Monitoramento Geral")
                    setServiceType(1)
                    setOpenLabel(true)
            }}
            >
                <InsertChartIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Monitoramento Geral</h2>

            </button>
            <button
                onClick={() => {
                    setService("Reports Yplay Start")
                    setServiceType(2)
                    setOpenLabel(true)
            }}
            
            >
                <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Reports Yplay Start</h2>

            </button>
            <button
                onClick={() => {
                    setService("Reports Yplay Premium")
                    setServiceType(2)
                    setOpenLabel(true)
            }}
            >
                <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Reports Yplay Premium</h2>

            </button>
            <button
                onClick={() => {
                    setService("Reports Yplay Adulto")
                    setServiceType(2)
                    setOpenLabel(true)
            }}
            >
                <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Reports Yplay Adulto</h2>

            </button>
            <button
                onClick={() => {
                    setService("Reports Simba")
                    setServiceType(2)
                    setOpenLabel(true)
            }}
            >
                <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Reports Simba</h2>

            </button>
            <button
                onClick={() => {
                    setService("Reports Zoomoo")
                    setServiceType(2)
                    setOpenLabel(true)
            }}
            >
                <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Reports Zoomoo</h2>

            </button>
            <button
                onClick={() => {
                    setService("Reports Urban")
                    setServiceType(2)
                    setOpenLabel(true)
            }}
            >
                <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Reports Urban</h2>

            </button>
            <button
                onClick={() => {
                    setService("Reports Newco")
                    setServiceType(2)
                    setOpenLabel(true)
            }}
            >
                <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Reports Newco</h2>

            </button>
            <button
                onClick={() => {
                    setService("Reports CNN")
                    setServiceType(2)
                    setOpenLabel(true)
            }}
            >
                <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Reports CNN</h2>

            </button>
            <button
                onClick={() => {
                    setService("Reports Fish")
                    setServiceType(2)
                    setOpenLabel(true)
            }}
            >
                <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Reports Fish</h2>

            </button>
            <button
                onClick={() => {
                    setService("Reports SPI")
                    setServiceType(2)
                    setOpenLabel(true)
            }}
            >
                <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Reports SPI</h2>

            </button>
            <button
                onClick={() => {
                    setService("Reports Canal K")
                    setServiceType(2)
                    setOpenLabel(true)
            }}
            >
                <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Reports Canal K</h2>

            </button>

            <button
                onClick={() => {
                    setService("Monitoramento Grupo Alloha")
                    setServiceType(3)
                    setOpenLabel(true)
            }}
            >
                <QueryStatsIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Monitoramento Grupo Alloha</h2>

            </button>
            <button
                onClick={() => {
                    setService("Monitoramento Yplay Colombia")
                    setServiceType(3)
                    setOpenLabel(true)
            }}
            >
                <QueryStatsIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Monitoramento Yplay Colombia</h2>

            </button>
            <button
                onClick={() => {
                    setService("Reports Yplay Colombia")
                    setServiceType(2)
                    setOpenLabel(true)
            }}
            >
                <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>
                <h2>Reports Yplay Colombia</h2>

            </button>

        </div>
        
        {openLabel === true ?
        <div className='stylePassContent'>
            <div className='stylePassContainer'>
                <div className='stylePassHeader'>
                    <div className='stylePassHeader1'>
                        { 
                        serviceType === 1 ?
                        <InsertChartIcon fontSize='large' className='styleButtonIconColor'/>
                        :
                        serviceType === 2 ?
                        <ContentPasteGoIcon fontSize='large' className='styleButtonIconColor'/>  
                        :
                        serviceType === 3 ?
                        <QueryStatsIcon fontSize='large' className='styleButtonIconColor'/> 
                        :
                        ''
                        }
                    </div>

                    <div className='stylePassHeader2'>
                        <h2 className='selectionH2'>{service}</h2>
                    </div>
                    <div className='stylePassHeader3'>
                    <Tooltips title="Fechar" placement="right">
                        <button className='btnS' onClick={(e => {
                            setService('');
                            setOpenLabel(false)
                            setServiceType(0);
                            setError('')
                                                
                        })}><CancelIcon /></button>
                    </Tooltips>
                    </div>


                </div>

                <div className='stylePassBody'>
                <form noValidate style={{display: 'flex'}}>
                    <Box sx={{ width: '70%', }}>
                                            
                    <TextField
                    style={{ width: '90%'}}
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    autoComplete="current-password"
                    />
                    </Box>

                    <Button
                                        size="medium"
                                        value={loading ?  "Aguarde..." : "Fazer Login"}
                                        disabled={loading}
                                        onClick={login}
                                        variant="contained"
                                        type="submit"

                                        style={{
                                            background: '#FFD100',
                                            width: '180px',
                                            height: '55px',
                                            color: '#FFF',
                                            borderRadius: 10,
                                            fontWeight: 'bold',
                                            "&:hover": {
                                                background: "rgba(129, 129, 129, 1)"
                                              },

                                        }}
                                        >
                                        Enviar
                    </Button>
                </form>
                {
                    error !== "" ?
                    <p style={{color: 'red'}}>{error}</p>

                    :
                    ""
                }
                </div>
            </div>
        </div>
        
        :
        ''
        }

    </div>
  );
}

export default Reporting;