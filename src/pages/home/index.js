import React, {useEffect, useState} from 'react';

import './index.css'

import api from '../../services/api';

import Container from '../../styles/theme/components/Container';

import ThemeMenu from '../../components/themeMenu';
import Header from '../../components/header';
import SimpleChart from '../../components/charts/SimpleChart.tsx';
import PermanentDrawerLeft from '../../components/drawer';




import Table from '@material-ui/core/Table';





function Home() {

  const [codigo, setCodigo] = useState('');
  const [ filterId, setFilterId] = useState('');
  const [vendorNumber, setVendorNumber] = React.useState(null);

  const [ watchingQtdChannels, setWatchingQtdChannels] = useState([ {
    IDVendor: '',
    Vendor: '',
    Canal: '',
    URL: '',
    QTD: '',
  } ])
  
  function canaisEspecificos(canais) {
    return canais.IDVendor === 7;
  }
  
  function compararNumeros(a, b) {
    return a - b;
  }

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect (() => {

    (async () => {
      const result = await api.get('monitoring/mw/customers/watching/qtd/channels')
      .then((result) => {
        setWatchingQtdChannels(result.data.response);

  })
      .catch((error) => {
        // handle error
          console.log(error);
  })

    })();
    (async () => {
      const result = await api.get('monitoring/mw/customers/packages/qtd')
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
            </Container>
            <Container style={{height: 450, marginTop: 40}}>
            <SimpleChart style={{margin: 'auto'}} />
            </Container>
          </div>


          <ThemeMenu/> 
        </div>
    </div>
  );
}

export default Home;