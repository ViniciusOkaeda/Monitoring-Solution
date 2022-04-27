import React, {useState, useEffect} from 'react';

import './index.css';

import Container from '../../styles/theme/components/Container';
import IconStyle from '../../styles/theme/components/IconStyle';
import AlternativeTheadStyle from '../../styles/theme/components/AlternativeTheadStyle'

import ThemeMenu from '../../components/themeMenu';
import DrawerComponent from '../../components/drawer';
import Header from '../../components/header/index.js';
import PermanentDrawerLeft from '../../components/drawer';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@mui/material/MenuItem';

import api from '../../services/api';

import { PieChart, Pie, Legend, Tooltip, Sector, Cell, BarChart, XAxis, YAxis, Bar, Brush, CartesianGrid, ComposedChart  } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", ];


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

function Packages() {

    const [codigo, setCodigo] = useState('');
    const [ filterId, setFilterId] = useState('');
    const [vendorNumber, setVendorNumber] = React.useState(null);

    const [ packagesUser, setPackagesUser] = useState([ {
      Vendor: '',
      data: [{
        Vendor: '',
        IDVendor: '',
        Cliente: '',
        pacotes: [{
          IDVendor: '',
          Vendor: '',
          Cliente: '',
          Pacote: '',
        }],
      }],
    } ])

    const [ packagesQtd, setPackagesQtd] = useState([ {
      Vendor: '',
      data: [{
        Vendor: '',
        IDVendor: '',
        Pacote: '',
        QTD_Clientes: '',
      }],
    } ])

    const handleChange = (event) => {
      setVendorNumber(event.target.value);
    };
    
    const [error, setError] = useState(null);
  
    const [loading, setLoading] = useState(false);

    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    useEffect (() => {

      (async () => {
        const result = await api.get('monitoring/mw/customers/packages', {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then((result) => {
          console.log("aq oe", result.data.response);
          setPackagesUser(result.data.response);
  
    })
        .catch((error) => {
          // handle error
            console.log(error);
    })

      })();

      (async () => {
        const result = await api.get('monitoring/mw/customers/packages/qtd', {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then((result) => {
          console.log("aq oe", result.data.response);
          setPackagesQtd(result.data.response);
  
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
          <div style={{ width: '100%', height: 6000}}>
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
                  {packagesUser.filter((item) =>
                    vendorNumber !== '' && item.Vendor === vendorNumber 
                    ).map((item, index) => {
                      const pages = Math.ceil(item.data.length / itensPerPage)
                      const startIndex = currentPage * itensPerPage; //indexOfLastItem
                      const endIndex = startIndex + itensPerPage; //indexOfFirstItem
                      const currentItens = item.data.slice(startIndex, endIndex)
                      console.log("minhas pg", pages)
                      console.log("pg atual", currentPage)
  
                      const handleClickPage = (event) => {
                        setCurrentPage(Number(event.target.id));
                      };
  
                      const handleNextbtn = () => {
                        setCurrentPage(currentPage + 1);
                        if(currentPage+1 > maxPageNumberLimit){
                          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
                          setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
                        }
                      }
                      let pageIncrement = null;
                      if(pages > maxPageNumberLimit) {
                        pageIncrement = <li style={{cursor: 'default'}}> &hellip; </li>;
                      }
  
                      const handlePrevbtn = () => {
                        setCurrentPage(currentPage - 1);
                        if( (currentPage - 1) % pageNumberLimit == 0 ){
                          setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
                          setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
                        }
                      }
                      let pageDecrement = null;
                      if(minPageNumberLimit >= 1) {
                        pageDecrement = <li style={{cursor: 'default'}}> &hellip; </li>;
                      }
                      return(
                        <Container key={index} style={{width: '100%', maxWidth: 1200, height: 650, margin: 'auto', borderRadius: 10 }}>
                          <table style={{ width: '95%', display: 'flex', flexDirection: 'column', margin: 'auto', paddingTop: 30, paddingBottom: 30, }}>

                            <AlternativeTheadStyle className="tHeadConfig">
                              <tr className="trConfig">
                                <th style={{width: 350,paddingLeft: 10, }}>Login Cliente</th>
                                <th style={{width: 600, }}>Pacotes Cadastrados</th>

                              </tr>
                            </AlternativeTheadStyle>
                            <tbody style={{overflowY: 'scroll', height: 350, marginTop: 20}}>

                          {currentItens.map((items, i) => (
                                <tr key={i} style={{width: '100%', fontSize: '14px'}}>
                                  <td style={{width: 350, paddingLeft: 10, }}>{items.Cliente}</td>
                                  <td style={{width: 600, }}><p style={{margin: 5}}> {items.pacotes.map((pct, o) => ( pct.Pacote+", " ))} </p></td>
                                </tr>
                          ))}

                            </tbody>
                          </table>

                          <div style={{display: 'flex', justifyContent: 'space-between', margin: 'auto', width: '90%'}}>
                            <ul className='pageNumbers'>
                              <li>
                                <button 
                                onClick={handlePrevbtn}
                                disabled={currentPage <= 1 }
                                className={currentPage <= 1 ? 'disabled' : ''}
                                >prev</button>
                              </li>
                              {pageDecrement}
                              {Array.from(Array(pages), (pgs, index) => {
                                if(index < maxPageNumberLimit+1 && index>minPageNumberLimit) {
                                  return (
                                      <button 
                                        key={index} 
                                        id={index} 
                                        onClick={handleClickPage}
                                        className={currentPage == index ? "active" : null}
                                      > <IconStyle>{index}</IconStyle> </button>
                                    )
                                }else {
                                  return null;
                                }
                              })}
                              {pageIncrement}

                              <li className={currentPage == pages - 1 ? 'disabled' : ''}>
                                <button 
                                onClick={handleNextbtn}
                                disabled={currentPage == pages - 1}
                                className={currentPage == pages - 1 ? 'disabled' : ''}
                                >next</button>
                              </li>
                            </ul>

                            <div style={{ display: 'flex', width: 200, height: 80, justifyContent: 'space-around', alignItems: 'center'}}>

                              <div style={{margin: 'auto'}}>
                                <p style={{fontSize: '1rem', fontWeight: 'bold'}}>Itens p/ page:</p>
                              </div>
                              <div >
                                <select style={{ height: 35, fontSize: '1rem', fontWeight: 'bold', margin: 'auto', borderRadius: 8}} value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
                                  <option value={10}>10</option>
                                  <option value={25}>25</option>
                                  <option value={50}>50</option>
                                </select>
                              </div>
                            </div>

                          </div>
                        </Container>

                      )
                    }
                    )}
                </Grid>

                <Grid item xs={12} sm={12} md={12} elevation={4} square>
                  {packagesQtd.filter((item) =>
                  vendorNumber !== '' && item.Vendor === vendorNumber 
                  ).map((item, index) => {
                    const data = item.data.map((items) => (
                      {
                          "name": items.Pacote,
                          "Quantidade de usuários": items.QTD_Clientes,
                      }
                    ))

                    const initialValue = 0;

                    const somatoria = [{
                      total: item.data.map(itens => itens.QTD_Clientes).reduce((total, numero) => total + numero, 0),

                    }]

                    console.log("minha dat", somatoria)

                    return(
                      <React.Fragment key={index}>
                        <Container style={{width: '100%', height: 'auto', margin: 'auto', borderRadius: 10}}>
                        <div style={{margin: 'auto', width: '100%', paddingTop: 1}}>
                        <h3 style={{textAlign: 'center',}}>Quantidade Usuários por Pacote</h3>
                        <ComposedChart
                          layout="vertical"
                          width={900}
                          height={5000}
                          data={data}
                          margin={{
                            top: 20,
                            right: 20,
                            bottom: 10,
                            left: 130
                          }}
                        >
                          <XAxis type="number" />
                          <YAxis dataKey="name" minTickGap={20} type="category" tick={{fontSize: 16,}} scale="band" />
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

export default Packages;

