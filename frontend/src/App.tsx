import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Staff from './pages/Staff';
import Inventory from './pages/Inventory';
import Predictions from './pages/Predictions';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/predictions" element={<Predictions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
