import React, {useState, useEffect} from 'react';

import './index.css';

import Container from '../../styles/theme/components/Container';
import Gradient from '../../styles/theme/components/Gradient';

import ThemeMenu from '../../components/themeMenu';
import DrawerComponent from '../../components/drawer';
import Header from '../../components/header/index.js';
import PermanentDrawerLeft from '../../components/drawer';
import Chart from '../../components/charts/PieChart.tsx';
import SimpleChart from '../../components/charts/SimpleChart.tsx';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@mui/material/MenuItem';

import api from '../../services/api';
import Table from '../../components/table';

function Packages() {

    const [codigo, setCodigo] = useState('');
    const [ filterId, setFilterId] = useState('');
    const [vendorNumber, setVendorNumber] = React.useState(null);

    const [ watchingQtdChannels, setWatchingQtdChannels] = useState([ {
      IDVendor: '',
      Vendor: '',
      Canal: '',
      URL: '',
      QTD: '',
    } ])
    
    function canaisEspecificos(canais) {
      return canais.IDVendor === 7;
    }
    
    function compararNumeros(a, b) {
      return a - b;
    }

    const [error, setError] = useState(null);
  
    const [loading, setLoading] = useState(false);

    useEffect (() => {

      (async () => {
        const result = await api.get('monitoring/mw/customers/watching/qtd/channels')
        .then((result) => {
          console.log("aq oe", result.data.response);
          setWatchingQtdChannels(result.data.response);
  
    })
        .catch((error) => {
          // handle error
            console.log(error);
    })

      })();





    }, [])


    return(
        <div style={{width: '100%', height: '100%', display: 'flex',}}>
          <div style={{}}>
            <PermanentDrawerLeft/>
          </div>
          <div style={{ width: '100%', height: 2000}}>
            <Header />

            <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>
              <Container style={{height: 450, marginTop: 40}}>
                  <Table/>
              </Container>
              <Container style={{height: 450, marginTop: 40}}>
              <SimpleChart style={{margin: 'auto'}} />
              </Container>
            </div>


            <ThemeMenu/> 
          </div>
      </div>
        );
}

export default Packages;

