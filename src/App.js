import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import CharacterGrid from './CharacterGrid';
import CharacterDetail from './CharacterDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Rick and Morty Characters</h1>
        <Routes>
          <Route path="/" element={<CharacterGrid />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
