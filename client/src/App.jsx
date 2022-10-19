import React from 'react';
import { Route, Routes } from 'react-router';
import Main from './pages/Main/Main';
import Ticket from './pages/Ticket/Ticket';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main modal="close" />} />
      <Route path="/create/todo" element={<Main modal="Todo" />} />
      <Route path="/create/in_progress" element={<Main modal="In progress" />} />
      <Route path="/edit/:id" element={<Main modal="edit" />} />
      <Route path="/full/:id" element={<Ticket modal={false} />} />
      <Route path="/full/:id/comment/create" element={<Ticket modal />} />
    </Routes>
  );
}

export default App;
