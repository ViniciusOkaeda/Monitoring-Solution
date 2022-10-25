import React, {useState, useEffect, useRef } from 'react';

import styled from "styled-components";

import { useNavigate } from "react-router-dom";

import './index.css';

import Container from '../../styles/theme/components/Container';
import AlternativeTheadStyle from '../../styles/theme/components/AlternativeTheadStyle'
import AlternativeTbodyStyle from '../../styles/theme/components/AlternativeTbodyStyle'
import DropDownList from '../../styles/theme/components/DropDownList';
import DropDownHeader from '../../styles/theme/components/DropDownHeader';
import IconStyle from '../../styles/theme/components/IconStyle';

import ThemeMenu from '../../components/themeMenu';
import DrawerComponent from '../../components/drawer';
import Header from '../../components/header/index.js';
import PermanentDrawerLeft from '../../components/drawer';
import {ExcelExportWatching} from '../../components/excel/ExcelExport';

import { CSVLink } from "react-csv";

import { Chart } from "react-google-charts";

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';
import CancelIcon from '@mui/icons-material/Cancel';
import Tooltips from '@mui/material/Tooltip';

import api from '../../services/api';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative'

import { PieChart, Pie, Legend, Tooltip, Sector, Cell, BarChart, XAxis, YAxis, Bar, Brush, CartesianGrid, ComposedChart  } from "recharts";

const style = {
  top: '55%',
  right: '10%',
  fontSize: 18,
  transform: 'translate(0, -10%)',
  lineHeight: '24px',
};

const stl = styled("div")`
top: 50%;
right: 10%;
font-size: 18px;
transform: translate(0, -10%);
line-height: 24px;
`;

const style2 = {
  fontSize: 18,
};

const DropDownListContainer = styled("div")``;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", ];

const RADIAN = Math.PI / 185;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

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

