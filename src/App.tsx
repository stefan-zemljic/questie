import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Box, Image} from '@chakra-ui/react';
import { FaBeer } from 'react-icons/fa';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Box w={500}>
          <Image src={logo} className="App-logo" alt="logo" />
        </Box>
        <FaBeer color="#3592FF" size={100}/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
