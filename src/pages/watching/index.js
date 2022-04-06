import React, {useState, useEffect} from 'react';

import './index.css';

import Container from '../../styles/theme/components/Container';
import Gradient from '../../styles/theme/components/Gradient';
import AlternativeTheadStyle from '../../styles/theme/components/AlternativeTheadStyle'
import AlternativeTbodyStyle from '../../styles/theme/components/AlternativeTbodyStyle'

import ThemeMenu from '../../components/themeMenu';
import DrawerComponent from '../../components/drawer';
import Header from '../../components/header/index.js';
import PermanentDrawerLeft from '../../components/drawer';

import { Chart } from "react-google-charts";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TablePagination from '@mui/material/TablePagination';


import api from '../../services/api';
import Table from '../../components/table';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative'

import { PieChart, Pie, Legend, Tooltip, Sector, Cell, BarChart, XAxis, YAxis, Bar, Brush, CartesianGrid, ComposedChart  } from "recharts";

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const vendorsYc = [
  { label: 'Adylnet', id: 7},
  { label: 'Americanet', id: 16},
  { label: 'D-Net', id: 13},
  { label: 'HSL', id: 5},
  { label: 'NOVA NET', id: 14},
  { label: 'TCM', id: 1 },
  { label: 'Videocast', id: 9},
  { label: 'WSP', id: 3},
  { label: 'youcast', id: 17},
  { label: 'YPLAY', id: 2},
];


export const options = {
  title: "My Daily Activities",
  pieHole: 0.4,
  is3D: false,
};
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", ];

