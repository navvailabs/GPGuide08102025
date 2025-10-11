import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import GPCarePlanGenerator from './pages/GPCarePlanGenerator';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/gp-care-plan-generator" element={<GPCarePlanGenerator />} />
    </Routes>
  );
}

export default App;
