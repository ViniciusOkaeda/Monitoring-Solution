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
  //console.log("meu users", packagesUser)

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
    //console.log("no provedor tem", provedor)
    //console.log("na quantidade tem", quantidade)
    const shownState = detailsShown.slice();
    //console.log("olha o shownState", shownState)
    const index = shownState.indexOf(provedor);
    //console.log("olha o index", index)

    if(index >= 0) {
      shownState.splice(index, 1);
      //console.log("aqui é o shownState.splice", shownState.splice(index, 1))
      setDetailsShown(shownState);
      //console.log("aqui é o splice do shownState", shownState)
    } else {
      shownState.push(provedor);
      //console.log("aqui seria o shownState.push", shownState.push(provedor))
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
    //console.log("ca esta", dealerReports)

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

    (async () => {
      const result = await api.get('auth/verify', {
        headers: {
          token: localStorage.getItem("token")
        }
      })      
      .then((result) => {
        setAuthVerify(result.data.response.user)
        if(result.data.status == 1){
          if(result.data.response.user === "1") {
            (async () => {
              const result = await api.get('monitoring/mw/customers/watching/qtd/channels', {
                headers: {
                  token: localStorage.getItem("token")
                }
              })
              .then((result) => {
                setWatchingNumber(result.data.response.map((e) => e.data.map((i) => i.QTD).reduce((total, numero) => total + numero, 0)).reduce((total, numero) => total + numero, 0) )
                setLoading(true);
        
          })
              .catch((error) => {
                if(error) {
                  setError("Token Expirado, faça login novamente!");
                  window.localStorage.clear()
                  navigate('/');
              }
          })
        
            })();
        
            (async () => {
              const result = await api.get('monitoring/mw/customers/packages', {
                headers: {
                  token: localStorage.getItem("token")
                }
              })
              .then((result) => {
                setQtdVendor(result.data.response.length)
                setLoading2(true);
        
          })
              .catch((error) => {
                if(error) {
                  setError("Token Expirado, faça login novamente!");
                  window.localStorage.clear()
                  navigate('/');
              }
          })
        
            })();
        
            (async () => {
              const result = await api.get('monitoring/mw/customers/packages/qtd', {
                headers: {
                  token: localStorage.getItem("token")
                }
              })
              .then((result) => {
                setPackagesUser(result.data.response.map((e) => e.data.map((u) => u) ))
                setLoading3(true);
          })
              .catch((error) => {
                if(error) {
                  setError("Token Expirado, faça login novamente!");
                  window.localStorage.clear()
                  navigate('/');
              }
          })
        
            })();
        
            (async () => {
              const result = await api.get('monitoring/sms/customers/packages/dealers', {
                headers: {
                  token: localStorage.getItem("token")
                }
              })
              .then((result) => {
                setPackagesUserBrand(result.data.response);
                setQtdDealer(result.data.response.length)
                setDealerReports(result.data.response.map((e) => e))
                setExpectedUsersBrand(result.data.response                        
                  .filter((item) =>
                  item.dealer !== 'JACON dealer' && 
                  item.dealer !== 'ADMIN-YOUCAST' && 
                  item.dealer !== 'ADYLNET' && 
                  item.dealer !== 'AMERICANET' && 
                  item.dealer !== 'DNET' && 
                  item.dealer !== 'HSL' && 
                  item.dealer !== 'NOVANET' && 
                  item.dealer !== 'TCM' &&
                  item.dealer !== 'TCM Telecom' && 
                  item.dealer !== 'WSP' && 
                  item.dealer !== 'Youcast CSMS' && 
                  item.dealer !== 'YPLAY' && 
                  item.dealer !== 'Z-Não-usar' &&
                  item.dealer !== 'Z-Não-usar-'
                  ).map((e) => e.data.length).reduce((total, numero) => total + numero, 0));
                setNeedAjustUsersBrand(result.data.response.filter((item) =>
                  item.dealer !== 'JACON dealer' && 
                  item.dealer !== 'ADMIN-YOUCAST' && 
                  item.dealer !== 'ADYLNET' && 
                  item.dealer !== 'AMERICANET' && 
                  item.dealer !== 'DNET' && 
                  item.dealer !== 'HSL' && 
                  item.dealer !== 'NOVANET' && 
                  item.dealer !== 'TCM' &&
                  item.dealer !== 'TCM Telecom' && 
                  item.dealer !== 'WSP' && 
                  item.dealer !== 'Youcast CSMS' && 
                  item.dealer !== 'YPLAY' && 
                  item.dealer !== 'Z-Não-usar' &&
                  item.dealer !== 'Z-Não-usar-'
                  ).map((e) => e.data.filter((i) => i.pacoteYplayStatus !== 'OK' ).length).reduce((total, numero) => total + numero, 0));
                  setActiveUsersBrand(result.data.response                        
                    .filter((item) =>
                    item.dealer !== 'JACON dealer' && 
                    item.dealer !== 'ADMIN-YOUCAST' && 
                    item.dealer !== 'ADYLNET' && 
                    item.dealer !== 'AMERICANET' && 
                    item.dealer !== 'DNET' && 
                    item.dealer !== 'HSL' && 
                    item.dealer !== 'NOVANET' && 
                    item.dealer !== 'TCM' &&
                    item.dealer !== 'TCM Telecom' && 
                    item.dealer !== 'WSP' && 
                    item.dealer !== 'Youcast CSMS' && 
                    item.dealer !== 'YPLAY' && 
                    item.dealer !== 'Z-Não-usar' &&
                    item.dealer !== 'Z-Não-usar-'
                    ).map((e) => e.data.filter((i) => i.pacoteYplayStatus === 'OK').length).reduce((total, numero) => total + numero, 0))
                  setLoading4(true);
        
          })
              .catch((error) => {
                if(error) {
                  setError("Token Expirado, faça login novamente!")
                  window.localStorage.clear()
                  navigate('/');
              } 
          })
        
            })();
        
            (async () => {
              const result = await api.get('monitoring/mw/customers/watching', {
                headers: {
                  token: localStorage.getItem("token")
                }
              })
              .then((result) => {
                setPackagesUser(result.data.response.map((e) => e.data.map((u) => u) ))
                setWatchingATV(result.data.response.map((e) => e.data.filter(a => a.watching_now_devices_type === 'android tv').map(v => v.watching_now_devices_type).length).reduce((total, numero) => total + numero, 0));
                setWatchingAndroid(result.data.response.map((e) => e.data.filter(a => a.watching_now_devices_type === 'android').map(v => v.watching_now_devices_type).length).reduce((total, numero) => total + numero, 0));
                setWatchingIos(result.data.response.map((e) => e.data.filter(a => a.watching_now_devices_type === 'ios').map(v => v.watching_now_devices_type).length).reduce((total, numero) => total + numero, 0));
                setWatchingWeb(result.data.response.map((e) => e.data.filter(a => a.watching_now_devices_type === 'web player').map(v => v.watching_now_devices_type).length).reduce((total, numero) => total + numero, 0));
                setLoading5(true);
          })
              .catch((error) => {
                if(error) {
                  setError("Token Expirado, faça login novamente!");
                  window.localStorage.clear()
                  navigate('/');
              }
          })
        
            })();
          } else {
            fetch('./packageContentInfo.json', {
              headers: {
                Accept: "application/json"
              }
            }).then(res => 
              res.json()
            ).then(resp => {
              setCtInfo(resp);
              //console.log("o resp", resp.analytics.map((item, i) => item))
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
  
          }
        } else{
          if(result.data.status == 6){
            setError("Token Expirado, faça login novamente!");
            window.localStorage.clear()
            navigate('/');
          }
        }
  })
      .catch((error) => {
        if(error) {
          setError("Token Expirado, faça login novamente!");
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
        <div style={{ width: '100%', height: 'auto'}}>
          <Header />

          {authVerify === "1"
          ?
          <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>
          {loading === true && loading2 === true && loading3 === true && loading4 === true
          ?
          <Grid className='animationPg2' container component="main" sx={{  display: 'flex', }} spacing={2}>
            <Grid item xs={12} sm={12} md={4} elevation={4} square="true">
              <Container  style={{
                height: 250, 
                borderRadius: 10, 
                boxShadow: 'none'}}>
                  <div className='defConfigCard'>

                    <div className='gridDefCardC1'>
                      <div className='gridCardC1C1'>
                        <div className='gridCardC1C1D1 gridColor1'>
                          <MonitorHeartIcon className='gridCardIcon'/>
                        </div>
                        <div className='gridCardC1C1D2'>

                        </div>
                      </div> 

                      <div className='gridCardC1C2'>
                        <h2 className='gridH2'>{watchingNumber}</h2>
                        <p className='gridSub'>Users watching now! - Vendor</p>
                      </div>  
                    </div>


                    <div className='gridDefCardC2'>
                      <ClipForm2/>
                      <ClipForm1/>

                    </div>

                  </div>
              </Container>

            </Grid>

            <Grid item xs={12} sm={12} md={8} elevation={4} square="true">
              <Container  style={{
                  height: 250, 
                  borderRadius: 10, 
                  boxShadow: 'none'}}>
                    <div className='defConfigCard'>
                      <div className='gridDefCardC1'>
                        <div className='gridCardC1C1'>
                          <div className='gridCardC1C1D1 gridColor2'>
                            <SummarizeIcon className='gridCardIcon'/>
                          </div>
                          <div className='gridCardC1C1D2'>
                            <h2 className='gridH2 gridMargin'>Watching by Devices - Vendor</h2>
                          </div>
                        </div>

                        <div className='gridCardC1C2 gridMarginTop' style={{display: 'flex'}}>
                          <div className='gridCardC1C2D1 '>
                            <h2 className='gridH2'>{watchingATV}</h2>
                            <p className='gridSub'>Android TV</p>
                          </div>
                          <div className='gridCardC1C2D1'>
                            <h2 className='gridH2'>{watchingAndroid}</h2>
                            <p className='gridSub'>Android</p>
                          </div>
                          <div className='gridCardC1C2D1'>
                            <h2 className='gridH2'>{watchingIos}</h2>
                            <p className='gridSub'>IOS</p>
                          </div>
                          <div className='gridCardC1C2D1'>
                            <h2 className='gridH2'>{watchingWeb}</h2>
                            <p className='gridSub'>Web</p>
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
                            <h2 className='gridH2 gridMargin'>Monitoring</h2>
                          </div>
                        </div>


                        <div className='gridCardC1C2 gridMarginTop' style={{display: 'flex'}}>
                          <div className='gridCardC1C2D1'>
                            <h2 className='gridH2'>{qtdVendor}</h2>
                            <p className='gridSub'>Vendors</p>
                          </div>
                          <div className='gridCardC1C2D1'>
                            <h2 className='gridH2'>{qtdDealer}</h2>
                            <p className='gridSub'>Dealers</p>
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

            <Grid item xs={12} sm={12} md={7} elevation={4} square="true">
              <Container  style={{
                height: 250, 
                borderRadius: 10, 
                boxShadow: 'none'}}>
                  <div className='defConfigCard'>
                    <div className='gridDefCardC1'>
                      <div className='gridCardC1C1'>
                        <div className='gridCardC1C1D1 gridColor4'>
                          <MonitorHeartIcon className='gridCardIcon'/>
                        </div>
                        <div className='gridCardC1C1D2'>
                          <h2 className='gridH2 gridMargin'>Active Users - Brand</h2>
                        </div>
                      </div>
                      <div className='gridCardC1C2 gridMarginTop' style={{display: 'flex'}}>
                          <div className='gridCardC1C2D1 '>
                            <h2 className='gridH2'>{expectedUsersBrand}</h2>
                            <p className='gridSub'>Expected</p>
                          </div>
                          <div className='gridCardC1C2D1'>
                            <h2 className='gridH2'>{activeUsersBrand}</h2>
                            <p className='gridSub'>Active</p>
                          </div>
                          <div className='gridCardC1C2D1'>
                            <h2 className='gridH2'>{needAjustUsersBrand}</h2>
                            <p className='gridSub'>Need to Adjust</p>
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
                    <h2 className='gridH2'>Overview - Brands </h2>
                  </div>
                  <div style={{width: '10%', height: 45,  display: 'flex', justifyContent: 'flex-end'}}>
                    <div ref={domNode} className='dropDownHeaderStyle'>
                      <DropDownHeader className={isOpen === true ? 'openDropDown' : '' } onClick={toggling}>
                        <MoreVertIcon></MoreVertIcon>
                      </DropDownHeader>
                      {isOpen && (
                        <DropDownListContainer className='dropDownList'>
                          <DropDownList>
                            <ListItem >
                              <div style={{fontSize: 14}}>
                              <ExcelExport className='menuAction' data={dealerReports}/>

                                <Pdf targetRef={ref} filename="code-example.pdf" >
                                  {({ toPdf }) => <p className='menuAction' onClick={toPdf} style={{cursor: 'pointer'}}>Export to PDF</p>}
                                </Pdf>

                                <CSVLink className='csvStyleP' filename={"dealer-report.csv"} data={dealerReports} headers={headers} separator={","}>
                                  <p className='menuAction'>Export to CSV</p>
                                </CSVLink>

                              </div>
                            </ListItem>
                          </DropDownList>
                        </DropDownListContainer>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ width: '95%', height: 'auto', margin: 'auto', marginBottom: 30}}>
                  <table  id="table-to-xls" style={{ width: '100%', height: '100%', paddingTop: 30, paddingBottom: 30, }}>
                    <AlternativeTheadStyle style={{width: '100%', height: 60, }}>
                      <tr >
                        <th className='tbrc tbr1 fontTH'>Brand</th>
                        <th className='tbrc tbr4 fontTH'>Basic</th>
                        <th className='tbrc tbr4 fontTH'>Compact</th>
                        <th className='tbrc tbr4 fontTH'>Full</th>
                        <th className='tbrc tbr4 fontTH'>Premium</th>
                        <th className='tbrc tbr4 fontTH'>Urban</th>
                        <th className='tbrc tbr4 fontTH'>Total</th>
                        <th className='tbrc tbr1 fontTH'>Users with incorrect packages</th>
                      </tr>
                    </AlternativeTheadStyle>

                    <tbody  style={{ width: '100%', height: 'auto', marginTop: 20,}}>
                      {packagesUserBrand
                        .filter((item) =>
                        item.dealer !== 'JACON dealer' && 
                        item.dealer !== 'ADMIN-YOUCAST' && 
                        item.dealer !== 'ADYLNET' && 
                        item.dealer !== 'AMERICANET' && 
                        item.dealer !== 'DNET' && 
                        item.dealer !== 'HSL' && 
                        item.dealer !== 'NOVANET' && 
                        item.dealer !== 'TCM' &&
                        item.dealer !== 'TCM Telecom' && 
                        item.dealer !== 'WSP' && 
                        item.dealer !== 'Youcast CSMS' && 
                        item.dealer !== 'YPLAY' && 
                        item.dealer !== 'Z-Não-usar' &&
                        item.dealer !== 'Z-Não-usar-'
                      ) .sort(function (a, b) {
                        let x = a.dealer.toUpperCase(), y = b.dealer.toUpperCase();
                        return x == y ? 0 : x > y ? 1 : -1;
                      }).map((items, i) => {
                          return(
                          <tr ref={ref} key={i}>
                            <td className='tbrc tbr1 fontS'>{items.dealer}</td>
                            <td className='tbrc tbr4 fontS'>{items.basicCount}</td>
                            <td className='tbrc tbr4 fontS'>{items.compactCount}</td>
                            <td className='tbrc tbr4 fontS'>{items.fullCount}</td>
                            <td className='tbrc tbr4 fontS'>{items.premiumCount}</td>
                            <td className='tbrc tbr4 fontS'>{items.urbanTv}</td>
                            <td className='tbrc tbr4 fontS'>{items.basicCount + items.compactCount + items.fullCount + items.premiumCount}</td>
                            <td className='tbrc tbr4 fontS'>{items.data
                            .filter(item => item.pacoteYplayStatus === 'ERRO')
                            .map(e => e.pacoteYplayStatus).length }</td>
                          </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              
              </Container>

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
          :
          ""
          }

          {authVerify === "2"
          ?
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
                                  console.log("o data dos ativos", data)

                                  return(
                                    <ExcelExportAtivos key={index} className='menuAction' data={data}/>
                                  )
                                })}
                                

                                <Pdf targetRef={ref} filename="code-example.pdf" >
                                  {({ toPdf }) => <p className='menuAction' onClick={toPdf} style={{cursor: 'pointer'}}>Export to PDF</p>}
                                </Pdf>

                                <CSVLink className='csvStyleP' filename={"dealer-report.csv"} data={dealerReports} headers={headers} separator={","}>
                                  <p className='menuAction'>Export to CSV</p>
                                </CSVLink>

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
                        <AreaChart width={1100} height={350} data={data}
                          margin={{ top: 10, right: 50, left: 30, bottom: 10 }}>
                          <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
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
                        </AreaChart>
                      </div>
                    )
                  })}

                </div>
              
              </Container>

            </Grid>

            <Grid item xs={12} sm={12} md={12} elevation={4} square="true">
              {ctInfo.analytics.map((item, index) => {
                //console.log("o filtrado", item.info.filter((item) => item.month === monthName).map(item => item.data.map(item => item.provedor)))

                const dataProv = item.info.map((item, index) => ({
                  "month": item.month,
                  "quantidadeAtivos": item.data.map(item => item.data.filter(item => detailProvedor !== '' ? item.provedor === detailProvedor : '').slice().map(item => item.numeroAssinantes)).reduce(
                    ( acumulador, valorAtual ) => acumulador.concat(valorAtual),
                    []
                  )
                }))

                console.log("o meu dataProv", dataProv)

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

                        { monthName !== '' ?

                        <FormControl sx={{ width: 180 }}>
                            <InputLabel id="outlined-select-label">Provedor</InputLabel>
                            <Select
                            labelId="outlined-select-label"
                            id="outlined-select-currency"
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
                              setProvedorName('');
                              toggleShown('');
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

                                    console.log("o nome do periodo", periodName)

                                  const assinant = item.info
                                  .filter(item => monthName !== '' ? item.month === monthName : item)
                                  .map(item => item)

                                  const fatured = item.info
                                  .filter(item => monthName !== '' ? item.month === monthName : item)
                                  .map((item, index) => ({
                                    "fatured": totalEarned(item.totalAssinantes, 1.60), 
                                  }))
                                  console.log("o periodo é", fatured)

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
                                

                                <Pdf targetRef={ref} filename="code-example.pdf" >
                                  {({ toPdf }) => <p className='menuAction' onClick={toPdf} style={{cursor: 'pointer'}}>Export to PDF</p>}
                                </Pdf>

                                <CSVLink className='csvStyleP' filename={"dealer-report.csv"} data={dealerReports} headers={headers} separator={","}>
                                  <p className='menuAction'>Export to CSV</p>
                                </CSVLink>

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
                                    {console.log("aqui seria o detailsShown", detailsShown)}
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
                                            <tr key={index} style={{maxHeight: 300, minHeight: 200 }}>
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
                                    {console.log("estruturando", ctInfo.analytics.map(item => item))}
                                    <tr>                {console.log("o meu dataProv no graf", dataProv)}

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
          :
          ""
          }



          <ThemeMenu/> 
        </div>

    </div>
  );
}

export default Home;