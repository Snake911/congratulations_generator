import {
  Routes ,
  Route,
} from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage/ErrorPage';

import { Generator } from './components/Generator/Generator';
import { Home } from './components/Home/Home';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />} >
        <Route index element={<Home />} />          
        <Route path="generator/" element={<Generator />} />
        <Route path="generator/:file" element={<Generator />} />        
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
