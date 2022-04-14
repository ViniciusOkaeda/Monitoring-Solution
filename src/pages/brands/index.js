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



const brandsYc = [
    { label: 'JACON dealer', id: 7},
    { label: 'TCM Telecom', id: 16},
    { label: 'Youcast CSMS', id: 13},
    { label: 'Z-Não-usar', id: 5},
    { label: 'Tester', id: 14},
    { label: 'TCM', id: 1 },
    { label: 'YPLAY', id: 9},
    { label: 'AMERICANET', id: 3},
    { label: 'HSL', id: 17},
    { label: 'ADYLNET', id: 2},
    { label: 'DNET', id: 2},
    { label: 'LBR', id: 2},
    { label: 'ADMIN-YOUCAST', id: 2},
    { label: 'WSP', id: 2},
    { label: 'IBW', id: 2},
    { label: 'CARIAP', id: 2},
    { label: 'NOVANET'},
    { label: 'plugar'},
    { label: 'go-net'},
    { label: 'keronet'},
    { label: 'cyber-net'},
    { label: 'pay-use'},
    { label: 'i9-conecta'},
    { label: 'tech-net'},
    { label: 'viva-tecnologia'},
    { label: 'ubernet'},
    { label: 'bigdot'},
    { label: 'softxx'},
    { label: 'teleplix'},
    { label: 'raynet'},
  ];

function Brands() {

    const [brandNumber, setbrandNumber] = React.useState(null);

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

    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleChange = (event) => {
        setbrandNumber(event.target.value);
      };

    useEffect (() => {

        (async () => {
          const result = await api.get('monitoring/mw/customers/packages')
          .then((result) => {
            console.log("aq oe", result.data.response);
            setPackagesUser(result.data.response);
    
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
                    <InputLabel id="outlined-select-label">Brands</InputLabel>
                    <Select
                    labelId="outlined-select-label"
                    id="outlined-select-currency"
                    value={brandNumber === '' ? '' : brandNumber}
                    label="brandNumber"
                    onChange={handleChange}
                    >
                    {brandsYc.map((option, w) => (
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
                    brandNumber !== '' && item.Vendor === brandNumber 
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

                </Grid>

            

            </div>


            <ThemeMenu/> 
            </div>
        </div>
    )
}

export default Brands;