import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Register from "./pages/register";
import Login from "./pages/login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Saldo from "./pages/Saldo";
import JemputSampah from "./pages/JemputSampah";
import StatusPenjemputan from "./pages/StatusPenjemputan";
import Tracking from "./pages/Tracking";
import HargaSampah from "./pages/HargaSampah";
import Pengaturan from "./pages/Pengaturan";
import Riwayat from "./pages/Riwayat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/saldo" element={<Saldo />} />
        <Route path="/JemputSampah" element={<JemputSampah />} />
        <Route path="/statuspenjemputan" element={<StatusPenjemputan />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/hargasampah" element={<HargaSampah />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
        <Route path="/riwayat" element={<Riwayat />} />
      </Routes>
    </Router>
  );
}

export default App;