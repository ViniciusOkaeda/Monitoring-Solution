import React, {useState, useEffect} from 'react';
import ThemeMenu from '../../components/themeMenu';
import DrawerComponent from '../../components/drawer';
import Container from '../../styles/theme/components/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import TesteHeader from '../../components/header/testeHeader';
import PermanentDrawerLeft from '../../components/drawer';
import './index.css';
import Gradient from '../../styles/theme/components/Gradient';
import api from '../../services/api';
import Chart from '../../components/charts/PieChart.tsx';
import SimpleChart from '../../components/charts/SimpleChart.tsx';



function Products() {

    const [codigo, setCodigo] = useState('');
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [idProduto, setidProduto] = useState('');
    const [idCor, setIdCor] = useState('');

    const [ watchingQtdChannels, setWatchingQtdChannels] = useState([ {
      IDVendor: '',
      Vendor: '',
      Canal: '',
      URL: '',
      QTD: '',
    } ])
    console.log(watchingQtdChannels)
    
    function compararNumeros(a, b) {
      return a - b;
    }

    const [error, setError] = useState(null);
  
    const [loading, setLoading] = useState(false);

    useEffect (() => {
      api
      .get('monitoring/mw/customers/watching/qtd/channels')
      .then((response) => {
        console.log("aq oe", response.data);
        setWatchingQtdChannels(response.data.response);

  })
      .catch((error) => {
        // handle error
          console.log(error);
  })



    }, [])

    const createProduct = async e => {
        e.preventDefault();
        setLoading(true);
        let cor = []
        let item = {codigo, valor, descricao, idProduto, cor}
        //console.log(JSON.stringify({item}))
        let result = await fetch("http://10.5.0.53/api/v1/vendor", {
                      method: 'POST',
                      body: JSON.stringify(item)
                  });
                  result = await result.json();
                  //console.log("aqui o resultado dos fornecedores", result)
                  if(result.status === 1001 ){
                    setLoading(false);
                    setError("Fornecedor criado com sucesso!");
                    window.location.reload();
                  } else {
                      if(result.status === 1014) {
                        setError("Este fornecedor já existe!");
                      } else {
                        if(result.status === 1115) {
                          setError("Dados inválidos, tente novamente.")
                        }
                      }
        }
      //console.log(result.status)
      }

    return(
        <div style={{width: '100%', height: '100%', display: 'flex',}}>
          <div style={{}}>
            <PermanentDrawerLeft/>
          </div>
          <div style={{ width: '100%', height: 2000}}>
            <TesteHeader />

            <div style={{width: '95%', margin: 'auto',  borderRadius: 15}}>
              {watchingQtdChannels.map((item) => (
                <div key={item.Canal}>
                  {console.log(item.Canal)}
                </div>
              ))}
              <Container style={{height: 450, marginTop: 40}}>
              <SimpleChart style={{margin: 'auto'}} />
              </Container>
            </div>


            <ThemeMenu/> 
          </div>
      </div>
    );
}

export default Products