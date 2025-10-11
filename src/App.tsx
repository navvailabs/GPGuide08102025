import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import GPCarePlanGenerator from './pages/GPCarePlanGenerator';
import { BrightnessProvider } from './contexts/BrightnessContext';
import BrightnessControl from './components/BrightnessControl';

function App() {
  return (
    <BrightnessProvider>
      <BrightnessControl />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/gp-care-plan-generator" element={<GPCarePlanGenerator />} />
      </Routes>
    </BrightnessProvider>
  );
}

export default App;
