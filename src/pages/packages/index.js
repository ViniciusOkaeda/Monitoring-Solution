import React, {useState, useEffect, useRef} from 'react';

import { useNavigate } from "react-router-dom";

import './index.css';

import styled from "styled-components";

import { CSVLink } from "react-csv";

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
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltips from '@mui/material/Tooltip';

import api from '../../services/api';

import { PieChart, Pie, Legend, Tooltip, Sector, Cell, BarChart, XAxis, YAxis, Bar, Brush, CartesianGrid, ComposedChart  } from "recharts";
import { ExcelExportPackages } from '../../components/excel/ExcelExport';

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

function Packages() {

    const navigate  = useNavigate();


    const [vendorName, setVendorName] = React.useState('');
    const [vendorName2, setVendorName2] = React.useState([{}]);

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
      setVendorName(event.target.value);
    };
    
    const [error, setError] = useState('');
  
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const [itensPerPage, setItensPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
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
        const result = await api.get('monitoring/mw/customers/packages', {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then((result) => {
          //console.log("aq oe", result.data.response);
          setVendorName2(result.data.response.map( i => i.Vendor));
          setPackagesUser(result.data.response);
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

      (async () => {
        const result = await api.get('monitoring/mw/customers/packages/qtd', {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then((result) => {
          //console.log("aq oe", result.data.response);
          setPackagesQtd(result.data.response);
          setLoading2(true);
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
        <div style={{width: '100%', height: 'auto', display: 'flex',}}>
          <div style={{}}>
            <PermanentDrawerLeft/>
          </div>
          <div style={{ width: '100%', height: 'auto'}}>
            <Header />

            {/*parte do input vendor */}
            <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>
            {loading === true && loading2 === true
            ?
            <div style={{display: 'flex'}}>
              <Box className='paddT' sx={{ minWidth: 220, marginBottom: 5 }}>
                <FormControl sx={{ width: 180 }}>
                  <InputLabel id="outlined-select-label">Vendor</InputLabel>
                  <Select
                    labelId="outlined-select-label"
                    id="outlined-select-currency"
                    value={vendorName === '' ? '' : vendorName}
                    label="VendorNumber"
                    disabled={vendorName !== ''}
                    onChange={handleChange}
                  >
                  {vendorName2.map((option, w) => (
                  <MenuItem key={w} value={option}>
                    {option}
                  </MenuItem>
                ))}
                  </Select>
                </FormControl>
              </Box>
              {vendorName !== null && vendorName !== '' ?
                <Tooltips title="Remover Vendor" placement="right">
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

              {
                vendorName === '' 
                ? '' 
                                
                : 
                <Grid className='animationPg2' container component="main" sx={{  display: 'flex', }} spacing={2}>
                  <Grid item xs={12} sm={12} md={12} elevation={4} square>
                    {packagesUser.filter((item) =>
                      vendorName !== '' && item.Vendor === vendorName 
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
                          <Container key={index} style={{width: '100%', height: 'auto', margin: 'auto', borderRadius: 10 }}>

                            <div style={{margin: 'auto', width: '90%',  display: 'flex', justifyContent: 'space-between', height: 70, alignItems: 'center', paddingTop: 30}}>
                              <div style={{width: '20%',  height: 'auto'}}>
                                <h2 className='gridH2'>Users and Packages</h2>
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
                                            <p>Export to PDF</p>

                                            <ExcelExportPackages data={currentItens}/>

                                            <CSVLink className='csvStyleP' filename={"dealer-report.csv"} data={currentItens} headers={headers} separator={","}>
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
                              <table style={{ width: '100%', height: '100%', paddingTop: 30, paddingBottom: 30, }}>

                                <AlternativeTheadStyle style={{width: '100%', height: 60, }}>
                                  <tr>
                                    <th className='tbrc tbr1 fontTH'>Customer Login</th>
                                    <th className='tbrc tbr1 fontTH'>Registered Packages</th>

                                  </tr>
                                </AlternativeTheadStyle>
                                <tbody style={{overflowY: 'scroll', width: '100%', height: 'auto', marginTop: 20,}}>

                              {currentItens.map((items, i) => (
                                    <tr key={i} >
                                      {console.log("current aq", items)}
                                      <td className='tbrc tbr1 fontS'>{items.Cliente}</td>
                                      <td className='tbrc tbr1 fontS'><p style={{margin: 5}}> {items.pacotes.map((pct, o) => ( pct.Pacote+", " ))} </p></td>
                                    </tr>
                              ))}

                                </tbody>
                              </table>
                            </div>

                            <div style={{display: 'flex', justifyContent: 'space-between', margin: 'auto', width: '90%'}}>
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
                    vendorName !== '' && item.Vendor === vendorName 
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
                          <h2 className='gridH2 alignCenter'>Number of Users per Package</h2>
                          <ComposedChart
                            layout="vertical"
                            width={1200}
                            height={5000}
                            data={data}
                            margin={{
                              top: 20,
                              right: 20,
                              bottom: 10,
                              left: 80
                            }}
                          >
                            <XAxis type="number" tick={{fontSize: 18,}}/>
                            <YAxis dataKey="name" minTickGap={10} type="category" tick={{fontSize: 18,}} scale="band" width={250}/>
                            <Tooltip />
                            <Legend wrapperStyle={style}/>
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
              }

            </div>

            <ThemeMenu/> 
          </div>
      </div>
        );
}

export default Packages;

