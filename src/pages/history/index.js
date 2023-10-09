import React, {useEffect, useState, useRef} from 'react';

import './index.css'

import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import api from '../../services/api';
import axios from 'axios';



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

  function formatValue(duration) {

    const durationEvent = (duration / 60); 
  
    const total = durationEvent.toFixed(0);
  
    return total;
  
}

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


function History() {

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
  const [isOpen3, setIsOpen3] = useState(false);
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
  const [ detailProvedor, setDetailProvedor] = React.useState("");

  function totalEarned(value, base) {

    const total = (value * base); 
  
    const formated = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
    return formated;
  
  };
  function totalEarnedFilter(value, base) {

    const total = (value * base); 
  
    const formated = total.toFixed(0);
  
    return formated;
  
  };

  function totalEarnedFilter2(value) {

    const total = parseInt(value)
  
    const formated = total.toFixed(0);
  
    return formated;
  
  };

  const handleChange = (event) => {
    setMonthName(event.target.value);
  };
  const handleChange3 = (event) => {
    setYearValue(event.target.value);
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
        year: "",
        period: "",
        month: "",
        totalSubscribers: "",
        data: [{
            dealer: "",
            data: [{
                dealerName: "",
                corporateName: "",
                cnpj: "",
                city: "",
                numberOfSubscribers: ""
            }]
        }]
      }]
    }]
  } ]);

  const [ contentUsers, setContentUsers] = useState ([{

  }]);

  const [ yearValue, setYearValue ] = useState("2022");
  const [ monthName, setMonthName ] = useState("março");
  const [ periodName, setPeriodName ] = useState(["01/03/2022 até 31/03/2022"]);
  const [ yearName, setYearName ] = useState("2022");

  const [ totalUsers, setTotalUsers] = useState(0);

  const [openDetails, setOpenDetails] = React.useState(false);
  const [ provedorName, setProvedorName ] = useState("");
  const [open2, setOpen2] = React.useState(false);

  const [ctInfoUsers, setCtInfoUsers] = useState([ {
    analyticsInfo: [{
      month: "",
      data: [{
        provedor: "",
        data: [{
          provedor: "",
          login: "",
          pacote: "",
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
  const toggling3 = () => setIsOpen3(!isOpen3);
  let domNode3 = useClickOutside(() => {
      setIsOpen3(false);
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


    const yearsOption = [
      { year: "2022" },
      { year: "2023" },
    ];

    useEffect (() => {

      (async () => {
        const result = await api.get('getDealerInfo', {
        })
        .then((result) => {
          setCtInfo(result.data);
          //console.log("o result", result)
          setTotalPayment(totalEarnedFilter2(result.data.analytics.map((item, i) => item.info.map((item, index) => item.totalSubscribers * item.unitaryValue).reduce((total, numero) => total + numero, 0) )));
          setLoading6(true);

  
    })
        .catch((error) => {
          if(error) {
            console.log(error)
        }
    })})();


  }, [])

  async function getInfoUsers(mes, ano, provedor) {

    let mesT = mes;
    let anoT = ano
    let provedorT = provedor
    console.log("o mes", mes, ano, provedor)
    const requisicao = axios.post('https://monitoringv2.youcast.tv.br/getUsersDealerInfo', {
      month: mesT, year: anoT, dealer: provedorT,
    
    })
    .then(function (response) {
      console.log("deu bom", response)
      setCtInfoUsers(response.data);
      setContentUsers(response.data);
      setLoading7(true);

      })
      .catch(function (error) {
        console.log(error)
      });

      console.log("o que eu enviei", requisicao)

}

  return(

    
      <div style={{width: '100%', height: '100%', display: 'flex',}}>
        <div style={{}}>
          <PermanentDrawerLeft/>
        </div>
        <div style={{ width: '100%', height: 'auto'}}>
          <Header />

          <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>
          {loading6 === true 
          ?
          <Grid className='animationPg2' container component="main" sx={{  display: 'flex', }} spacing={2}>

            <Grid item xs={12} sm={12} md={5} elevation={4} square="true">
              <Container  style={{
                  height: 180, 
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
                            <h2 className='gridH2'>R$: {totalPayment}</h2>
                            <p className='gridSub'></p>
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
                    <h2 className='gridH2'>Evolução de Customers - 2022</h2>
                  </div>

                  {/* 
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
                                  const data = item.info.filter(item => item.year === '2022').map((item) => (
                                    {
                                      "month": item.month,
                                      "Quantidade": item.totalSubscribers,
                                      "faturamento": totalEarnedFilter(item.totalSubscribers, item.unitaryValue)

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
                  </div>*/}

                </div>

                <div style={{ width: '95%', height: 'auto', margin: 'auto', }}>
                  {ctInfo.analytics.map((item, index) => {
                    const data = item.info.filter(item => item.year === '2022').map((item) => (
                      {
                        "month": item.month,
                        "Quantidade": item.totalSubscribers,
                        "faturamento": totalEarnedFilter(item.totalSubscribers, item.unitaryValue)

                      }))


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
                            <Area type="monotone" dataKey="Quantidade" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
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
              <Container style={{width: '100%',  height: 'auto', margin: 'auto', borderRadius: 10,}}>
                <div style={{margin: 'auto', width: '90%',  display: 'flex', justifyContent: 'space-between', height: 70, alignItems: 'center', paddingTop: 30}}>
                  <div style={{width: '20%',  height: 'auto'}}>
                    <h2 className='gridH2'>Evolução de Customers - 2023 </h2>
                  </div>
                  {/* 
                  <div style={{width: '10%', height: 45,  display: 'flex', justifyContent: 'flex-end'}}>
                    <div ref={domNode} className='dropDownHeaderStyle'>
                    <DropDownHeader  onClick={toggling3}>
                        <MoreVertIcon></MoreVertIcon>
                      </DropDownHeader>
                      {isOpen3 && (
                        <DropDownListContainer className='dropDownList'>
                          <DropDownList>
                            <ListItem >
                              <div style={{fontSize: 14}}>
                                {ctInfo.analytics.map((item, index) => {
                                  const data = item.info.filter(item => item.year === '2023').map((item) => (
                                    {
                                      "month": item.month,
                                      "Quantidade": item.totalSubscribers,
                                      "faturamento": totalEarnedFilter(item.totalSubscribers, item.unitaryValue)

                                    }
                                  ))

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
                  </div>*/}
                </div>


                
                <div style={{ width: '95%', height: 'auto', margin: 'auto', }}>
                  {ctInfo.analytics.map((item, index) => {


                    const data = item.info.filter(item => item.year === '2023').map((item) => (
                      {
                        "month": item.month,
                        "Quantidade": item.totalSubscribers,
                        "faturamento": totalEarnedFilter(item.totalSubscribers, item.unitaryValue)

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
                            <Area type="monotone" dataKey="Quantidade" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
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

                const dataProv = item.info.filter(item => item.year === '2022').map((item, index) => ({
                  "month": item.month,
                  "quantidadeAtivos": item.data.map(item => item.data.filter(item => detailProvedor !== "" ? item.dealerName === detailProvedor : "").slice().map(item => item.numberOfSubscribers)).reduce(
                    ( acumulador, valorAtual ) => acumulador.concat(valorAtual),
                    []
                  )
                }))



                return(
                <Container key={index} style={{width: '100%',  height: 'auto', margin: 'auto', borderRadius: 10,}}>
                  <div style={{margin: 'auto', width: '90%',  display: 'flex', justifyContent: 'space-between', height: 70, alignItems: 'center', paddingTop: 30}}>
                    <div style={{width: '20%',  height: 'auto',}}>
                      <h2 className='gridH2'>Info Qtd. </h2>
                    </div>
                    {/*inserir o button aqui */}
                    <div style={{ height: 45,  display: 'flex', justifyContent: 'flex-end', width: '70%'}}>
                      <div style={{width: '100%'}}>
                        <div style={{display: 'flex', position: 'relative', zIndex: 0,}}>
                        <Box sx={{ minWidth: 220, marginBottom: 5 }}>


                        <FormControl sx={{ width: 180, paddingRight: 5 }}>
                            <InputLabel id="outlined-select-label">Ano</InputLabel>
                            <Select
                            labelId="outlined-select-label"
                            id="outlined-select-currency"
                            value={yearValue === "" ? "" : yearValue}
                            label="yearValue"
                            onChange={handleChange3}
                            >
                              {yearsOption.map((option, w) => (
                            <MenuItem key={w} value={option.year}>
                            {option.year}
                            </MenuItem>))}
                            </Select>
                        </FormControl>

                        <FormControl sx={{ width: 180, paddingRight: 5 }}>
                            <InputLabel id="outlined-select-label">Mês</InputLabel>
                            <Select
                            labelId="outlined-select-label"
                            id="outlined-select-currency"
                            value={monthName === "" ? "" : monthName}
                            label="monthName"
                            onChange={handleChange}
                            >
                              {item.info.filter(item => yearValue !== "" ? item.year === yearValue : item).map((option, w) => (
                            <MenuItem key={w} value={option.month}>
                            {option.month}
                            </MenuItem>))}
                            </Select>
                        </FormControl>

                        </Box>                
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
                                  .filter(item => yearValue !== "" ? item.year === yearValue : item)
                                  .filter(item => monthName !== "" ? item.month === monthName : item)
                                  .map((item) => item.data
                                    .map((item) => item.data
                                      .find((item, index) => ({
                                    "provedor": item.dealerName,
                                    "razaoSocial": item.corporateName,
                                    "cnpj": item.cnpj
                                  })))).reduce(
                                    ( acumulador, valorAtual ) => acumulador.concat(valorAtual),
                                    []
                                  );


                                  const assinant = item.info
                                  .filter(item => yearValue !== "" ? item.year === yearValue : item)
                                  .filter(item => monthName !== "" ? item.month === monthName : item)
                                  .map(item => item)

                                  const fatured = item.info
                                  .filter(item => yearValue !== "" ? item.year === yearValue : item)
                                  .filter(item => monthName !== "" ? item.month === monthName : item)
                                  .map((item, index) => ({
                                    "fatured": totalEarned(item.totalSubscribers, item.unitaryValue),
                                    "baseValue": item.unitaryValue.toFixed(2)
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
                          <th className='tbrc tbr4 fontTH'>Assinantes</th>
                          {/* 
                          <th className='tbrc tbr4 fontTH'>Ações</th>*/}
                        </tr>
                      </AlternativeTheadStyle>

                        {item.info
                        .filter(item => yearValue !== "" ? item.year === yearValue : item)
                        .filter(item => monthName !== "" ? item.month === monthName : item)
                        .map(item => item.data
                          .map(item => item.data
                            .map((itens, i) => {
                          return(
                                <tbody ref={ref} key={i} style={{ width: '100%', height: 'auto', marginTop: 20,}}>
                                <tr>
                                  <td className='tbrc tbr4 fontS'>{itens.dealerName}</td>
                                  <td className='tbrc tbr1 fontS'>{itens.corporateName}</td>
                                  <td className='tbrc tbr4 fontS'>{itens.cnpj}</td>
                                  <td className='tbrc tbr4 fontS'>{itens.city}</td>
                                  <td className='tbrc tbr4 fontS'>{itens.numberOfSubscribers}</td>
                                  
                                  {/* 
                                  <td className='tbrc tbr4 fontS'>
                                        <Tooltips title="Detalhes Evolução - Provedor" placement="right">
                                          <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => {

                                              //toggleShown(itens.dealerName, itens.numberOfSubscribers);
                                              //setDetailProvedor(itens.dealerName)
                                              setProvedorName(itens.dealerName)
                                              getInfoUsers(monthName, yearValue, item.dealer)
                                              setTotalUsers(itens.numberOfSubscribers)
                                              setOpenDetails(true)

                                            }}
                                          >
                                            <Insights style={{color: '#0088FE'}} />
                                            </IconButton>
                                        </Tooltips>
                                  </td>*/}
                                </tr>

                                {openDetails === true
                                     ?
                                     <div className='containerDetails'>
                                        <Container className='contentDetails'>
                                          <div className='contentDetailsHeader'>
                                            <div className='contentDetailsHeaderTitle'>
                                              <h6>{provedorName}</h6>
                                              <h6>Total Previsto: {totalUsers}</h6>

                                            </div>

                                            <div className='contentDetailsHeaderButton'>
                                            <Tooltips title="Fechar Detalhes" placement="right">
                                              <button className='btnS' onClick={(e => {
                                                setOpenDetails(false);
                                                setProvedorName("");
                                                
                                              })}><CancelIcon /></button>
                                            </Tooltips>
                                            </div>
                                          </div>

                                          <div className='contentDetailsBody'>
                                            <table style={{width: '100%'}}>
                                            <div style={{width: '100%', }}>
                                            <AlternativeTheadStyle style={{width: '100%', height: 60, }}>
                                              <tr style={{}}>
                                                <th className='tbrc tbr1 fontTH'>Login</th>
                                                <th className='tbrc tbr4 fontTH'>Pacote</th>
                                              </tr>
                                            </AlternativeTheadStyle>
                                            {yearValue === '2023' ? 
                                              contentUsers.length > 0 ?
                                              
                                              console.log("o content aqui", contentUsers.map(e => e[0].customers
                                                .filter(item => item.isactive === true && 
                                                                item.pacoteYplayStatus !== "ERRO" && 
                                                                item.pacoteYplay !== "Basic" && 
                                                                item.pacoteYplay !== "Compact" ))
                                                                )                                            

                                            : ''
                                          
                                            :
                                            ''
                                          }



                                            </div>
                                            


                                            </table>
                                          </div>
                                        </Container>
                                     </div>
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

          error === "" ?
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

export default History;