import React, {useEffect, useState} from 'react';

import './index.css'

import api from '../../services/api';

import Container from '../../styles/theme/components/Container';

import ThemeMenu from '../../components/themeMenu';
import Header from '../../components/header';
import PermanentDrawerLeft from '../../components/drawer';




import Table from '@material-ui/core/Table';





function Home() {

  const [codigo, setCodigo] = useState('');
  const [ filterId, setFilterId] = useState('');
  const [vendorNumber, setVendorNumber] = React.useState(null);
  const [watchingNumber, setWatchingNumber] = React.useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  


    useEffect (() => {

    (async () => {
      const result = await api.get('monitoring/mw/customers/watching/qtd/channels', {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      .then((result) => {
        console.log("o valor", result)
        setWatchingNumber(result.data.response.map((e) => e.data.map((i) => i.QTD).reduce((total, numero) => total + numero, 0)).reduce((total, numero) => total + numero, 0) )
        console.log("o map aqui", result.data.response.map((e) => 
        e.data.map((i) => i.QTD).reduce((total, numero) => total + numero, 0)) );
        console.log("o map aqui2", result.data.response.map((e) => 
        e.data.map((i) => i.QTD)) );
        console.log("o watching aq", watchingNumber)

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
        console.log("aq oe", result.data.response);
        //setWatchingQtdChannels(result.data.response);

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
        <div style={{ width: '100%', height: 2000}}>
          <Header />


          <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>

            <Container style={{height: 450, marginTop: 40}}>
                <Table/>
                <p>{watchingNumber}</p>
            </Container>
            <Container style={{height: 450, marginTop: 40}}>
            </Container>
          </div>


          <ThemeMenu/> 
        </div>
    </div>
  );
}

export default Home;