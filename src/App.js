import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Link,
} from 'react-router-dom';

import { Generator } from './components/Generator/Generator';


function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/generator/" element={<Generator />} >
          <Route path="/generator/:file" element={<Generator />} />
        </Route>          
        <Route path="/" element={
          <div>
            <Link to="/generator/birth_f">День рождение девушки</Link>
            <Link to="/generator/new_year">Новый год</Link>
          </div>
        } />
          
      </Routes>
      </Router>
    </div>
  );
}

export default App;
