import React, {useEffect, } from 'react';

import {
    Routes,
    BrowserRouter,
    Route,
    Navigate,
  } from "react-router-dom";

import lightTheme from "./styles/theme/light";
import darkTheme from "./styles/theme/dark";


import { ThemeProvider } from "styled-components";

import { darkModeAction } from './redux/actions/config_action';
import { useSelector, useDispatch } from "react-redux";

import LayoutBackground from './styles/theme/components/LayoutBackground';

import Home from './pages/home';
import History from './pages/history';
import Now from './pages/now';
import Reporting from './pages/selection';

import Watching from './pages/watching';
import Login from './pages/login';
import Packages from './pages/packages';
import Dealers from './pages/dealers';

import PrivateRoute from './utils/privateRoute';

function AllRoutes() {
  const dispatch = useDispatch();
  const config = useSelector(state => state.config)

  const checkRoutes = localStorage.getItem("token")
  
  
  
  useEffect(() => {

    if (!config.darkMode) {
      dispatch(darkModeAction(window.localStorage.getItem('theme')))
    }

  }, [config.darkMode, dispatch, checkRoutes])
  


  return (
      <ThemeProvider theme={config.darkMode === "light" ? lightTheme : darkTheme} >
            <LayoutBackground>

            <BrowserRouter >
                <Routes >

                  {!checkRoutes && (
                  <Route exact path="/" element={<Reporting />} />)}

                  <Route path="/now" element={
                        <PrivateRoute>
                          <Now />
                        </PrivateRoute>  
                        } />
                        <Route path="/history" element={
                        <PrivateRoute>
                          <History />
                        </PrivateRoute>
                        } />               

                 <Route path="*" element={<Navigate to ={checkRoutes ? "/now" : "/"} />} /> 


                </Routes>
            </BrowserRouter>
            </LayoutBackground>


      </ThemeProvider>
  )
}

export default AllRoutes;
