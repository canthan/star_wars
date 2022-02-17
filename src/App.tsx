import { Route, Routes } from 'react-router-dom';

import { Details } from './components/Details';
import { List } from './components/List';

import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="details" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
