import React, {useState, useEffect, useRef } from 'react';

import styled from "styled-components";

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

import { Pagination } from '@mui/material';

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


import api from '../../services/api';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative'

import { PieChart, Pie, Legend, Tooltip, Sector, Cell, BarChart, XAxis, YAxis, Bar, Brush, CartesianGrid, ComposedChart  } from "recharts";

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const vendorsYc = [
  { label: 'Adylnet', id: 7},
  { label: 'Americanet', id: 16},
  { label: 'D-Net', id: 13},
  { label: 'HSL', id: 5},
  { label: 'NOVA NET', id: 14},
  { label: 'TCM', id: 1 },
  { label: 'Videocast', id: 9},
  { label: 'WSP', id: 3},
  { label: 'youcast', id: 17},
  { label: 'YPLAY', id: 2},
];

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

    const [codigo, setCodigo] = useState('');
    const [ filterId, setFilterId] = useState('');
    const [vendorNumber, setVendorNumber] = React.useState('');

  
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
      setVendorNumber(event.target.value);
    };

    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);


    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
  
    const toggling = () => setIsOpen(!isOpen);
  
    const onOptionClicked = value => () => {
      setSelectedOption(value);
      setIsOpen(false);
      console.log(selectedOption);
    };

    const [error, setError] = useState(null);
  
    const [loading, setLoading] = useState(false);

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
          //console.log("aq oe", result.data.response);
          setWatchingUsers(result.data.response);
    })
        .catch((error) => {
          // handle error
            console.log(error);
    })

      })();

      (async () => {
        const result = await api.get('monitoring/mw/customers/watching/qtd/channels', {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then((result) => {
          //console.log("aq oe", result.data.response);
          setWatchingQtdChannels(result.data.response);
  
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
          //console.log("aq oe", result.data.response);
          setWatchingQtdDevices(result.data.response);
  
    })
        .catch((error) => {
          // handle error
            console.log(error);
    })

      })();

      (async () => {
        const result = await api.get('monitoring/mw/customers/watching/qtd/types', {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then((result) => {
          //console.log("aq oe", result.data.response);
          setWatchingQtdTypes(result.data.response);
  
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

            {/*parte do input vendor */}
            <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>
              <Box sx={{ minWidth: 220, marginBottom: 5 }}>
                <FormControl sx={{ width: 180 }}>
                  <InputLabel id="outlined-select-label">Vendor</InputLabel>
                  <Select
                    labelId="outlined-select-label"
                    id="outlined-select-currency"
                    value={vendorNumber === '' ? '' : vendorNumber}
                    label="VendorNumber"
                    onChange={handleChange}
                  >
                  {vendorsYc.map((option, w) => (
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
                {watchingUsers.filter((item) =>
                  vendorNumber !== '' && item.Vendor === vendorNumber 
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
                    <Container key={index} style={{width: '100%', maxWidth: 1200, height: 'auto', margin: 'auto', borderRadius: 10 }}>
                      
                        

                      <div style={{margin: 'auto', width: '90%',  display: 'flex', justifyContent: 'space-between', height: 70, alignItems: 'center', paddingTop: 30}}>
                        <div style={{width: '20%',  height: 'auto'}}>
                          <h3>Watching Now</h3>
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
                        <table ref={tableRef} style={{ width: '100%', height: '100%', paddingTop: 30, paddingBottom: 30, }}>

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
                          <tbody style={{overflowY: 'scroll', width: '100%', height: 'auto', marginTop: 20,}}>
                            {currentItens.map((items, i) => (
                              <tr key={i} >
                                <td className='tbrc tbr1 fontTH'>{items.login}</td>
                                <td className='tbrc tbr2 fontTH'>{items.ChannelURL !== null ? <img src={items.ChannelURL} className="imgCEV" /> : <p style={{textAlign: 'center'}}>N/A</p>}</td>
                                <td className='tbrc tbr2 fontTH'>{items.VODURL !== null ? <img src={items.VODURL} className="imgCEV" /> : <p style={{textAlign: 'center'}}>N/A</p>}</td>
                                <td className='tbrc tbr3 fontTH'><p>{items.watching_now_stream_type.toUpperCase()}</p></td>
                                <td className='tbrc tbr3 fontTH'><p>{items.watching_now_devices_type.toUpperCase()}</p></td>
                                <td className='tbrc tbr3 fontTH'><p>{items.watching_now_type.toUpperCase()}</p></td>
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

                <Grid item xs={12} sm={12} md={6} elevation={4} square>
                {watchingQtdDevices.filter((item) =>
                  vendorNumber !== '' && item.Vendor === vendorNumber 
                  ).map((item, index) => {
                    const data = item.data.map((items) => (
                      {
                          "name": items.Tipo+" - "+items.Versao,
                          "value": items.customers
                      }
                    ))
                    return(
                      <React.Fragment key={index}>
                        <Container style={{width: '100%', height: 'auto', margin: 'auto', borderRadius: 10}}>
                        <div style={{margin: 'auto', width: '100%', paddingTop: 1}}>
                        <h3 style={{textAlign: 'center',}}>Devices Used</h3>
                        <PieChart width={520} height={280}>
                        <Pie
                          data={data}
                          cx={140}
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
                          <Legend layout="vertical" verticalAlign="middle" wrapperStyle={style}/>
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
                  vendorNumber !== '' && item.Vendor === vendorNumber 
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
                        <h3 style={{textAlign: 'center',}}>Stream Types</h3>
                        <PieChart width={450} height={280}>
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
                          <Legend layout="vertical" verticalAlign="middle" wrapperStyle={style}/>

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
                  vendorNumber !== '' && item.Vendor === vendorNumber 
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
                        <h3 style={{textAlign: 'center',}}>Channels Being Watched</h3>
                        <ComposedChart
                          layout="vertical"
                          width={500}
                          height={2200}
                          data={data}
                          margin={{
                            top: 20,
                            right: 20,
                            bottom: 10,
                            left: 80
                          }}
                        >
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" tick={{fontSize: 16}} scale="band" width={150} />
                          <Tooltip />
                          <Legend />
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

            </div>

            <ThemeMenu/> 
          </div>
      </div>
    );
}

export default Watching;