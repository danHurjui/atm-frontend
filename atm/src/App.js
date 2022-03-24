import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as BrowserRouter, Routes, Route}
from 'react-router-dom';

import Home from './pages/home';
import About from './pages/about';

import Layout from './pages/Laoyout';
import Contact from './pages/contact';
import Container from 'react-bootstrap/Container'

export default function App() {
      return (
        <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              
            </Route>
          </Routes>
        </BrowserRouter>
        </Container>
      );
    }
    