const RADIAN = Math.PI / 185;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function Watching() {

    const [codigo, setCodigo] = useState('');
    const [ filterId, setFilterId] = useState('');
    const [vendorNumber, setVendorNumber] = React.useState('');


    
    const [ watchingUsers, setWatchingUsers] = useState([ {
      Vendor: '',
      data: [{
        Vendor: '',
        IDVendor: '',
        login: '',
        Channel: '',
        ChannelURL: '',
        VOD: '',
        VODURL: '',
        watching_now_stream_type: '',
        watching_now_devices_type: '',
        watching_now_type: '',
      }],
    } ])

    const [ watchingQtdChannels, setWatchingQtdChannels] = useState([ {
      Vendor: '',
      data: [{
        Vendor: '',
        IDVendor: '',
        Canal: '',
        URL: '',
        QTD: '',
      }],
    } ])

    const [ watchingQtdDevices, setWatchingQtdDevices] = useState([ {
      Vendor: '',
      data: [{
        IDVendor: '',
        Vendor: '',
        Tipo: '',
        Versao: '',
        customers: '',
      }],
    } ])

    const [ watchingQtdTypes, setWatchingQtdTypes] = useState([ {
      Vendor: '',
      data: [{
        IDVendor: '',
        Vendor: '',
        Tipo: '',
        Total: '',
      }],
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
        const result = await api.get('monitoring/mw/customers/watching')
        .then((result) => {
          //console.log("aq oe", result.data.response);
          setWatchingUsers(result.data.response);
    })
        .catch((error) => {
          // handle error
            console.log(error);
    })

      })();

      (async () => {
        const result = await api.get('monitoring/mw/customers/watching/qtd/channels')
        .then((result) => {
          //console.log("aq oe", result.data.response);
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
          //console.log("aq oe", result.data.response);
          setWatchingQtdDevices(result.data.response);
  
    })
        .catch((error) => {
          // handle error
            console.log(error);
    })

      })();

      (async () => {
        const result = await api.get('monitoring/mw/customers/watching/qtd/types')
        .then((result) => {
          //console.log("aq oe", result.data.response);
          setWatchingQtdTypes(result.data.response);
  
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
          <div style={{ width: '100%', height: 3000}}>
            <Header />

            {/*parte do input vendor */}
            <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>
              <Box sx={{ minWidth: 220, marginBottom: 5 }}>
                <FormControl sx={{ width: 180 }}>
                  <InputLabel id="outlined-select-label">Vendor</InputLabel>
                  <Select
                    labelId="outlined-select-label"
                    id="outlined-select-currency"
                    value={vendorNumber === '' ? '' : vendorNumber}
                    label="VendorNumber"
                    onChange={handleChange}
                  >
                  {vendorsYc.map((option, w) => (
                  <MenuItem key={w} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
                  </Select>
                </FormControl>
              </Box>

              {/*parte dos graficos */}
              <Grid container component="main" sx={{  display: 'flex', }} spacing={2}>
              <Grid item xs={12} sm={12} md={12} elevation={4} square>
                {watchingUsers.filter((item) =>
                  vendorNumber !== '' && item.Vendor === vendorNumber 
                  ).map((item, index) => (
                    <Container key={index} style={{width: '100%', maxWidth: 1200, height: 500, margin: 'auto', borderRadius: 10 }}>
                      <table style={{ width: '95%', display: 'flex', flexDirection: 'column', margin: 'auto', paddingTop: 30, paddingBottom: 30, }}>

                        <AlternativeTheadStyle className="tHeadConfig">
                          <tr className="trConfig">
                            <th style={{width: 200,paddingLeft: 10, }}>Login</th>
                            <th style={{width: 140, }}>Canal</th>
                            <th style={{width: 140, }}>VOD</th>
                            <th style={{width: 80, }}>T.D.S</th>
                            <th style={{width: 120, }}>T.D.D</th>
                            <th style={{width: 120, }}>Formato</th>
                            <th style={{width: 120, backgroundColor: 'green', }}>


                            </th>
                          </tr>
                        </AlternativeTheadStyle>
                        <tbody style={{overflowY: 'scroll', height: 350, marginTop: 20}}>

                      {item.data.map((items, i) => (
                            <tr key={i} style={{width: '100%', fontSize: '14px'}}>
                              <td style={{width: 200, paddingLeft: 10, }}>{items.login}</td>
                              <td style={{width: 140, margin: 'auto', }}>{items.ChannelURL !== null ? <img src={items.ChannelURL} className="imgCEV" /> : <p style={{textAlign: 'center'}}>N/A</p>}</td>
                              <td style={{width: 140, margin: 'auto', }}>{items.VODURL !== null ? <img src={items.VODURL} className="imgCEV" /> : <p style={{textAlign: 'center'}}>N/A</p>}</td>
                              <td style={{width: 80, }}><p>{items.watching_now_stream_type.toUpperCase()}</p></td>
                              <td style={{width: 120, }}><p>{items.watching_now_devices_type.toUpperCase()}</p></td>
                              <td style={{width: 120, }}><p>{items.watching_now_type.toUpperCase()}</p></td>
                              <td style={{width: 120, backgroundColor: 'green'}}></td>
                            </tr>


                      ))}

                        </tbody>
                      </table>
                    </Container>

                  )    
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={6} elevation={4} square>
                {watchingQtdDevices.filter((item) =>
                  vendorNumber !== '' && item.Vendor === vendorNumber 
                  ).map((item, index) => {
                    const data = item.data.map((items) => (
                      {
                          "name": items.Tipo+" - "+items.Versao,
                          "value": items.customers
                      }
                    ))

                    return(
                      <React.Fragment key={index}>
                        <Container style={{width: '100%', height: 'auto', margin: 'auto', borderRadius: 10}}>
                        <div style={{margin: 'auto', width: '100%', paddingTop: 1}}>
                        <h3 style={{textAlign: 'center',}}>Dispositivos Utilizados</h3>
                        <PieChart width={520} height={280}>
                        <Pie
                          data={data}
                          cx={140}
                          cy={140}
                          label
                          paddingAngle={5}
                          outerRadius={100}
                          innerRadius={75}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                          <Tooltip />
                          <Legend layout="vertical" verticalAlign="middle" wrapperStyle={style}/>
                            </PieChart>
                        </div>
                        </Container>
                      </React.Fragment>             
                    )
                  }      
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={6} elevation={4} square>
                {watchingQtdTypes.filter((item) =>
                  vendorNumber !== '' && item.Vendor === vendorNumber 
                  ).map((item, index) => {
                    const data = item.data.map((items) => (
                      {
                          "name": items.Tipo,
                          "value": items.Total
                      }
                    ))

                    return(
                      <React.Fragment key={index}>
                        <Container style={{width: '100%', height: 'auto', margin: 'auto', borderRadius: 10}}>
                        <div style={{margin: 'auto', width: '100%', paddingTop: 1}}>
                        <h3 style={{textAlign: 'center',}}>Tipos de Stream</h3>
                        <PieChart width={450} height={280}>
                        <Pie
                          data={data}
                          cx={140}
                          cy={140}
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                          <Tooltip />
                          <Legend layout="vertical" verticalAlign="middle" wrapperStyle={style}/>

                            </PieChart>
                        </div>
                        </Container>
                      </React.Fragment>             
                    )
                  }      
                  )}
                </Grid>

                <Grid item xs={12} sm={12} md={12} elevation={4} square>
                  {watchingQtdChannels.filter((item) =>
                  vendorNumber !== '' && item.Vendor === vendorNumber 
                  ).map((item, index) => {
                    const data = item.data.map((items) => (
                      {
                          "name": items.Canal,
                          "Quantidade de usuários": items.QTD
                      }
                    ))

                    return(
                      <React.Fragment key={index}>
                        <Container style={{width: '100%', height: 'auto', margin: 'auto', borderRadius: 10}}>
                        <div style={{margin: 'auto', width: '100%', paddingTop: 1}}>
                        <h3 style={{textAlign: 'center',}}>Canais Sendo Assistidos</h3>
                        <ComposedChart
                          layout="vertical"
                          width={500}
                          height={1200}
                          data={data}
                          margin={{
                            top: 20,
                            right: 20,
                            bottom: 10,
                            left: 120
                          }}
                        >
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" tick={{fontSize: 16}} scale="band" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="Quantidade de usuários" barSize={40} fill="#0088FE" />
                        </ComposedChart>
                        </div>
                        </Container>
                      </React.Fragment>             
                    )
                  }      
                  )}

                </Grid>




              </Grid>

            

            </div>

            <ThemeMenu/> 
          </div>
      </div>
    );
}

export default Watching;