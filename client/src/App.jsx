import React from 'react';
import { Route, Routes } from 'react-router';
import Main from './pages/Main/Main';
import Ticket from './pages/Ticket/Ticket';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main modal="close" />} />
      <Route path="/create" element={<Main modal="create" />} />
      <Route path="/edit/:id" element={<Main modal="edit" />} />
      <Route path="/full/:id" element={<Ticket />} />
    </Routes>
  );
}

export default App;
