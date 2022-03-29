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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import api from '../../services/api';
import Table from '../../components/table';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative'

import { PieChart, Pie, Legend, Tooltip } from "recharts";


const vendorsYc = [
  { label: 'TCM', id: 1 },
  { label: 'YPLAY', id: 2},
  { label: 'WSP', id: 3},
  { label: 'HSL', id: 5},
  { label: 'Adylnet', id: 7},
]

function Watching() {

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
    const [ watchingQtdDevices, setWatchingQtdDevices] = useState([ {
      IDVendor: '',
      Vendor: '',
      Tipo: '',
      Versao: '',
      customers: '',
    } ])

    const handleChange = (event) => {
      setVendorNumber(event.target.value);
    };


    
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

      (async () => {
        const result = await api.get('monitoring/mw/customers/watching/qtd/devices')
        .then((result) => {
          console.log("aq oe", result.data.response);
          setWatchingQtdDevices(result.data.response);
  
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
              <Box sx={{ minWidth: 220 }}>
                <FormControl sx={{ width: 180 }}>
                  <InputLabel id="outlined-select-label">Vendor</InputLabel>
                  <Select
                    labelId="outlined-select-label"
                    id="outlined-select-currency"
                    value={vendorNumber === null ? '' : vendorNumber}
                    label="VendorNumber"
                    onChange={handleChange}
                  >
                  {vendorsYc.map((option, w) => (
                  <MenuItem key={w} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
                  </Select>
                </FormControl>
              </Box>

              {watchingQtdDevices.filter((item, index) => {
              if(vendorNumber != null) {
                if(item.IDVendor === vendorNumber) {
                  return console.log("achou", );
                } else {
                  console.log("nada")
                }
              }
            })}
            <Container style={{height: 400, color: 'red'}}>
              {watchingQtdDevices.filter((item) =>
              vendorNumber != null && item.IDVendor === vendorNumber 
              ).map((item, index) => {

                console.log(item)
                const date = [

                ]
                
                return(
                  <React.Fragment key={index}>
                  <div >
                  <PieChart width={500} height={200}>
                    <Pie
                      dataKey="customers"
                      isAnimationActive={false}
                      data={item}
                      cx={200}
                      cy={200}
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                  </div>
                  </React.Fragment>
                )
              }
              
              
              
              )}
            
            </Container>
              <Container style={{height: 250, marginTop: 40}}>

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

export default Watching;