function Watching() {

    const tableRef = useRef(null);

    const navigate  = useNavigate();

    const [vendorName, setVendorName] = React.useState('');
    const [vendorName2, setVendorName2] = React.useState([{}]);
  
    const [ watchingUsers, setWatchingUsers] = useState([ {
      Vendor: '',
      data: [{
        Vendor: '',
        IDVendor: '',
        login: '',
        Channel: '',
        ChannelURL: '',
        VOD: '',
        VODURL: '',
        watching_now_stream_type: '',
        watching_now_devices_type: '',
        watching_now_type: '',
      }],
    } ])

    const [ watchingQtdChannels, setWatchingQtdChannels] = useState([ {
      Vendor: '',
      data: [{
        Vendor: '',
        IDVendor: '',
        Canal: '',
        URL: '',
        QTD: '',
      }],
    } ])

    const [ watchingQtdDevices, setWatchingQtdDevices] = useState([ {
      Vendor: '',
      data: [{
        IDVendor: '',
        Vendor: '',
        Tipo: '',
        Versao: '',
        customers: '',
      }],
    } ])

    const [ watchingQtdTypes, setWatchingQtdTypes] = useState([ {
      Vendor: '',
      data: [{
        IDVendor: '',
        Vendor: '',
        Tipo: '',
        Total: '',
      }],
    } ])

    const handleChange = (event) => {
      setVendorName(event.target.value);
    };

    const headers = [
      { label: "Vendor", key: "Vendor" },
      { label: "IDVendor", key: "IDVendor" },
      { label: "Login", key: "login" },
      { label: "Channel", key: "Channel" },
      { label: "Vod", key: "VOD" },
      { label: "Stream", key: "watching_now_stream_type" },
      { label: "Devices", key: "watching_now_devices_type" },
      { label: "Type", key: "watching_now_type" },
    ];

    const [itensPerPage, setItensPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageNumberLimit, setPageNumberLimit] = useState(3);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
  
    const toggling = () => setIsOpen(!isOpen);
  
    const onOptionClicked = value => () => {
      setSelectedOption(value);
      setIsOpen(false);
    };

    const [error, setError] = useState('');
  
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [loading3, setLoading3] = useState(false);
    const [loading4, setLoading4] = useState(false);

    let domNode = useClickOutside(() => {
      setIsOpen(false);
    });

    useEffect (() => {
      (async () => {
        const result = await api.get('monitoring/mw/customers/watching', {        
          headers: {
          token: localStorage.getItem("token")
        }})
        .then((result) =>  {
          setVendorName2(result.data.response.map( i => i.Vendor))
          setWatchingUsers(result.data.response);
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
        const result = await api.get('monitoring/mw/customers/watching/qtd/channels', {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then((result) => {
          setWatchingQtdChannels(result.data.response);
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

      (async () => {
        const result = await api.get('monitoring/mw/customers/watching/qtd/devices', {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then((result) => {
          setWatchingQtdDevices(result.data.response);
          setLoading3(true);
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
        const result = await api.get('monitoring/mw/customers/watching/qtd/types', {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then((result) => {
          setWatchingQtdTypes(result.data.response);
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

    }, [])
    return(
        <div style={{width: '100%', height: '100%', display: 'flex',}}>
          <div style={{}}>
            <PermanentDrawerLeft/>
          </div>
          <div style={{ width: '100%', height: 'auto'}}>
            <Header />

            {/*parte do input vendor */}
            <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>
            {loading === true && loading2 === true && loading3 === true && loading4 === true
            ? <div style={{display: 'flex', position: 'relative', zIndex: 0}}>
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
                  {watchingUsers.filter((item) =>
                    vendorName !== '' && item.Vendor === vendorName 
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
                      <Container key={index} style={{width: '100%',  height: 'auto', margin: 'auto', borderRadius: 10, paddingBottom: 20 }}>
                        
                          

                        <div style={{margin: 'auto', width: '90%',  display: 'flex', justifyContent: 'space-between', height: 70, alignItems: 'center', paddingTop: 30}}>
                          <div style={{width: '20%',  height: 'auto'}}>
                            <h2 className='gridH2'>Watching Now</h2>
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
                                        <ExcelExportWatching data={currentItens} />


                                        <CSVLink className='csvStyleP' filename={"watching-report.csv"} data={currentItens} headers={headers} separator={","}>
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
                        
                        <div style={{ width: '95%', height: 'auto', margin: 'auto', marginBottom: 40, }}>
                          <table ref={tableRef} style={{ width: '100%', height: '100%', paddingTop: 30, paddingBottom: 30, overflowX: 'scroll'}}>

                            <AlternativeTheadStyle style={{width: '100%', height: 60, }}>
                              <tr>
                              <th className='tbrc tbr1 fontTH'>Login</th>
                                <th className='tbrc tbr2 fontTH'>Channel</th>
                                <th className='tbrc tbr2 fontTH'>VOD</th>
                                <th className='tbrc tbr3 fontTH'>T.D.S</th>
                                <th className='tbrc tbr3 fontTH'>T.D.D</th>
                                <th className='tbrc tbr3 fontTH'>Format</th>
                              </tr>
                            </AlternativeTheadStyle>
                            <tbody className='scrX' style={{overflowY: 'scroll', width: '100%', height: 'auto', marginTop: 20, minWidth: 500, }}>
                              {currentItens.map((items, i) => (
                                <tr key={i} >
                                  <td className='tbrc tbr1 fontS'>{items.login}</td>
                                  <td className='tbrc tbr2 fontS'>{items.ChannelURL !== null ? <img src={items.ChannelURL} className="imgCEV" /> : <p style={{textAlign: 'center'}}>N/A</p>}</td>
                                  <td className='tbrc tbr2 fontS'>{items.VODURL !== null ? <img src={items.VODURL} className="imgCEV" /> : <p style={{textAlign: 'center'}}>N/A</p>}</td>
                                  <td className='tbrc tbr3 fontS'><p>{items.watching_now_stream_type.toUpperCase()}</p></td>
                                  <td className='tbrc tbr3 fontS'><p>{items.watching_now_devices_type.toUpperCase()}</p></td>
                                  <td className='tbrc tbr3 fontS'><p>{items.watching_now_type.toUpperCase()}</p></td>
                                </tr>
                              ))}
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

                  <Grid item xs={12} sm={12} md={6} elevation={4} square>
                  {watchingQtdDevices.filter((item) =>
                    vendorName !== '' && item.Vendor === vendorName 
                    ).map((item, index) => {
                      const data = item.data.map((items) => (
                        {
                            "name": items.Tipo+" - "+items.Versao,
                            "value": items.customers
                        }
                      ))
                      return(
                        <React.Fragment key={index}>
                          <Container style={{width: '100%', height: 'auto', margin: 'auto', borderRadius: 10, marginBottom: 10,}}>
                          <div style={{margin: 'auto', width: '100%', paddingTop: 1}}>
                          <h2 className='gridH2 alignCenter'>Devices Used</h2>
                          <PieChart width={380} height={530}>
                          <Pie
                            data={data}
                            cx={20}
                            cy={140}
                            label
                            paddingAngle={5}
                            outerRadius={100}
                            innerRadius={75}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                            <Tooltip />
                            <Legend layout="vertical" verticalAlign="left" wrapperStyle={style} />
                              </PieChart>
                          </div>
                          </Container>
                        </React.Fragment>             
                      )
                    }      
                    )}
                  </Grid>

                  <Grid item xs={12} sm={12} md={6} elevation={4} square>
                  {watchingQtdTypes.filter((item) =>
                    vendorName !== '' && item.Vendor === vendorName 
                    ).map((item, index) => {
                      const data = item.data.map((items) => (
                        {
                          "name": items.Tipo,
                          "value": items.Total
                        }
                      ))

                      return(
                        <React.Fragment key={index}>
                          <Container style={{width: '100%', height: 'auto', margin: 'auto', borderRadius: 10}}>
                          <div style={{margin: 'auto', width: '100%', paddingTop: 1}}>
                          <h2 className='gridH2 alignCenter'>Stream Types</h2>
                          <PieChart  width={350} height={530}>
                          <Pie
                            data={data}
                            cx={140}
                            cy={140}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {data.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                            <Tooltip />
                            <Legend layout="vertical" verticalAlign="left" wrapperStyle={style}/>

                              </PieChart>
                          </div>
                          </Container>
                        </React.Fragment>             
                      )
                    }      
                    )}
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} elevation={4} square>
                    {watchingQtdChannels.filter((item) =>
                    vendorName !== '' && item.Vendor === vendorName 
                    ).map((item, index) => {
                      const data = item.data.map((items) => (
                        {
                            "name": items.Canal,
                            "Quantidade de usuários": items.QTD
                        }
                      ))

                      return(
                        <React.Fragment key={index}>
                          <Container style={{width: '100%', height: 'auto', margin: 'auto', borderRadius: 10}}>
                          <div style={{margin: 'auto', width: '100%', paddingTop: 1}}>
                          <h2 className='gridH2 alignCenter'>Channels Being Watched</h2>
                          <ComposedChart
                            layout="vertical"
                            width={400}
                            height={2200}
                            data={data}
                            margin={{
                              top: 20,
                              right: 20,
                              bottom: 10,
                              left: 40
                            }}
                          >
                            <XAxis type="number" tick={{fontSize: 14}}/>
                            <YAxis dataKey="name" type="category" tick={{fontSize: 14}} scale="band" width={150} />
                            <Tooltip />
                            <Legend wrapperStyle={style2}/>
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

export default Watching;