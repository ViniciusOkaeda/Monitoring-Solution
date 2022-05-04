import React, {useEffect, useState, useRef} from 'react';

import './index.css'

import styled from "styled-components";

import api from '../../services/api';

import Container from '../../styles/theme/components/Container';
import ClipForm1 from '../../styles/theme/components/ClipForm1';
import ClipForm2 from '../../styles/theme/components/ClipForm2';
import DropDownHeader from '../../styles/theme/components/DropDownHeader';
import DropDownList from '../../styles/theme/components/DropDownList';

import ThemeMenu from '../../components/themeMenu';
import Header from '../../components/header';
import PermanentDrawerLeft from '../../components/drawer';

import Grid from '@material-ui/core/Grid';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AlternativeTheadStyle from '../../styles/theme/components/AlternativeTheadStyle';

const DropDownListContainer = styled("div")``;

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


function Home() {

  const [codigo, setCodigo] = useState('');
  const [ filterId, setFilterId] = useState('');
  const [vendorNumber, setVendorNumber] = React.useState(null);
  const [watchingNumber, setWatchingNumber] = React.useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const [ packagesUser, setPackagesUser] = useState([ {
    IDVendor: '',
    Vendor: '',
    Pacote: '',
    QTD_Clientes: '',
  } ]);
  console.log("meu users", packagesUser)

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
        //console.log("o map aqui", result.data.response.map((e) => 
        //e.data.map((i) => i.QTD).reduce((total, numero) => total + numero, 0)) );
        //console.log("o map aqui2", result.data.response.map((e) => 
        //e.data.map((i) => i.QTD)) );
        //console.log("o watching aq", watchingNumber)

  })
      .catch((error) => {
        // handle error
          console.log(error);
  })

    })();

    (async () => {
      const result = await api.get('monitoring/mw/customers/watching/qtd/devices', {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((result) => {

        console.log("device oe", result.data.response.map((e) => e.data.map((i) => i.Tipo) ));
        console.log("device oe2", result.data.response.map((e) => e.data.map((i) => i.customers) ));
        //setWatchingQtdChannels(result.data.response);

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
        setPackagesUser(result.data.response.map((e) => e.data.map((u) => u) ))
        console.log("aq oe", result.data.response.map((e) => e.data.map((i) => i.QTD_Clientes).sort(function(a,b) {return b- a;})[0]) );
        console.log("aq oe2", result.data.response.map((e) => e.data.map((u) => u.QTD_Clientes) ));
        //setWatchingQtdChannels(result.data.response);

  })
      .catch((error) => {
        // handle error
          console.log(error);
  })

    })();

    (async () => {
      const result = await api.get('monitoring/sms/customers/packages/dealers', {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((result) => {
        //console.log("aq oe", result.data.response);
        setPackagesUserBrand(result.data.response);

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
        <div style={{ width: '100%', height: 'auto'}}>
          <Header />


          <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>

          <Grid container component="main" sx={{  display: 'flex', }} spacing={2}>
            <Grid item xs={12} sm={12} md={4} elevation={4} square>
              <Container  style={{
                height: 250, 
                marginTop: 40, 
                borderRadius: 10, 
                boxShadow: 'none'}}>
                  <div className='gridDefCard gridCard'>
                    <MonitorHeartIcon className='gridCardIcon'/>
                  </div>
                  <div className='gridCardClip'>
                  <ClipForm2/>
                  <ClipForm1/>
                  </div>

                  <h2 className='defaultStyleCard gridCardH'>{watchingNumber}</h2>
                  <p className=' defaultStyleCard gridCardP' >Users watching now!</p>
              </Container>

            </Grid>

            <Grid item xs={12} sm={12} md={8} elevation={4} square>
              <Container  style={{
                  height: 250, 
                  marginTop: 40, 
                  borderRadius: 10, 
                  boxShadow: 'none'}}>
                    <div className='gridDefCard gridCard2'>
                      <SummarizeIcon className='gridCardIcon'/>
                    </div>
                    <div className='gridCardClip'>
                    <ClipForm2/>
                    <ClipForm1/>
                    </div>

                    <h2 className='defaultStyleCard gridCardH2'>Packages with active users</h2>
                    <h2 className='defaultStyleCard gridCardH2-2' >---</h2>
                    <p className='defaultStyleCard gridCardP2'>-------------------</p>
                </Container>

            </Grid>

            <Grid item xs={12} sm={12} md={8} elevation={4} square>
              <Container  style={{
                  height: 250, 
                  borderRadius: 10, 
                  boxShadow: 'none'}}>
                    <div className='gridDefCard gridCard3'>
                      <AnalyticsIcon className='gridCardIcon'/>
                    </div>
                    <div className='gridCardClip'>
                    <ClipForm2/>
                    <ClipForm1/>
                    </div>

                    <h2 className='defaultStyleCard gridCardH3'>Monitoring</h2>
                    <h2 className='defaultStyleCard gridCardH3-2'>10</h2>
                    <p className='defaultStyleCard gridCardP3'>Vendors</p>
                    <h2 className='defaultStyleCard gridCardH3-3'>94</h2>
                    <p className='defaultStyleCard gridCardP3-2'>Dealers</p>
                </Container>

            </Grid>

            <Grid item xs={12} sm={12} md={4} elevation={4} square>
              <Container  style={{
                height: 250, 
                borderRadius: 10, 
                boxShadow: 'none'}}>
                  <div className='gridDefCard gridCard4'>
                    <MonitorHeartIcon className='gridCardIcon'/>
                  </div>
                  <div className='gridCardClip'>
                  <ClipForm2/>
                  <ClipForm1/>
                  </div>
                  {packagesUser.map((e, index) => {
                   const packTotal = [{
                     numero: e.length,
                   }]
                   var soma = packTotal.map(i => i.numero).reduce(function(soma, i) {
                     return soma + i
                   }) 
                    console.log("aqui m", soma)

                  })}

                  <h2 className='defaultStyleCard gridCardH4'>------</h2>
                  <p className='defaultStyleCard gridCardP4'>--------</p>
              </Container>

            </Grid>

            <Grid item xs={12} sm={12} md={12} elevation={4} square>
              <Container style={{width: '100%', maxWidth: 1200, height: 'auto', margin: 'auto', borderRadius: 10,}}>
                <div style={{margin: 'auto', width: '90%',  display: 'flex', justifyContent: 'space-between', height: 70, alignItems: 'center', paddingTop: 30}}>
                  <div style={{width: '20%',  height: 'auto'}}>
                    <h3>Overview - Brands</h3>
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
                                <p>Export to XLS</p>
                                <p>Export to PDF</p>
                                <p>Export to CSV</p>
                              </div>
                            </ListItem>
                          </DropDownList>
                        </DropDownListContainer>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ width: '95%', height: 'auto', margin: 'auto', marginBottom: 30}}>
                  <table style={{ width: '100%', height: '100%', paddingTop: 30, paddingBottom: 30, }}>
                    <AlternativeTheadStyle style={{width: '100%', height: 60, }}>
                      <tr >
                        <th className='tbrc tbr1 fontTH'>Brand</th>
                        <th className='tbrc tbr4 fontTH'>Basic</th>
                        <th className='tbrc tbr4 fontTH'>Compact</th>
                        <th className='tbrc tbr4 fontTH'>Full</th>
                        <th className='tbrc tbr4 fontTH'>Premium</th>
                        <th className='tbrc tbr4 fontTH'>Urban</th>
                        <th className='tbrc tbr4 fontTH'>Total</th>
                        <th className='tbrc tbr4 fontTH'>Total + Urban</th>
                      </tr>
                    </AlternativeTheadStyle>

                    <tbody style={{ width: '100%', height: 'auto', marginTop: 20,}}>
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
                          console.log("aqui o resultado mna", items.dealer)
                          const brandReport = [{
                            brandName: '',
                          }]
                          return(
                          <tr key={i}>
                            <td className='tbrc tbr1 fontS'>{items.dealer}</td>
                            <td className='tbrc tbr4 fontS'>{items.basicCount}</td>
                            <td className='tbrc tbr4 fontS'>{items.compactCount}</td>
                            <td className='tbrc tbr4 fontS'>{items.fullCount}</td>
                            <td className='tbrc tbr4 fontS'>{items.premiumCount}</td>
                            <td className='tbrc tbr4 fontS'>{items.urbanTv}</td>
                            <td className='tbrc tbr4 fontS'>{items.basicCount + items.compactCount + items.fullCount + items.premiumCount}</td>
                            <td className='tbrc tbr4 fontS'>{items.basicCount + items.compactCount + items.fullCount + items.premiumCount + items.urbanTv}</td>
                          </tr>
                          )
                        })}
                    </tbody>
                  </table>
                </div>
              
              </Container>

            </Grid>

          </Grid>

          </div>


          <ThemeMenu/> 
        </div>
    </div>
  );
}

export default Home;