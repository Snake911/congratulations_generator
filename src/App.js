import {
  BrowserRouter as Router,
  Routes ,
  Route,
} from 'react-router-dom';

import { Generator } from './components/Generator/Generator';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <div className="limiter">
        <Router>
          <Header />
          <Routes>
            <Route path="/generator/" element={<Generator />} >
              <Route path="/generator/:file" element={<Generator />} />
            </Route>          
            <Route path="/" element={<Home />} />          
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
