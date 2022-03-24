import React, {useState, useEffect} from 'react';

import './index.css';

import Container from '../../styles/theme/components/Container';
import Gradient from '../../styles/theme/components/Gradient';

import ThemeMenu from '../../components/themeMenu';
import DrawerComponent from '../../components/drawer';
import TesteHeader from '../../components/header/testeHeader';
import PermanentDrawerLeft from '../../components/drawer';
import Chart from '../../components/charts/PieChart.tsx';
import SimpleChart from '../../components/charts/SimpleChart.tsx';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@mui/material/MenuItem';

import api from '../../services/api';
import Table from '../../components/table';

const vendorsYc = [
  { label: 'TCM', id: 1 },
  { label: 'YPLAY', id: 2},
  { label: 'WSP', id: 3},
  { label: 'HSL', id: 5},
  { label: 'Adylnet', id: 7},
]

function Products() {

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

    const createProduct = async e => {
        e.preventDefault();
        setLoading(true);
        let cor = []
        let item = {}
        //console.log(JSON.stringify({item}))
        let result = await fetch("http://10.5.0.53/api/v1/vendor", {
                      method: 'POST',
                      body: JSON.stringify(item)
                  });
                  result = await result.json();
                  //console.log("aqui o resultado dos fornecedores", result)
                  if(result.status === 1001 ){
                    setLoading(false);
                    setError("Fornecedor criado com sucesso!");
                    window.location.reload();
                  } else {
                      if(result.status === 1014) {
                        setError("Este fornecedor já existe!");
                      } else {
                        if(result.status === 1115) {
                          setError("Dados inválidos, tente novamente.")
                        }
                      }
        }
      //console.log(result.status)
      }

    return(
        <div style={{width: '100%', height: '100%', display: 'flex',}}>
          <div style={{}}>
            <PermanentDrawerLeft/>
          </div>
          <div style={{ width: '100%', height: 2000}}>
            <TesteHeader />
            {watchingQtdChannels.filter((item) => {
              if(item.IDVendor === 5) {
                return console.log("achou", item);
              } else {
                console.log("nada")
              }
            })}

            <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>
              <TextField
                style={{minWidth: 90}}
                id="outlined-select-currency"
                variant="standard"
                required
                select
                type="text"
                label="Vendor"
                value={vendorNumber}
                onChange= {e => {
                  setVendorNumber(e.target.value)
                  localStorage.setItem("VendorId", e.target.value)
                }}                        >
                {vendorsYc.map((option, w) => (
                  <MenuItem key={w} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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

export default Products