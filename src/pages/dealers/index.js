import React, {useState, useEffect, useRef} from 'react';

import { useNavigate } from "react-router-dom";

import './index.css';

import { ExcelExportDealers } from '../../components/excel/ExcelExport';

import { CSVLink } from "react-csv";

import styled from "styled-components";

import Container from '../../styles/theme/components/Container';
import IconStyle from '../../styles/theme/components/IconStyle';
import AlternativeTheadStyle from '../../styles/theme/components/AlternativeTheadStyle'
import DropDownHeader from '../../styles/theme/components/DropDownHeader';
import DropDownList from '../../styles/theme/components/DropDownList';

import ThemeMenu from '../../components/themeMenu';
import DrawerComponent from '../../components/drawer';
import Header from '../../components/header/index.js';
import PermanentDrawerLeft from '../../components/drawer';


import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltips from '@mui/material/Tooltip';

import api from '../../services/api';

import { PieChart, Pie, Legend, Tooltip, Sector, Cell, BarChart, XAxis, YAxis, Bar, Brush, CartesianGrid, ComposedChart  } from "recharts";


const DropDownListContainer = styled("div")``;

const style = {
  fontSize: 18,
};

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

function Dealers() {

  const navigate  = useNavigate();

    const [dealerName, setDealerName] = React.useState('');
    const [dealerName2, setDealerName2] = React.useState([{}]);

    const [error, setError] = useState('');
  
    const [loading, setLoading] = useState(false);


    const [ packagesUserBrand, setPackagesUserBrand] = useState([ {
        dealer: '',
        data: [{
          login: '',
          pacotes: [{
                idsms: '',
                idmw: '',
                login: '',
                dealerid: '',
                dealer: '',
                vendor: '',
                product: '',
                activation: '',
                cancelled: '',
          }],
          pacoteYplayStatus: '',
          pacoteYplay: '',
        }],
        basicCount: '',
        fullCount: '',
        compactCount: '',
        premiumCount: '',
        urbanTv: '',
      } ])

    const [itensPerPage, setItensPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageNumberLimit, setPageNumberLimit] = useState(3);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleChange = (event) => {
        setDealerName(event.target.value);
      };

      const [isOpen, setIsOpen] = useState(false);
    
    const toggling = () => setIsOpen(!isOpen);
    let domNode = useClickOutside(() => {
        setIsOpen(false);
      });

    const headers = [
      { label: "Customer Login", key: "Cliente" },
      { label: "Basic", key: "Pacote" },
      { label: "Compact", key: "compactCount" },
      { label: "Full", key: "fullCount" },
    ];

    useEffect (() => {

        (async () => {
          const result = await api.get('monitoring/sms/customers/packages/dealers', {
            headers: {
              token: localStorage.getItem("token")
            }
          })
          .then((result) => {
            setDealerName2(result.data.response.map( i => i.dealer))
            setPackagesUserBrand(result.data.response);
            setLoading(true);
    
      })
          .catch((error) => {
            if(error) {
              setError("Token Expirado, faça login novamente!")
              window.localStorage.clear()
              navigate('/');
            }
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
            {loading === true 
              ?
              <div style={{display: 'flex', position: 'relative', zIndex: 0}}>
                <Box className='paddT' sx={{ minWidth: 220, marginBottom: 5 }}>
                <FormControl sx={{ width: 180 }}>
                    <InputLabel id="outlined-select-label">Dealers</InputLabel>
                    <Select
                    labelId="outlined-select-label"
                    id="outlined-select-currency"
                    value={dealerName === '' ? '' : dealerName}
                    label="dealerName"
                    disabled={dealerName !== ''}
                    onChange={handleChange}
                    >
                    {dealerName2.map((option, w) => (
                    <MenuItem key={w} value={option}>
                    {option}
                    </MenuItem>
                ))}
                    </Select>
                </FormControl>
                </Box>
                {dealerName !== null && dealerName !== '' ?
                  <Tooltips title="Remover Dealer" placement="right">
                    <button className='btnS' onClick={(e => {
                      window.location.reload()
                    })}><CancelIcon /></button>
                  </Tooltips>
                  :
                  ''
                  
                }                
                </div>

            :
              error === '' ?
              <Box className='paddT' sx={{ display: 'flex', margin: 'auto' }}>
              <CircularProgress />
              </Box>
    
              :
    
              <p>{error}</p>
            }

                {/*parte dos graficos */}
                <Grid container component="main" sx={{  display: 'flex', }} spacing={2}>
                      {packagesUserBrand.filter((item) =>
                      dealerName !== '' && item.dealer === dealerName
                      ).map((item, index) => {
                        const dataGraf = [{
                          "name": "Básico",
                          "Quantidade": item.basicCount,
                        },
                        {
                          "name":  "Compacto",
                          "Quantidade": item.compactCount,
                        },
                        {
                          "name":  "Premium",
                          "Quantidade": item.premiumCount,
                        },
                        {
                          "name":  "Full",
                          "Quantidade": item.fullCount,
                        
                        },
                        {
                          "name":  "Urban",
                          "Quantidade": item.urbanTv,
                        }                    
                      ]

                        const packsCheck = [{
                          correct: item.data.filter(i => i.pacoteYplayStatus === 'OK').map(item => item.pacoteYplayStatus),
                          incorrect: item.data.filter(i => i.pacoteYplayStatus === 'ERRO').map(item => item.pacoteYplayStatus),
                        }]

                        return(
                          <Grid key={index} item xs={12} sm={12} md={12} elevation={4} square style={{display: 'flex',}} container spacing={2}>

                            <Grid item xs={12} sm={8} md={8} elevation={4} square>
                              <Container style={{width: '100%', height: 'auto', margin: 'auto', borderRadius: 10, paddingBottom: 40}}>
                                <div style={{margin: 'auto', width: '100%', paddingTop: 1}}>
                                <h2 className='gridH2 alignCenter '>Active packages</h2>
                                <ComposedChart
                                  layout="vertical"
                                  width={380}
                                  height={350}
                                  data={dataGraf}
                                  margin={{
                                    top: 20,
                                    right: 20,
                                    bottom: 40,
                                    left: 50
                                  }}
                                >
                                  <XAxis type="number" dataKey={"Quantidade"} tick={{fontSize: 14,}}/>
                                  <YAxis dataKey="name" type="category" tick={{fontSize: 14}} scale="band" />
                                  <Tooltip />
                                  <Legend wrapperStyle={style}/>
                                  <Bar dataKey="Quantidade" barSize={40} fill="#0088FE" />
                                </ComposedChart>
                                </div>
                              </Container>
                            </Grid>

                            <Grid item xs={12} sm={4} md={4} elevation={4} square container >
                              <Grid item xs={12} sm={12} md={12} elevation={4} square>
                                <Container style={{width: '100%', height: 80, borderRadius: 10, marginBottom: 10}}>
                                  <div className='pckConfig'>
                                    <h2 className='gridH2 alignCenter '>Active Users: {packsCheck.map((i) => i.correct.length)}</h2>
                                  </div>

                                </Container>
                              </Grid>
                              <Grid  item xs={12} sm={12} md={12} elevation={4} square>
                                <Container style={{width: '100%', height: 80, borderRadius: 10, marginTop: 10}}>
                                  <div className='pckConfig'>
                                    <h2 className='gridH2 alignCenter '>Incorrect packages: {packsCheck.map((i) => i.incorrect.length)}</h2>
                                  </div>
                                </Container>

                              </Grid>
                            </Grid>


                        </Grid>
                        )
                      }
                      
                      )}
                


                <Grid item xs={12} sm={12} md={12} elevation={4} square>
                    {packagesUserBrand.filter((item) =>
                    dealerName !== '' && item.dealer === dealerName 
                    ).map((item, index) => {
                        const pages = Math.ceil(item.data.length / itensPerPage)
                        const startIndex = currentPage * itensPerPage; //indexOfLastItem
                        const endIndex = startIndex + itensPerPage; //indexOfFirstItem
                        const currentItens = item.data.slice(startIndex, endIndex)
    
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
                        <Container key={index} style={{width: '100%', height: 'auto', margin: 'auto', borderRadius: 10, paddingBottom: 40 }}>
                          
                            
    
                          <div style={{margin: 'auto', width: '90%',  display: 'flex', justifyContent: 'space-between', height: 70, alignItems: 'center', paddingTop: 30}}>
                            <div style={{width: '20%',  height: 'auto'}}>
                              <h2 className='gridH2'>Active Users and Packages</h2>
                            </div>

                          </div>



                          <div style={{ width: '95%', height: 'auto', margin: 'auto', marginBottom: 30}}>
                          <table style={{ width: '100%', height: '100%', paddingTop: 30, paddingBottom: 30, }}>
                            <AlternativeTheadStyle style={{width: '100%', height: 60, }}>
                              <tr>
                                <th className='tbrc tbr1 fontTH'>Login</th>
                                <th className='tbrc tbr2 fontTH'>identifier</th>
                                <th className='tbrc tbr3 fontTH'>Y.Completo</th>
                                <th className='tbrc tbr3 fontTH'>Y.Light</th>
                                <th className='tbrc tbr4 fontTH'>Kids</th>
                                <th className='tbrc tbr4 fontTH'>Nacional</th>
                                <th className='tbrc tbr4 fontTH'>Studios</th>
                                <th className='tbrc tbr4 fontTH'>TVOD</th>
                                <th className='tbrc tbr4 fontTH'>Urban</th>
                              </tr>
                            </AlternativeTheadStyle>
                            <tbody style={{overflowY: 'scroll', width: '100%', height: 'auto', marginTop: 20,}} >
                              {currentItens.map((items, i) => {
                                  const dealerPackages = [{
                                      login: items.login,
                                      packYPlayCompleto: items.pacotes.filter(i => i.product === 'YPlay Completo').map(item => item.product),
                                      packYPlayLight: items.pacotes.filter(i => i.product === 'Yplay Light').map(item => item.product),
                                      packSVODKids: items.pacotes.filter(i => i.product === 'SVOD Kids').map(item => item.product),
                                      packSVODNacional: items.pacotes.filter(i => i.product === 'SVOD Nacional').map(item => item.product),
                                      packSVODStudio: items.pacotes.filter(i => i.product === 'SVOD Studio').map(item => item.product),
                                      packTVOD: items.pacotes.filter(i => i.product === 'TVOD').map(item => item.product),
                                      packYPlayUrban: items.pacotes.filter(i => i.product === 'Yplay UrbanTV').map(item => item.product),
                                      packIdentifier: items.pacotes.filter(i => i.product !== 'Yplay UrbanTV' 
                                      && i.product !== 'YPlay Completo' 
                                      && i.product !== 'Yplay Light' 
                                      && i.product !== 'SVOD Kids' 
                                      && i.product !== 'SVOD Nacional' 
                                      && i.product !== 'SVOD Studio' 
                                      && i.product !== 'TVOD' ).map(item => item.product),
                                  }]

                                return(
                                    <tr key={i} >
                                        {dealerPackages.map((dealer) => {                                          
                                            return(
                                                <>
                                                  {dealer.packIdentifier.length == 1 ? 
                                                    <>
                                                    <td className='tbrc tbr1 fontS'>{dealer.login}</td>
                                                    <td className='tbrc tbr2 fontS'>{dealer.packIdentifier}</td>
                                                    <td className='tbrc tbr3 fontS'>{dealer.packYPlayCompleto == 'YPlay Completo' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    <td className='tbrc tbr3 fontS'>{dealer.packYPlayLight == 'Yplay Light' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    <td className='tbrc tbr4 fontS'>{dealer.packSVODKids == 'SVOD Kids' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    <td className='tbrc tbr4 fontS'>{dealer.packSVODNacional == 'SVOD Nacional' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    <td className='tbrc tbr4 fontS'>{dealer.packSVODStudio == 'SVOD Studio' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    <td className='tbrc tbr4 fontS'>{dealer.packTVOD == 'TVOD' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    <td className='tbrc tbr4 fontS'>{dealer.packYPlayUrban == 'Yplay UrbanTV' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    </> 
                                                  :
                                                    <>
                                                    <td className='tbrc tbr1r fontS'>{dealer.login}</td>
                                                    <td className='tbrc tbr1r fontS'>Há algo de errado com este usuário</td>
                                                    </>
                                                  }
                                                </>
                                            )

                                        })}
                                    </tr>

                                ) 
                        })}
                            </tbody>                 
                          </table>
                          </div>
    
                          <div className='pageBNP-Config'>
                            <div className='pageBNP-P1'>
                              <ul className='pageNumbers'>
                                <li>
                                  <button 
                                  onClick={handlePrevbtn}
                                  disabled={currentPage == 0 }
                                  className={currentPage == 0 ? 'disabled' : ''}
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
                            </div>
                            <div className='pageBNP-P2'>
                            <div style={{ display: 'flex', alignItems: 'center'}}>

                              <div style={{margin: 'auto 10px auto auto'}}>
                                <p style={{fontSize: '1rem', fontWeight: 'bold'}}>Itens p/ page:</p>
                              </div>
                              <div >
                                <select style={{ height: 35, fontSize: '1rem', fontWeight: 'bold', margin: 'auto 20px auto auto', borderRadius: 8}} value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
                                  <option value={10}>10</option>
                                  <option value={25}>25</option>
                                  <option value={50}>50</option>
                                </select>
                              </div>
                              </div>
                            </div>
                          </div>
    
                        </Container>
                        )}
                    )}
                </Grid>

                </Grid>

            

            </div>


            <ThemeMenu/> 
            </div>
        </div>
    )
}

export default Dealers;