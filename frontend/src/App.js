import RegistrationModal from './components/RegistrationModal'
import LoginModal from "./components/LoginModal";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Route, Routes
 } from 'react-router-dom';
function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <Routes>
      <Route
            exact
            path="/"
            element={isLoggedIn == "true" ? <MainPage /> : <LoginModal />}
          />
        <Route path="/sign-in" element={<LoginModal />} />
        <Route path="/sign-up" element={<RegistrationModal />} />
        <Route path="/MainPage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
