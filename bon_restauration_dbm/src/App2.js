import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Personnes from './component/personnes';
import Print from './component/print';
import Historique from './component/historique';
import Statistique from './component/statistique';

function App2() {
  return (
    <>
  <div className='container'>


        <div className='row'>
          <div className='col-2 btn btn-info'>
            <Link  to={"/"}>Personnes</Link>
          </div>
          <div className='col-1 '></div>
          <div className='col-2 btn btn-info'>
            <Link  to={"/historique"}>Historique</Link>
          </div>
          <div className='col-1 '></div>
          <div className='col-2 btn btn-info'>
            <Link  to={"/statistique"}>Statistique</Link>
          </div>
        </div>

      </div>

      <Routes>
        <Route path="/" element={<Personnes />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/statistique" element={<Statistique />} />
      </Routes>
    </>

  );
}

export default App2;
