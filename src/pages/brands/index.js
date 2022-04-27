import React, {useState, useEffect, useRef} from 'react';

import './index.css';

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


import api from '../../services/api';

import { PieChart, Pie, Legend, Tooltip, Sector, Cell, BarChart, XAxis, YAxis, Bar, Brush, CartesianGrid, ComposedChart  } from "recharts";

const brandsYc = [
    { label: 'JACON dealer'},
    { label: 'a2-telecom'},
    { label: 'ADMIN-YOUCAST'},
    { label: 'ADYLNET'},
    { label: 'AMERICANET'},
    { label: 'apx-net'},
    { label: 'ativa'},
    { label: 'axion3'},
    { label: 'bigdot'},
    { label: 'brisnet'},
    { label: 'canejo-assessoria'},
    { label: 'CARIAP'},
    { label: 'cariap-superi'},
    { label: 'conect-ti'},
    { label: 'conecta-ab'},
    { label: 'conexao-ativa'},
    { label: 'cyber-net'},
    { label: 'dap'},
    { label: 'DNET'},
    { label: 'flash-meganet'},
    { label: 'fnovanet'},
    { label: 'g.henrique'},
    { label: 'g4-telecom'},
    { label: 'giganet'},
    { label: 'go-net'},
    { label: 'HSL'},
    { label: 'i9-conecta'},
    { label: 'IBW'},
    { label: 'id-corp'},
    { label: 'ifast'},
    { label: 'inforcenter'},
    { label: 'infotel-eng-telecom'},
    { label: 'inter-home'},
    { label: 'ip-telecom'},
    { label: 'itanet'},
    { label: 'jump'},
    { label: 'k9-telecom'},
    { label: 'kanet'},
    { label: 'keronet'},
    { label: 'LBR'},
    { label: 'ldt'},
    { label: 'lifetech'},
    { label: 'linknet'},
    { label: 'linkpro'},
    { label: 'linkse'},
    { label: 'live-connect'},
    { label: 'load-net'},
    { label: 'logiclink'},
    { label: 'mais-net'},
    { label: 'meganet'},
    { label: 'moriah.net'},
    { label: 'mrc'},
    { label: 'nbs'},
    { label: 'net-angra'},
    { label: 'net-silva'},
    { label: 'nethope'},
    { label: 'netmais'},
    { label: 'netmaster'},
    { label: 'nova-net'},
    { label: 'NOVANET'},
    { label: 'pay-use'},
    { label: 'planoweb'},
    { label: 'plugar'},
    { label: 'plus-internet'},
    { label: 'power-net'},
    { label: 'pw-fibra'},
    { label: 'raynet'},
    { label: 'rb-soluções'},
    { label: 'rede-mais-net'},
    { label: 'rlnet'},
    { label: 'rnett'},
    { label: 'smarttec'},
    { label: 'softxx'},
    { label: 'TCM'},
    { label: 'TCM Telecom'},
    { label: 'tec-solutions'},
    { label: 'tech-net'},
    { label: 'tech-pignaton'},
    { label: 'teleplix'},
    { label: 'Tester'},
    { label: 'th-comunicações'},
    { label: 'top-net'},
    { label: 'turbo-caires'},
    { label: 'turbo-net'},
    { label: 'ubernet'},
    { label: 'upbytes'},
    { label: 'viva-tecnologia'},
    { label: 'wmv-net'},
    { label: 'womp-telecom'},
    { label: 'WSP'},
    { label: 'Youcast CSMS'},
    { label: 'YPLAY'},
    { label: 'Z-Não-usar'},
    { label: 'Z-Não-usar-'},
    { label: 'zon-networks'},
  ];

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

