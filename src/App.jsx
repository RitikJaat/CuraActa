import { useState } from 'react';
import Navbar from './components/Navbar';
import Todos from './components/Todos';
import './App.css';

function App() {

  return (
    <>
      <div className="body">
        <Navbar />
        <Todos/>
      </div>
    </>
  );
}

export default App;
