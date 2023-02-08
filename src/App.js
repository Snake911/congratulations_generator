import {
  BrowserRouter as Router,
  Routes ,
  Route,
} from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage/ErrorPage';

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
              <Route path="/generator/:file" element={<Generator />}  errorElement={<ErrorPage />} />
            </Route>          
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />   
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