function Brands() {

    const [brandName, setbrandName] = React.useState('');

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
        }],
      } ])

    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const handleChange = (event) => {
        setbrandName(event.target.value);
      };

      const [selectedOption, setSelectedOption] = useState(null);
      const [isOpen, setIsOpen] = useState(false);
    
    const toggling = () => setIsOpen(!isOpen);
    let domNode = useClickOutside(() => {
        setIsOpen(false);
      });

    useEffect (() => {

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
                    value={brandName === '' ? '' : brandName}
                    label="brandName"
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
                    {packagesUserBrand.filter((item) =>
                    brandName !== '' && item.dealer === brandName 
                    ).map((item, index) => {
                        const pages = Math.ceil(item.data.length / itensPerPage)
                        const startIndex = currentPage * itensPerPage; //indexOfLastItem
                        const endIndex = startIndex + itensPerPage; //indexOfFirstItem
                        const currentItens = item.data.slice(startIndex, endIndex)
                        console.log("o array atual", item)
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
                        <Container key={index} style={{width: '100%', maxWidth: 1200, height: 700, margin: 'auto', borderRadius: 10 }}>
                          
                            
    
                          <div style={{margin: 'auto', width: '90%',  display: 'flex', justifyContent: 'space-between', height: 70, alignItems: 'center', paddingTop: 30}}>
                            <div style={{width: '20%',  height: 'auto'}}>
                              <h3>Active Users and Packages</h3>
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
    
                          <table style={{ width: '95%', display: 'flex', flexDirection: 'column', margin: 'auto', paddingTop: 30, paddingBottom: 30, }}>
    
                            <AlternativeTheadStyle className="tHeadConfig">
                              <tr className="trConfig">
                                <th style={{width: 300,}}>Login</th>
                                <th style={{width: 250,  }}>Identificador</th>
                                <th style={{width: 100,  }}>Y.Completo</th>
                                <th style={{width: 100, }}>Y.Light</th>
                                <th style={{width: 70,}}>Kids</th>
                                <th style={{width: 90,}}>Nacional</th>
                                <th style={{width: 90,}}>Studios</th>
                                <th style={{width: 70,}}>TVOD</th>
                                <th style={{width: 100,}}>Urban</th>
                              </tr>
                            </AlternativeTheadStyle>
                            <tbody style={{overflowY: 'scroll', height: 350, marginTop: 20, }}>
                              {currentItens.map((items, i) => {

                                  const dealerPackages = [{
                                      login: items.login,
                                      packYPlayCompleto: items.pacotes.filter(i => i.product === 'YPlay Completo').map(item => item.product),
                                      packYPlayLight: items.pacotes.filter(i => i.product === 'Yplay Light').map(item => item.product),
                                      packSVODKids: items.pacotes.filter(i => i.product === 'SVOD Kids').map(item => item.product),
                                      packSVODNacional: items.pacotes.filter(i => i.product === 'SVOD Nacional').map(item => item.product),
                                      packSVODStudio: items.pacotes.filter(i => i.product === 'SVOD Studio').map(item => item.product),
                                      packTVOD: items.pacotes.filter(i => i.product === 'TVOD').map(item => item.product),
                                      packYPlayUrban: items.pacotes.filter(i => i.product === 'YPlay Urban').map(item => item.product),
                                      packIdentifier: items.pacotes.filter(i => i.product !== 'YPlay Urban' 
                                      && i.product !== 'YPlay Completo' 
                                      && i.product !== 'Yplay Light' 
                                      && i.product !== 'SVOD Kids' 
                                      && i.product !== 'SVOD Nacional' 
                                      && i.product !== 'SVOD Studio' 
                                      && i.product !== 'TVOD' ).map(item => item.product),
                                  }]

                                  console.log("teset aqui", dealerPackages)
                                 return(
                                    <tr key={i} style={{width: '100%', fontSize: '14px', margin: 'auto' }}>
                                        {dealerPackages.map((dealer) => {                                          
                                            return(
                                                <>
                                                  {dealer.packIdentifier.length == 1 ? 
                                                    <>
                                                    <td style={{width: 200, margin: 'auto', textAlign: 'center', }}>{dealer.login}</td>
                                                    <td style={{width: 150, margin: 'auto', textAlign: 'center', }}>{dealer.packIdentifier}</td>
                                                    <td style={{width: 100, margin: 'auto', textAlign: 'center',  }}>{dealer.packYPlayCompleto == 'YPlay Completo' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    <td style={{width: 100, margin: 'auto', textAlign: 'center', }}>{dealer.packYPlayLight == 'Yplay Light' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    <td style={{width: 70, margin: 'auto', textAlign: 'center',  }}>{dealer.packSVODKids == 'SVOD Kids' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    <td style={{width: 90, margin: 'auto', textAlign: 'center',  }}>{dealer.packSVODNacional == 'SVOD Nacional' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    <td style={{width: 90, margin: 'auto', textAlign: 'center',  }}>{dealer.packSVODStudio == 'SVOD Studio' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    <td style={{width: 70, margin: 'auto', textAlign: 'center',  }}>{dealer.packTVOD == 'TVOD' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    <td style={{width: 100, margin: 'auto', textAlign: 'center', }}>{dealer.packYPlayUrban == 'YPlay Urban' ? <Check style={{color: '#00ff1d'}}/> : 'n/a'}</td>
                                                    </> 
                                                  :
                                                    <>
                                                    <td style={{width: 300, margin: 'auto', textAlign: 'center', backgroundColor: 'red'}}>{dealer.login}</td>
                                                    <td style={{width: 300, margin: 'auto', textAlign: 'center', backgroundColor: 'red'}}>Há algo de errado com este usuário</td>
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

export default Brands;