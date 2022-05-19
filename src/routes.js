import React, {useEffect} from 'react';

import {
    Routes,
    BrowserRouter,
    Route,
    Link,
    Navigate,
  } from "react-router-dom";

import lightTheme from "./styles/theme/light";
import darkTheme from "./styles/theme/dark";

import { ThemeProvider } from "styled-components";

import { darkModeAction } from './redux/actions/config_action';
import { useSelector, useDispatch } from "react-redux";

import LayoutBackground from './styles/theme/components/LayoutBackground';

import Home from './pages/home';
import Watching from './pages/watching';
import Login from './pages/login';
import Packages from './pages/packages';
import Dealers from './pages/dealers';

import { useNavigate } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import PrivateRoute from './utils/privateRoute';


const PrivateRoutes = ({ element: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => 
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Link to={{ pathname: "/", state: { from: props.location } }} />
      )
    }



  />
);



function AllRoutes() {
  const dispatch = useDispatch();
  const config = useSelector(state => state.config)
  const checkRoutes = localStorage.getItem("token")
  
  
  
  useEffect(() => {


    if (!config.darkMode) {
      dispatch(darkModeAction(window.localStorage.getItem('theme')))
    }
  }, [config.darkMode, dispatch, ])
  


  return (
      <ThemeProvider theme={config.darkMode === "light" ? lightTheme : darkTheme} >
            <LayoutBackground>

            <BrowserRouter >
                <Routes >

                  <Route exact path="/" element={<Login />} />

                  <Route path="/dashboard" element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>  
                  } />
                  <Route path="/watching" element={
                  <PrivateRoute>
                    <Watching />
                  </PrivateRoute>
                  } />
                  <Route path="/packages" element={
                  <PrivateRoute>
                    <Packages />
                  </PrivateRoute>
                  } />
                  <Route path="/dealers" element={
                  <PrivateRoute>
                    <Dealers />
                  </PrivateRoute>
                  } />



                </Routes>
            </BrowserRouter>
            </LayoutBackground>


      </ThemeProvider>
  )
}

export default AllRoutes;
