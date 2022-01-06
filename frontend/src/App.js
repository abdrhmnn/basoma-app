import './styles/App.scss';

// components
import Home from "./components/Home";
import EmptyPage from './components/EmptyPage';
import About from './components/About';
import Bantuan from './components/Bantuan';
import Login from './components/Login';
import CardBantuan from './components/CardBantuan';
import Masukan from './components/Masukan';
import EditProfile from './components/EditProfile';

// npm packages
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/tentang" element={<About />} />
            <Route exact path="/bantuan" element={<Bantuan />} />
            <Route exact path="/bantuan/:selected" element={<CardBantuan />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/masukan" element={<Masukan data="true"/>} />
            <Route exact path="/edit-profile" element={<EditProfile />} />

            {/* Empty Page */}
            <Route exact path="*" element={<EmptyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
