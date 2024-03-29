import React, {useEffect, useState, useRef} from 'react';

import './index.css'

import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import api from '../../services/api';



import { CSVLink } from "react-csv";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Pdf from "react-to-pdf";

import Container from '../../styles/theme/components/Container';
import ClipForm1 from '../../styles/theme/components/ClipForm1';
import ClipForm2 from '../../styles/theme/components/ClipForm2';
import DropDownHeader from '../../styles/theme/components/DropDownHeader';
import DropDownList from '../../styles/theme/components/DropDownList';
import AlternativeTheadStyle from '../../styles/theme/components/AlternativeTheadStyle';

import {ExcelExport, ExcelExportAtivosStenna, ExcelExportAtivos} from '../../components/excel/ExcelExport';
import ThemeMenu from '../../components/themeMenu';
import Header from '../../components/header';
import PermanentDrawerLeft from '../../components/drawer';

import Grid from '@material-ui/core/Grid';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltips from '@mui/material/Tooltip';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InsightsIcon from '@mui/icons-material/Insights';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularProgress from '@mui/material/CircularProgress';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';

import { AreaChart, Area, Legend, Tooltip, Sector, Cell, BarChart, XAxis, YAxis, Bar, Brush, CartesianGrid, ComposedChart, LineChart, Line, ResponsiveContainer  } from "recharts";
import Insights from '@mui/icons-material/Insights';


const DropDownListContainer = styled("div")`
`;

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

  const dataT = [
    { name: 'Page A', uv: 4000 },
    { name: 'Page B', uv: 3000 },
    { name: 'Page C', uv: 2000 },
    { name: 'Page D', uv: 2500 },
    { name: 'Page E', uv: 1890 },
    { name: 'Page F', uv: 2390 },
    { name: 'Page G', uv: 3490 },
  ];

const ref = React.createRef();


