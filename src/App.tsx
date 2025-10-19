import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import CarePlanSuite from './pages/CarePlanSuite';
import { BrightnessProvider } from './contexts/BrightnessContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <BrightnessProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/gp-care-plan-generator" 
          element={
            <ThemeProvider>
              <CarePlanSuite />
            </ThemeProvider>
          } 
        />
      </Routes>
    </BrightnessProvider>
  );
}

export default App;
