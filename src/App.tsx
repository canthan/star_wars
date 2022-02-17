import { Route, Routes } from 'react-router-dom';

import { Details } from './Details';
import { List } from './List';

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
