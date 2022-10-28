import React, {useState, useEffect} from 'react';

import { useNavigate } from "react-router-dom";

import './index.css';

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

import Yvideo from "../../movies/videoplayback.mp4";

import Ycast from "../../assets/youcast_top4_logo.png";

import 'animate.css';


import Logo from '../../assets/logo_preto.png'

import api from '../../services/api';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://youcast.tv.br/">
          Youcast
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

function Login() {
    const navigate  = useNavigate();


    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('');

    const [passwordValues, setPasswordValues] = React.useState({
        password: '',
        showPassword: false,
      });

      const handleChange = (prop) => (event) => {
        setPasswordValues({ ...passwordValues, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setPasswordValues({
          ...passwordValues,
          showPassword: !passwordValues.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      useEffect(() => {

    }, [])

      async function login() {
        setError(null);
        setLoading(true);
        let password = passwordValues.password
        api.post('auth/login', {
            username,
            password
        })
        .then(function (response) {
            if(response.data.status === 1) {
                localStorage.setItem("token", response.data.response)
                navigate('/dashboard');
            } 
          })
          .catch(function (error) {
            
            setError("Usuário e/ou senha inválidos")
            setLoading(false);
          });
 
    }
    
    return(
            <div style={{width: '100%', minHeight: '100vh', backgroundColor: '#fff'}}>

                <Grid container component="main" sx={{ height: '100vh', display: 'flex' }}>
                  <Grid item xs={12} sm={12} md={7} elevation={6} square="true" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',  }}>
                    <div className="banner">


                    <div className="content ">
                      <div style={{ width: '80%', height: 140, marginTop: '50%', margin: '50% auto auto auto'  }}>
                        <div style={{width: '80%', height: '100%', margin: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          <img src={Ycast} style={{ width: '100%', objectFit: 'none', margin: 'auto'}}></img>
                        </div>
                      </div>

                    </div>

                    </div>


                  </Grid>

                    <Grid item xs={12} sm={12} md={5} elevation={6} square="true" style={{display: 'flex', zIndex: 1, boxShadow: '-0.1em 0 35px black'}}>
                        <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#1c1e22', width: "100%", height: '100%', margin: "auto", }}>
                            <div className='centralize'>
                              <div style={{width: '80%', marginTop: 70}}>
                                <h2 style={{fontFamily: 'Roboto Condensed,Roboto,Arial,sans-serif', fontWeight: 'bold', fontSize: '1.8em', width: 300, overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-word', textAlign: 'left', textShadow: "5px 5px 6px black", color: '#fff'}}>
                                  MONITORING LOGIN</h2>

                              </div>
                                <div className='form'>

                                    <form noValidate>
                                        <Box sx={{ width: '90%'}}>
                                            <TextField 
                                            label="Usuário" 
                                            variant="filled"
                                            id="outlined-size-normal"
                                            autoComplete='username' 
                                            onChange={e => setUsername(e.target.value)}
                                            style={{marginBottom: 10, width: '100%', borderColor: 'blue', backgroundColor: '#E8F0FE', borderRadius: 10}} />
                                            
                                            <FormControl  variant="filled" style={{marginBottom: 30, width: '100%'}}>
                                                <InputLabel htmlFor="filled-adornment-password" >Senha</InputLabel>
                                                <FilledInput
                                                    id="filled-adornment-password"
                                                    autoComplete='current-password'
                                                    style={{ backgroundColor: '#E8F0FE', borderRadius: 10}}
                                                    type={passwordValues.showPassword ? 'text' : 'password'}
                                                    value={passwordValues.password}
                                                    onChange={handleChange('password')}
                                                    endAdornment={
                                                    <InputAdornment position="end"  >
                                                        <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        >
                                                        {passwordValues.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                    }
                                                    label="Password"
                                                />
                                                {error && <div className="error">{error}</div>}

                                            </FormControl>
                                        </Box>

                                        <Button
                                        size="large"
                                        value={loading ?  "Aguarde..." : "Fazer Login"}
                                        disabled={loading}
                                        onClick={login}
                                        variant="contained"
                                        type="submit"

                                        style={{
                                            background: '#FFD100',
                                            width: '90%',
                                            color: '#FFF',
                                            borderRadius: 10,
                                            fontWeight: 'bold',
                                            "&:hover": {
                                                background: "rgba(129, 129, 129, 1)"
                                              },

                                        }}
                                        >
                                        Fazer Login
                                        </Button>
                                    </form>

                                </div>

                            </div>

                            <Box mt={5} >
                                <Copyright style={{ color: '#E8F0FE'}}/>
                            </Box>
                        </div>
                    </Grid>


                </Grid>
            </div>
    )
}


export default Login;