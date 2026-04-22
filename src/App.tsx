import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ProblemSolvingPage from './pages/ProblemSolvingPage';
import AIFeedbackPage from './pages/AIFeedbackPage';

function App() {
  return (
    <BrowserRouter>
      {/* Top navigation — hidden on the problem solving page to maximize editor space */}
      <Routes>
        <Route
          path="/problem/:id"
          element={
            <>
              <Navbar />
              <ProblemSolvingPage />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/"          element={<LandingPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/feedback"  element={<AIFeedbackPage />} />
                </Routes>
              </main>
              <MobileBottomNav />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
