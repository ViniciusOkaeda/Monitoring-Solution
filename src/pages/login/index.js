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
import OutlinedInput from '@mui/material/OutlinedInput';

import Yvideo from "../../movies/videoplayback.mp4";

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
                  <Grid item xs={12} sm={12} md={8} elevation={6} square="true" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                    <div className="banner">
                    <video autoPlay loop muted style={{
                    }}>
                      <source src={Yvideo} type="video/mp4"/>
                    </video>

                    <div className="content ">
                      <div className="emphasis animate__slideInLeft">

                        <div className="emphasisContent">

                          <h1>Resolver seus problemas nunca foi tão fácil!</h1>
                        </div>
                      </div>

                      <div  className="geometric geometricContent" >
                        <h2>Acesse já nosso portal</h2>
                      </div>
                    </div>

                    </div>
                  </Grid>

                    <Grid item xs={12} sm={12} md={4} elevation={6} square="true" style={{display: 'flex', zIndex: 1}}>
                        <div style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: "100%", height: '100%', margin: "auto"}}>
                            <div className='centralize'>
                                <img src={Logo} className='logo' alt="logo"/>
                                <div className='form'>

                                    <form noValidate>
                                        <Box sx={{ width: '100%'}}>
                                            <TextField 
                                            label="Usuário" 
                                            id="outlined-size-normal"
                                            autoComplete='username' 
                                            onChange={e => setUsername(e.target.value)}
                                            style={{marginBottom: 10, width: '100%', borderColor: 'blue'}} />
                                            
                                            <FormControl  variant="outlined" style={{marginBottom: 30, width: '100%'}}>
                                                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-password"
                                                    autoComplete='current-password'
                                                    type={passwordValues.showPassword ? 'text' : 'password'}
                                                    value={passwordValues.password}
                                                    onChange={handleChange('password')}
                                                    endAdornment={
                                                    <InputAdornment position="end">
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
                                            width: '100%',
                                            color: '#FFF',
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

                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </div>
                    </Grid>


                </Grid>
            </div>
    )
}


export default Login;