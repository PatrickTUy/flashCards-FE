import axios from 'axios';
import React,{useState} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/Routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
  
            <BrowserRouter >
            <ToastContainer/>
              <Routes/>
            </BrowserRouter>
  
   
  );
}

export default App;
