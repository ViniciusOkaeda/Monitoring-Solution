import React, {useEffect, useState, useRef} from 'react';

import './index.css'

import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import axios from 'axios';

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


function Now() {



  const navigate  = useNavigate();

  const [error, setError] = useState('');
  const [loading6, setLoading6] = useState(false);
  const [loading7, setLoading7] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [ totalPayment, setTotalPayment] = React.useState(null);
  const [ detailsShown, setDetailsShown] = React.useState([]);
  const [ detailProvedor, setDetailProvedor] = React.useState([""]);

  function totalEarned(value, base) {

    const total = (value * base); 
  
    const formated = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
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

  const [ dealerInfo, setDealerInfo] = useState([ {
    id: '',
    name: '',
    nomefantasia: '',
    razaosocial: '',
    cnpj: '',
    cidade: '',
    uf: '',
  } ]);

  const [ usersDealerInfo, setUsersDealerInfo] = useState([ {
    dealer: '',
    dealerId: '',
    parentDealer: '',
    vendor: '',
    vendorid: '',
    customers: [{
      login: '',
      idsms: '',
      idmw: '',
      dealerid: '',
      dealer: '',
      vendor: '',
      vendorid: '',
      packages: [{
        product: '',
        productid: '',
        activation: '',
        cancelled: '',
        haveYplayCompleto: '',
        haveSvodKids: '',
        haveSvodNacional: '',
        haveSvodStudio: '',
        haveCanaisLocais: '',
        havePacotePremium: '',
        havePacoteStart: '',
      }],
    }],
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

  const [ yearValue, setYearValue ] = useState("2022");
  const [ monthName, setMonthName ] = useState("março");
  const [ periodName, setPeriodName ] = useState(["01/03/2022 até 31/03/2022"]);
  const [ yearName, setYearName ] = useState("2022");

  const [ provedorName, setProvedorName ] = useState("");
  const [open2, setOpen2] = React.useState(false);

  const [openDetails, setOpenDetails] = React.useState(false);
  const [totalProvedor, setTotalProvedor] = React.useState(['']);

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

    useEffect (() => {

      

      (async () => {
        const result = await api.post('getDealerInfoNow', {
        })
        .then((result) => {
          setLoading6(true);
          setDealerInfo(result.data)
  
    })
        .catch((error) => {
          if(error) {
            console.log(error)
            //setError("Token Expirado, faça login novamente!")
            //window.localStorage.clear()
            //navigate('/');
        }
    })})();
      

    (async () => {
      const result = await api.post('getUsersDealerInfoNow', {
      })
      .then((result) => {
        setLoading7(true);
        setUsersDealerInfo(result.data)

        //setVendorName2(result.data.response.map( i => i.Vendor));
        //setPackagesUser(result.data.response);
        //setLoading(true);

  })
      .catch((error) => {
        if(error) {
          console.log("o erro", error)
          //setError("Token Expirado, faça login novamente!")
          //window.localStorage.clear()
          //navigate('/');
      }
  })})();



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


            <Grid item xs={12} sm={12} md={12} elevation={4} square="true">

                {/* 
                const dataProv = item.info.filter(item => item.year === '2022').map((item, index) => ({
                  "month": item.month,
                  "quantidadeAtivos": item.data.map(item => item.data.filter(item => detailProvedor !== "" ? item.dealerName === detailProvedor : "").slice().map(item => item.numberOfSubscribers)).reduce(
                    ( acumulador, valorAtual ) => acumulador.concat(valorAtual),
                    []
                  )
                }))*/}
                <Container  style={{width: '100%',  height: 'auto', margin: 'auto', borderRadius: 10,}}>
                  <div style={{margin: 'auto', width: '90%',  display: 'flex', justifyContent: 'space-between', height: 70, alignItems: 'center', paddingTop: 30}}>
                    <div style={{width: '20%',  height: 'auto',}}>
                      <h2 className='gridH2'>Report Simba </h2>
                    </div>
                    {/*inserir o button aqui */}
                    <div style={{ height: 45,  display: 'flex', justifyContent: 'flex-end', width: '70%'}}>
                      <div style={{width: '100%'}}>
                        <div style={{display: 'flex', position: 'relative', zIndex: 0,}}>
                        <Box sx={{ minWidth: 220, marginBottom: 5 }}>

                          {/*parte do input do provedor */}
                        </Box>
                        {provedorName !== null && provedorName !== "" ?
                          <Tooltips title="Remover Provedor" placement="right">
                            <button className='btnS' onClick={(e => {
                              setDetailProvedor("");
                              setProvedorName("");
                              
                            })}><CancelIcon /></button>
                          </Tooltips>
                          :
                          ""
                          
                        }                
                        </div>
                      </div>
                        {/* 
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
                      </div>*/}

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
                          <th className='tbrc tbr4 fontTH'>Ações</th>
                        </tr>
                      </AlternativeTheadStyle>
                              {dealerInfo.filter(dados => usersDealerInfo.map(e => e.dealer).includes(dados.name) ).map((item, index) => {
                                const detailEvolution = usersDealerInfo.filter(dados => item.name.includes(dados.dealer)).map((item, index) => {
                                    let teste = {
                                      dealer: item.dealer,
                                      customer: item.customers.map((customers) => {
                                        let teste2 = {
                                          login: customers.login,
                                          havePctStart: customers.packages.filter(item => item.havePacoteStart === 1).map(item => item.havePacoteStart),
                                          haveNewPctPremium: customers.packages.filter(item => item.havePacotePremium === 1).map(item => item.havePacotePremium),
                                          haveCanaisLocais: customers.packages.filter(item => item.haveCanaisLocais === 1).map(item => item.haveCanaisLocais),
                                          haveSvodKids: customers.packages.filter(item => item.haveSvodKids === 1).map(item => item.haveSvodKids),
                                          haveSvodNacional: customers.packages.filter(item => item.haveSvodNacional === 1).map(item => item.haveSvodNacional),
                                          haveSvodStudio: customers.packages.filter(item => item.haveSvodStudio === 1).map(item => item.haveSvodStudio),
                                          haveYplayCompleto: customers.packages.filter(item => item.haveYplayCompleto === 1).map(item => item.haveYplayCompleto)
                                          
                                        }
                                        return teste2
                                      })

                                    }

                                    return teste;
                                })

                                const finalEvolution = detailEvolution.map((item, index) => {
                                  //console.log("o que tem no detail", item)

                                  let firstValidation = {
                                    dealer: item.dealer,
                                    customer: item.customer.map((item) => {
                                      //console.log("o que tem no customer", item)

                                      let secondValidation = {
                                        login: item.login,
                                        sucessCountPremium: item.haveNewPctPremium.length > 0 && item.haveCanaisLocais.length > 0 && item.havePctStart.length < 1 ? 1 : 0,
                                        sucessCountStart: item.havePctStart.length > 0 && item.haveCanaisLocais.length > 0 && item.haveNewPctPremium.length < 1 ? 1 : 0,
                                        sucessCountStartPremium: item.haveNewPctPremium.length > 0 && item.haveCanaisLocais.length > 0 && item.havePctStart.length > 0 ? 1 : 0,
                                        sucessCountOldPremium: item.haveYplayCompleto.length > 0 && item.haveSvodKids.length > 0 && item.haveSvodNacional.length > 0 && item.haveSvodStudio.length < 1 ? 1 : 0,
                                        sucessCountOldFull: item.haveYplayCompleto.length > 0 && item.haveSvodKids.length > 0 && item.haveSvodNacional.length > 0 && item.haveSvodStudio.length > 0 ? 1 : 0
                                      }
                                      return secondValidation
                                    })
                                  }
                                  return firstValidation
                                })

                                const totalInfoUsers = finalEvolution.map((item, index) => {
                                  let totalDealerUsers = {
                                    dealer: item.dealer,
                                    validatedCustomers: item.customer.filter(item => item.sucessCountPremium > 0 || item.sucessCountStart > 0 || item.sucessCountStartPremium || item.sucessCountOldPremium || item.sucessCountOldFull).map(item => {
                                        let data = {
                                          login: item.login,
                                          pacote: item.sucessCountPremium > 0 ? "Pacote Premium" : 
                                                  item.sucessCountStart > 0 ? "Pacote Start" :
                                                  item.sucessCountStartPremium > 0 ? "Pacote Premium":
                                                  item.sucessCountOldPremium > 0 ? "Pacote Premium":
                                                  item.sucessCountOldFull > 0 ? "Pacote Full" : ''
                                        }
                                        return data
                                      
                                      }),
                                    totalCustomersPremium: item.customer.map(item => item.sucessCountPremium).reduce((accumulator,value) => accumulator + value,0),
                                    totalCustomersStart: item.customer.map(item => item.sucessCountStart).reduce((accumulator,value) => accumulator + value,0),
                                    totalCustomersHavingPremiumAndStart: item.customer.map(item => item.sucessCountStartPremium).reduce((accumulator,value) => accumulator + value,0),
                                    totalCustomersOldPremium: item.customer.map(item => item.sucessCountOldPremium).reduce((accumulator,value) => accumulator + value,0),
                                    totalCustomersOldFull: item.customer.map(item => item.sucessCountOldFull).reduce((accumulator,value) => accumulator + value,0),
                                  }
                                  return totalDealerUsers
                                })

                                return(
                                  <tbody key={index} style={{ width: '100%', height: 'auto', marginTop: 20,}}>
                                    <tr style={{width: '100%'}}>
                                      <td className='tbrc tbr4 fontS'>{item.nomefantasia}</td>
                                      <td className='tbrc tbr1 fontS'>{item.razaosocial}</td>
                                      <td className='tbrc tbr4 fontS'>{item.cnpj}</td>
                                      <td className='tbrc tbr4 fontS'>{item.cidade + "/" + item.uf}</td>
                                      {totalInfoUsers.filter(provedor => provedor.dealer === item.name).map((item, index) => {
                                        return( 
                                          <td key={index}  className='tbrc tbr4 fontS'>{item.totalCustomersHavingPremiumAndStart + item.totalCustomersOldFull + item.totalCustomersOldPremium + item.totalCustomersPremium + item.totalCustomersStart}</td>                                          
                                        )
                                      })}
                                      <td className='tbrc tbr4 fontS'>
                                        <Tooltips title="Detalhes - Provedor" placement="right">
                                          <IconButton
                                            aria-label="expand row"
                                            size="small"
                                            onClick={() => {
                                              //toggleShown('itens.dealerName, itens.numberOfSubscribers');
                                              setDetailProvedor(totalInfoUsers.filter(provedor => provedor.dealer === item.name))
                                              setTotalProvedor(totalInfoUsers.filter(provedor => provedor.dealer === item.name))
                                              setProvedorName(item.nomefantasia)
                                              setOpenDetails(true)
                                            }}
                                          >
                                            <Insights style={{color: '#0088FE'}} />
                                            </IconButton>
                                        </Tooltips>
                                      </td>

                                    </tr>  


                                    
                                {/* incluir aqui a parte dos detalhes de usuarios*/}
                                    {openDetails === true
                                     ?
                                     <div className='containerDetails'>
                                        <Container className='contentDetails'>
                                          <div className='contentDetailsHeader'>
                                            <div className='contentDetailsHeaderTitle'>
                                              <h6>{provedorName}</h6>
                                              <h6>Total Previsto: {totalProvedor.map(item => {return item.totalCustomersHavingPremiumAndStart + item.totalCustomersOldFull + item.totalCustomersOldPremium + item.totalCustomersPremium + item.totalCustomersStart})}</h6>

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

                                            {detailProvedor.map(item => item.validatedCustomers.sort(item => item.login).map((item, index) => {
                                              return(
                                              <tbody key={index} style={{ width: '100%', marginTop: 20,}}>
                                                <tr style={{width: '100%', }}>
                                                  <td className='tbrc tbr1 fontS'>{item.login}</td>
                                                  <td className='tbrc tbr4 fontS'>{item.pacote}</td>
                                                </tr>
                                              </tbody>

                                              )
                                            }))}
                                            </div>
                                            


                                            </table>
                                          </div>
                                        </Container>
                                     </div>
                                     :
                                     ''
                                    
                                  }
                                {/* */}
                                  </tbody>
                                )
                              })}
                    </table>
                  </div>
                
                </Container>


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

export default Now;