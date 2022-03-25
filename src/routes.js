import React, {useEffect} from 'react';

import {
    Routes,
    BrowserRouter,
    Route,
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



function AllRoutes() {
  const dispatch = useDispatch();
  const config = useSelector(state => state.config)
  
  useEffect(() => {

    if (!config.darkMode) {
      dispatch(darkModeAction(window.localStorage.getItem('theme')))
    }
  }, [config.darkMode, dispatch])
  


  return (
      <ThemeProvider theme={config.darkMode === "light" ? lightTheme : darkTheme} >
            <LayoutBackground>

            <BrowserRouter >
                <Routes >
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/watching" element={<Watching />} />
                    <Route path="/packages" element={<Packages />} />
                </Routes>
            </BrowserRouter>
            </LayoutBackground>


      </ThemeProvider>
  )
}

export default AllRoutes;
