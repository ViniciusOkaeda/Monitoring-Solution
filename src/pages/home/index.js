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

import {ExcelExport} from '../../components/excel/ExcelExport';
import ThemeMenu from '../../components/themeMenu';
import Header from '../../components/header';
import PermanentDrawerLeft from '../../components/drawer';

import Grid from '@material-ui/core/Grid';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


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

const ref = React.createRef();


function Home() {

  const navigate  = useNavigate();

  const [watchingNumber, setWatchingNumber] = React.useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [loading4, setLoading4] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [qtdDealer, setQtdDealer] = React.useState(null);
  const [qtdVendor, setQtdVendor] = React.useState(null);


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
  
  const toggling = () => setIsOpen(!isOpen);
  let domNode = useClickOutside(() => {
      setIsOpen(false);
    });

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
    console.log("ca esta", dealerReports)

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
      const result = await api.get('monitoring/mw/customers/watching/qtd/channels', {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((result) => {
        //console.log("o valor", result)
        setWatchingNumber(result.data.response.map((e) => e.data.map((i) => i.QTD).reduce((total, numero) => total + numero, 0)).reduce((total, numero) => total + numero, 0) )
        setLoading(true);
        console.log("o map aqui", result.data.response.map((e) => 
        e.data.map((i) => i.QTD).reduce((total, numero) => total + numero, 0)) );
        //console.log("o map aqui2", result.data.response.map((e) => 
        //e.data.map((i) => i.QTD)) );
        //console.log("o watching aq", watchingNumber)

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
        //console.log("device oe", result.data.response.map((e) => e.data.map((i) => i) ));
        //console.log("device oe2", result.data.response.map((e) => e.data.map((i) => i.customers) ));
        //console.log("device oe3", result.data.response);
        //setWatchingQtdChannels(result.data.response);

  })
      .catch((error) => {
        if(error) {
          setError("Token Expirado, faça login novamente!");
         // window.localStorage.clear()
         // navigate('/');
      }
          //console.log(error);
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
        //console.log("aq oe", result.data.response.map((e) => e.data.map((i) => i).sort(function(a,b) {return b- a;})[0]) );
        //console.log("aq oe2", result.data.response.map((e) => e.data.map((u) => u.QTD_Clientes) ));
        //setWatchingQtdChannels(result.data.response);
  })
      .catch((error) => {
        if(error) {
          setError("Token Expirado, faça login novamente!");
          //window.localStorage.clear()
          //navigate('/');
      }
          //console.log(error);
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
        setLoading4(true);
        console.log("o meu teste", result.data.response.map((e) => e))

  })
      .catch((error) => {
        if(error) {
          console.log("expirado")
          setError("Token Expirado, faça login novamente!")
          //window.localStorage.clear()
          //navigate('/');
      } 
        //console.log("errado");
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

          <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>
          {loading === true && loading2 === true && loading3 === true && loading4 === true
          ?
          <Grid className='animationPg2' container component="main" sx={{  display: 'flex', }} spacing={2}>
            <Grid item xs={12} sm={12} md={4} elevation={4} square>
              <Container  style={{
                height: 250, 
                marginTop: 40, 
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
                        <p className='gridSub'>Users watching now!</p>
                      </div>  
                    </div>


                    <div className='gridDefCardC2'>
                      <ClipForm2/>
                      <ClipForm1/>

                    </div>

                  </div>
              </Container>

            </Grid>

            <Grid item xs={12} sm={12} md={8} elevation={4} square>
              <Container  style={{
                  height: 250, 
                  marginTop: 40, 
                  borderRadius: 10, 
                  boxShadow: 'none'}}>
                    <div className='defConfigCard'>
                      <div className='gridDefCardC1'>
                        <div className='gridCardC1C1'>
                          <div className='gridCardC1C1D1 gridColor2'>
                            <SummarizeIcon className='gridCardIcon'/>
                          </div>
                          <div className='gridCardC1C1D2'>
                            <h2 className='gridH2 gridMargin'>Active Users - Brands</h2>
                          </div>
                        </div>

                        <div className='gridCardC1C2'>
                        {dealerReports
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
                            ).map(e => e.data.map(i => {
                              const activeUsers = [{
                                expected: i.pacoteYplayStatus ,
                              }]
                              console.log("ativos", activeUsers.map(i => i.expected))


                            }))}
                        <h2 className='gridH2'>9999</h2>
                        <p className='gridSub'>Expected</p>

                        </div>
                      </div>

                      <div className='gridDefCardC2'>
                        <ClipForm2/>
                        <ClipForm1/>
                      </div>

                    </div>
                </Container>

            </Grid>

            <Grid item xs={12} sm={12} md={8} elevation={4} square>
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


                        <div className='gridCardC1C2' style={{display: 'flex'}}>
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

            <Grid item xs={12} sm={12} md={4} elevation={4} square>
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
                          <h2 className='gridH2 gridMargin'>------</h2>
                        </div>
                      </div>
                      <div className='gridCardC1C2'>
                        {packagesUser.map((e, index) => {
                          const packTotal = [{
                            numero: e.length,
                          }]
                          var soma = packTotal.map(i => i.numero).reduce(function(soma, i) {
                            return soma + i
                          }) 
                            //console.log("aqui m", soma)
                        })}
                        <h2 className='gridH2'>----</h2>
                        <p className='gridSub'>--------</p>
                      </div>
                    </div>

                    <div className='gridDefCardC2'>
                      <ClipForm2/>
                      <ClipForm1/>
                    </div>
                  </div>
              </Container>

            </Grid>

            <Grid item xs={12} sm={12} md={12} elevation={4} square>
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
                        <DropDownListContainer>
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
                          //console.log("aqui o resultado mna", items)
                          const initialValue = 0;
                          const brandReport = [{
                            brandName: '',
                          }]
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


          <ThemeMenu/> 
        </div>

    </div>
  );
}

export default Home;