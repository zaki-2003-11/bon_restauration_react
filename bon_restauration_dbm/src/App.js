import { Route, Routes } from 'react-router-dom';
import './App.css';
import Personnes from './component/personnes';
import Print from './component/print';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Personnes />} />
        <Route path="/print" element={<Print />} />
      </Routes>
    
  );
}

export default App;
