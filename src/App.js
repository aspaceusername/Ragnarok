import React from 'react';
import './App.css';
import { BrowserRouter,HashRouter, Route, Routes } from 'react-router-dom';
import Navbarapp from './Componentes/Navbar.js';
import 'bootstrap/dist/css/bootstrap.min.css';
//Utilizaremos estas funcionalidades do Bootstrap
import {Container,Row, Col, Button,Alert,Breadcrumb, Card, Form} from 'react-bootstrap';
import Home from './Componentes/Paginas/Home.js';
import Signup from './Componentes/Paginas/Signup.js';
import Signup_Success from './Componentes/Paginas/Signup_Success.js';
import Login from './Componentes/Paginas/Login.js';
import { AuthProvider } from './Componentes/Paginas/AuthContext';
import Profile from './Componentes/Paginas/Profile';
import General from './Componentes/Paginas/Topics/General'
import Rules from './Componentes/Paginas/Topics/Server_Rules'
import Guilds from './Componentes/Paginas/Topics/Guilds'

const App = () => {

  return (

      <BrowserRouter>
          <AuthProvider>
            <Navbarapp />
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />
              <Route path="/Signup_Success" element={<Signup_Success />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/forum/General" element={<General />} />
              <Route path="/forum/Rules" element={<Rules />} />
              <Route path="/forum/Guilds" element={<Guilds />} />
            </Routes>
          </AuthProvider>
      </BrowserRouter>
  );
};

export default App;

