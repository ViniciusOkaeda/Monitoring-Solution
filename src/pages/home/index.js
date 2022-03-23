import React, {useEffect, useState} from 'react';
import ThemeMenu from '../../components/themeMenu';
import Container from '../../styles/theme/components/Container';
import DrawerComponent from '../../components/drawer';
import Header from '../../components/header';
import api from '../../services/api';
import Button from '@material-ui/core/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import './index.css'
import Grid from '@material-ui/core/Grid';
import MenuItem from '@mui/material/MenuItem';


import TextField from '@material-ui/core/TextField';

import CreateIcon from '@mui/icons-material/Create';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';




function Home() {
    const [error, setError] = useState(null);
    
    const [codigo, setCodigo] = useState('');
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idCor, setIdCor] = useState('');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    const [loginSearch, setLoginSearch] = useState('');

    const [colorList, setColorList] = useState([ {
        id: '',
        codigo: '',
      }]);
        
      const [loading, setLoading] = useState(false);
  
      const [idProduto, setidProduto] = useState('');


      const produto = localStorage.getItem('product')
      useEffect(() => {
        
        
  
  
        //console.log("minha lista", colorList)
        api
        .post('Cores/Selecionar')
        .then((response) => {

        })
        .catch((error) => {
        // handle error
            console.log(error);
        })


        api
        .post('Produtos/Selecionar')
        .then((response) => {
          //console.log("aq oe", response.data);
  
    })
        .catch((error) => {
          // handle error
            console.log(error);
    })

      }, [])


    return(
        <div style={{width: '100%', minHeight: '100vh'}}>
        <Header />
        <ThemeMenu/>
        <div style={{width: '100%', height: '100%', display: 'flex', margin: 0}}>
          <DrawerComponent/>
          <div style={{width: '90%', height: '100%',  margin: 'auto'}}>
            <Container style={{width: '100%', height: 600,  borderRadius: 10, display: 'flex', }}>

                
            </Container>
          </div>
        </div>
      </div>

    );
}

export default Home;