function Home() {

  const navigate  = useNavigate();

  const [watchingNumber, setWatchingNumber] = React.useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [loading5, setLoading5] = useState(false);
  const [loading6, setLoading6] = useState(false);
  const [loading7, setLoading7] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [qtdDealer, setQtdDealer] = React.useState(null);
  const [qtdVendor, setQtdVendor] = React.useState(null);
  const [expectedUsersBrand, setExpectedUsersBrand] = React.useState(null);
  const [activeUsersBrand, setActiveUsersBrand] = React.useState(null);
  const [needAjustUsersBrand, setNeedAjustUsersBrand] = React.useState(null);
  const [watchingATV, setWatchingATV] = React.useState(null);
  const [watchingAndroid, setWatchingAndroid] = React.useState(null);
  const [watchingIos, setWatchingIos] = React.useState(null);
  const [watchingWeb, setWatchingWeb] = React.useState(null);
  const [authVerify, setAuthVerify] = React.useState('');
  const [ totalPayment, setTotalPayment] = React.useState(null);
  const [ detailsShown, setDetailsShown] = React.useState([]);
  const [ detailProvedor, setDetailProvedor] = React.useState('');

  function totalEarned(value, base) {

    const total = (value * base); 
  
    const formated = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
    return formated;
  
  };

  const handleChange = (event) => {
    setMonthName(event.target.value);
  };
  const handleChange2 = (event) => {
    setProvedorName(event.target.value);
  };

  const [ packagesUser, setPackagesUser] = useState([ {
    IDVendor: '',
    Vendor: '',
    Pacote: '',
    QTD_Clientes: '',
  } ]);

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

  const [ ctInfo, setCtInfo] = useState([ {
    analytics: [{
      info: [{
        year: '',
        period: '',
        month: '',
        totalAssinantes: '',
        data: [{
          provedor: '',
          data: [{
            provedor: '',
            razaoSocial: '',
            cnpj: '',
            cidade: '',
            estado: '',
            numeroAssinantes: '',
            month: ''
          }]
        }]
      }]
    }]
  } ]);

  const [ monthName, setMonthName ] = useState('março');
  const [ periodName, setPeriodName ] = useState(["01/03/2022 até 31/03/2022"]);
  const [ yearName, setYearName ] = useState('2022');

  const [ provedorName, setProvedorName ] = useState('');
  const [open2, setOpen2] = React.useState(false);

  const [ctInfoUsers, setCtInfoUsers] = useState([ {
    analyticsInfo: [{
      month: '',
      data: [{
        provedor: '',
        data: [{
          provedor: '',
          login: '',
          pacote: '',
        }]
      }]
    }]
  } ]);
  
  const toggling = () => setIsOpen(!isOpen);
  let domNode = useClickOutside(() => {
      setIsOpen(false);
    });
  const toggling2 = () => setIsOpen2(!isOpen2);
  let domNode2 = useClickOutside(() => {
      setIsOpen2(false);
    });

  const [ renderD, setRenderD] = React.useState(false)

  const toggleShown = (provedor) => {
    const shownState = detailsShown.slice();
    const index = shownState.indexOf(provedor);

    if(index >= 0) {
      shownState.splice(index, 1);
      setDetailsShown(shownState);
    } else {
      shownState.push(provedor);
      setDetailsShown(shownState)
    }
  }


    const [ dealerReports, setDealerReports] = useState ([{
      dealer: '',
      basicCount: '',
      compactCount: '',
      fullCount: '',
      premiumCount: '',
      urbanTv: '',
      total:  '',
      data: [{}],
    }])

    const headers = [
      { label: "Brand Name", key: "dealer" },
      { label: "Basic", key: "basicCount" },
      { label: "Compact", key: "compactCount" },
      { label: "Full", key: "fullCount" },
      { label: "Premium", key: "premiumCount" },
      { label: "Urban", key: "urbanTv" },
      { label: "Total", key: "total" },
    ];

    useEffect (() => {

      fetch('./packageContentInfo.json', {
        headers: {
          Accept: "application/json"
        }
      }).then(res => 
        res.json()
      ).then(resp => {
        setCtInfo(resp);
        setTotalPayment(resp.analytics.map((item, i) => item.info.map((item, index) => item.totalAssinantes).reduce((total, numero) => total + numero, 0) ));
        setLoading6(true);
      });

      fetch('./packageContent.json', {
        headers: {
          Accept: "application/json"
        }
      }).then(res => 
        res.json()
      ).then(resp => {
        setCtInfoUsers(resp);
        setLoading7(true);
      });

  }, [])

  return(

    
      <div style={{width: '100%', height: '100%', display: 'flex',}}>
        <div style={{}}>
          <PermanentDrawerLeft/>
        </div>
        <div style={{ width: '100%', height: 'auto'}}>
          <Header />

          <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>
          {loading6 === true && loading7 === true
          ?
          <Grid className='animationPg2' container component="main" sx={{  display: 'flex', }} spacing={2}>

            <Grid item xs={12} sm={12} md={5} elevation={4} square="true">
              <Container  style={{
                  height: 250, 
                  borderRadius: 10, 
                  boxShadow: 'none'}}>
                    <div className='defConfigCard'>
                      <div className='gridDefCardC1'>
                        <div className='gridCardC1C1'>
                          <div className='gridCardC1C1D1 gridColor3'>
                            <AnalyticsIcon className='gridCardIcon'/>
                          </div>
                          <div className='gridCardC1C1D2'>
                            <h2 className='gridH2 gridMargin'>Faturamento Total</h2>
                          </div>
                        </div>


                        <div className='gridCardC1C2 gridMarginTop' style={{display: 'flex'}}>
                          <div className='gridCardC1C2D12'>
                            <h2 className='gridH2'>{totalEarned(totalPayment, 1.60)}</h2>
                            <p className='gridSub'>Valor Base: R$ 1,60 (Unitário)</p>
                          </div>
                        </div>
                      </div>

                      <div className='gridDefCardC2'>
                        <ClipForm2/>
                        <ClipForm1/>
                      </div>
                    </div>
                </Container>

            </Grid>

            <Grid item xs={12} sm={12} md={12} elevation={4} square="true">
              <Container style={{width: '100%',  height: 'auto', margin: 'auto', borderRadius: 10,}}>
                <div style={{margin: 'auto', width: '90%',  display: 'flex', justifyContent: 'space-between', height: 70, alignItems: 'center', paddingTop: 30}}>
                  <div style={{width: '20%',  height: 'auto'}}>
                    <h2 className='gridH2'>Evolução de ativos </h2>
                  </div>
                  <div style={{width: '10%', height: 45,  display: 'flex', justifyContent: 'flex-end'}}>
                    <div ref={domNode} className='dropDownHeaderStyle'>
                    <DropDownHeader  onClick={toggling}>
                        <MoreVertIcon></MoreVertIcon>
                      </DropDownHeader>
                      {isOpen && (
                        <DropDownListContainer className='dropDownList'>
                          <DropDownList>
                            <ListItem >
                              <div style={{fontSize: 14}}>
                                {ctInfo.analytics.map((item, index) => {
                                  const data = item.info.map((item) => ({
                                    "month": item.month,
                                    "Ativos": item.totalAssinantes,
                                    "faturamento": totalEarned(item.totalAssinantes, 1.60)
                                  }))

                                  return(
                                    <ExcelExportAtivos key={index} className='menuAction' data={data}/>
                                  )
                                })}

                              </div>
                            </ListItem>
                          </DropDownList>
                        </DropDownListContainer>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ width: '95%', height: 'auto', margin: 'auto', }}>
                  {ctInfo.analytics.map((item, index) => {
                    const data = item.info.map((item) => (
                      {
                        "month": item.month,
                        "Ativos": item.totalAssinantes,
                        "faturamento": totalEarned(item.totalAssinantes, 1.60)

                      }
                    ))
                    return(
                      <div key={index} style={{marginTop: 30, marginBottom: 30}}>
                        <ResponsiveContainer width="100%" height={350}>
                          <AreaChart width={1100} height={350} data={data}
                            margin={{ top: 10, right: 50, left: 30, bottom: 10 }}>
                            <defs>
                              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1" >
                                <stop offset="5%" stopColor="#0088fe" stopOpacity={0.9}/>
                                <stop offset="95%" stopColor="#0088fe" stopOpacity={0.1}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="0.9 9" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="Ativos" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                            <Area type="monotone" dataKey="faturamento" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                          <Brush height={15} fill="url(#colorPv)" />
                          </AreaChart>
                          </ResponsiveContainer>
                      </div>
                    )
                  })}

                </div>
              
              </Container>

            </Grid>

            <Grid item xs={12} sm={12} md={12} elevation={4} square="true">
              {ctInfo.analytics.map((item, index) => {

                const dataProv = item.info.map((item, index) => ({
                  "month": item.month,
                  "quantidadeAtivos": item.data.map(item => item.data.filter(item => detailProvedor !== '' ? item.provedor === detailProvedor : '').slice().map(item => item.numeroAssinantes)).reduce(
                    ( acumulador, valorAtual ) => acumulador.concat(valorAtual),
                    []
                  )
                }))


                return(
                <Container key={index} style={{width: '100%',  height: 'auto', margin: 'auto', borderRadius: 10,}}>
                  <div style={{margin: 'auto', width: '90%',  display: 'flex', justifyContent: 'space-between', height: 70, alignItems: 'center', paddingTop: 30}}>
                    <div style={{width: '20%',  height: 'auto',}}>
                      <h2 className='gridH2'>Info Ativos </h2>
                    </div>
                    {/*inserir o button aqui */}
                    <div style={{ height: 45,  display: 'flex', justifyContent: 'flex-end', width: '50%'}}>
                      <div style={{width: '100%'}}>
                        <div style={{display: 'flex', position: 'relative', zIndex: 0,}}>
                        <Box className='' sx={{ minWidth: 220, marginBottom: 5 }}>
                        <FormControl sx={{ width: 180, paddingRight: 5 }}>
                            <InputLabel id="outlined-select-label">Mês</InputLabel>
                            <Select
                            labelId="outlined-select-label"
                            id="outlined-select-currency"
                            value={monthName === '' ? '' : monthName}
                            label="monthName"
                            onChange={handleChange}
                            >
                              {item.info.map((option, w) => (
                            <MenuItem key={w} value={option.month}>
                            {option.month}
                            </MenuItem>))}
                            </Select>
                        </FormControl>

                        { monthName !== '' && provedorName !== ''?

                        <FormControl sx={{ width: 180 }}>
                            <InputLabel id="outlined-select-label">Provedor</InputLabel>
                            <Select
                            labelId="outlined-select-label"
                            id="outlined-select-currency"
                            disabled={provedorName !== ''}
                            value={provedorName === '' ? '' : provedorName}
                            label="monthName"
                            onChange={handleChange2}
                            >
                            {item.info.filter(item => monthName !== '' ? item.month === monthName : '').map(item => item.data.map((option, w) => (
                            <MenuItem key={w} value={option.provedor}>
                            {option.provedor}
                            </MenuItem>)))}

                            </Select>
                        </FormControl>
                          :
                          ''
                          
                        } 
                        </Box>
                        {provedorName !== null && provedorName !== '' ?
                          <Tooltips title="Remover Provedor" placement="right">
                            <button className='btnS' onClick={(e => {
                              setDetailProvedor('');
                              setProvedorName('');
                              
                            })}><CancelIcon /></button>
                          </Tooltips>
                          :
                          ''
                          
                        }                
                        </div>
                      </div>
                      <div style={{ height: 45,  }}>
                        <div ref={domNode2} className='dropDownHeaderStyle'>
                          <DropDownHeader onClick={toggling2}>
                            <MoreVertIcon></MoreVertIcon>
                          </DropDownHeader>
                          {isOpen2 && (
                        <DropDownListContainer className='dropDownList'>
                          <DropDownList>
                            <ListItem >
                              <div style={{fontSize: 14}}>
                                {ctInfo.analytics.map((item, index) => {
                                  const data = item.info
                                  .filter(item => monthName !== '' ? item.month === monthName : item)
                                  .map((item) => item.data
                                    .map((item) => item.data
                                      .find((item, index) => ({
                                    "provedor": item.provedor,
                                    "razaoSocial": item.razaoSocial,
                                    "cnpj": item.cnpj
                                  })))).reduce(
                                    ( acumulador, valorAtual ) => acumulador.concat(valorAtual),
                                    []
                                  );


                                  const assinant = item.info
                                  .filter(item => monthName !== '' ? item.month === monthName : item)
                                  .map(item => item)

                                  const fatured = item.info
                                  .filter(item => monthName !== '' ? item.month === monthName : item)
                                  .map((item, index) => ({
                                    "fatured": totalEarned(item.totalAssinantes, 1.60), 
                                  }))

                                  return(
                                    <ExcelExportAtivosStenna 
                                      key={index} 
                                      className='menuAction' 
                                      data={data} 
                                      month={monthName} 
                                      assinant={assinant}
                                      fatured={fatured}
                                      />
                                  )
                                })}

                              </div>
                            </ListItem>
                          </DropDownList>
                        </DropDownListContainer>
                      )}


                        </div>
                      </div>
                    </div>

                  </div>

                  <div style={{ width: '95%', height: 'auto', margin: 'auto', marginBottom: 30}}>
                    <table style={{ width: '100%', height: '100%', paddingTop: 30, paddingBottom: 30,}}>
                      <AlternativeTheadStyle style={{width: '100%', height: 60, }}>
                        <tr >
                          <th className='tbrc tbr4 fontTH'>Provedor</th>
                          <th className='tbrc tbr1 fontTH'>Razão Social</th>
                          <th className='tbrc tbr4 fontTH'>CNPJ</th>
                          <th className='tbrc tbr4 fontTH'>Cidade</th>
                          <th className='tbrc tbr4 fontTH'>Estado</th>
                          <th className='tbrc tbr4 fontTH'>Assinantes</th>
                          <th className='tbrc tbr4 fontTH'>Ações</th>
                        </tr>
                      </AlternativeTheadStyle>

                        {item.info
                        .filter(item => monthName !== '' ? item.month === monthName : item)
                        .map(item => item.data
                          .filter(item => provedorName !== '' ? item.provedor === provedorName : item)
                          .map(item => item.data
                            .map((itens, i) => {
                          return(
                                <tbody ref={ref} key={i} style={{ width: '100%', height: 'auto', marginTop: 20,}}>
                                <tr>
                                  <td className='tbrc tbr4 fontS'>{itens.provedor}</td>
                                  <td className='tbrc tbr1 fontS'>{itens.razaoSocial}</td>
                                  <td className='tbrc tbr4 fontS'>{itens.cnpj}</td>
                                  <td className='tbrc tbr4 fontS'>{itens.cidade}</td>
                                  <td className='tbrc tbr4 fontS'>{itens.estado}</td>
                                  <td className='tbrc tbr4 fontS'>{itens.numeroAssinantes}</td>
                                  
                                  <td className='tbrc tbr4 fontS'>
                                    {
                                      provedorName !== '' 
                                      ?
                                      ''
                                      :
                                        <Tooltips title="Detalhes Evolução - Provedor" placement="right">
                                          <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => {
                                              toggleShown(itens.provedor, itens.numeroAssinantes);
                                              setDetailProvedor(itens.provedor)
                                              setProvedorName(itens.provedor)
                                            }}
                                          >
                                            <Insights style={{color: '#0088FE'}} />
                                            </IconButton>
                                        </Tooltips>
                                    }
                                  </td>
                                </tr>

                                {provedorName !== '' 
                                ?
                                  detailsShown.includes(itens.provedor) && (
                                    <React.Fragment
                                    >
                                    <tr>
                                        <td className='tbrc tbr1 fontS' colSpan="4" ></td>
                                        <td className='tbrc tbr1 fontTH' colSpan="2" >Base Ativos - {itens.month}</td>
                                    </tr>
                                    <tr style={{height: 70, }}>
                                        <td colSpan="2" ></td>
                                        <td colSpan="2" className='tbrc tbr4 fontTH'>Provedor</td>
                                        <td colSpan="2" className='tbrc tbr4 fontTH'>Login</td>
                                        <td colSpan="1" className='tbrc tbr4 fontTH'>Pacote</td>
                                    </tr>

                                      {ctInfoUsers.analytics
                                      .filter(item => item.month === monthName)
                                      .map(item => item.data
                                        .filter(item => item.provedor === detailProvedor)
                                      .map(item => item.data
                                        .map((item, index) => {
                                          
                                          return(
                                            <tr key={index} style={{maxHeight: 300, minHeight: 200}}>
                                                <td colSpan="2" ></td>
                                                <td colSpan="2" className='tbrc tbr4 fontS'>{item.provedor}</td>
                                                <td colSpan="2" className='tbrc tbr4 fontS'>{item.login}</td>
                                                <td colSpan="1" className='tbrc tbr4 fontS'>{item.pacote}</td>
                                            </tr>

                                          )
                                        })))}
                                    <tr>
                                        <td className='tbrc tbr1 fontS' colSpan="2" ></td>
                                        <td className='tbrc tbr1 fontTH' colSpan="2" >Evolução - Provedor</td>
                                        <td className='tbrc tbr1 fontS' colSpan="2" ></td>
                                    </tr>
                                    <tr>                

                                        <td className='tbrc tbr1 fontS' colSpan="7" >
                                          <div style={{ width: '100%', height: 300}}>
                                          <ResponsiveContainer width="100%" height={200}>
                                            <LineChart
                                              width={500}
                                              height={200}
                                              data={dataProv}
                                              margin={{
                                                top: 10,
                                                right: 30,
                                                left: 0,
                                                bottom: 0,
                                              }}
                                            >
                                              <CartesianGrid strokeDasharray="3 3" />
                                              <XAxis dataKey="month" />
                                              <YAxis />
                                              <Tooltip />
                                              <Line type="monotone" dataKey="quantidadeAtivos" stroke="#0088FE" fill="#0088FE" />
                                            </LineChart>
                                          </ResponsiveContainer>
                                          </div>
                                        </td>
                                    </tr>
                                    </React.Fragment>
                                  )
                                :
                                ''
                                }
                          </tbody>
                              

                              )
                            }))) 
                          }

                    </table>
                  </div>
                
                </Container>

                )
              })}

            </Grid>




          </Grid>
          :

          error === '' ?
          <Box className='paddT' sx={{ display: 'flex', margin: 'auto' }}>
          <CircularProgress />
          </Box>

          :

          <p>{error}</p>
          }
          </div>



          <ThemeMenu/> 
        </div>

    </div>
  );
}

export default Home;