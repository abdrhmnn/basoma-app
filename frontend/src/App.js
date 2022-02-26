import React, { Component } from "react";

// styling
import "./styles/App.scss";

// Cookie storage
import kuki from "./kuki";

// components
// landing page components
import Home from "./components/landing_page/Home";
import EmptyPage from './components/EmptyPage';
import About from './components/landing_page/About';
import Bantuan from './components/landing_page/Bantuan';
import Login from './components/landing_page/Login';
import BantuanDetail from './components/landing_page/BantuanDetail';
import Masukan from './components/landing_page/Masukan';
import EditProfile from './components/landing_page/EditProfile';
import Register from "./components/landing_page/Register";
import PageAwalKuesioner from "./components/landing_page/PageAwalKuesioner";
import KuesionerPendaftaran from "./components/landing_page/KuesionerPendaftaran";
import HasilKuesionerPendaftaran from "./components/landing_page/HasilKuesionerPendaftaran";
import FormPendaftaranBantuan from "./components/landing_page/FormPendaftaranBantuan";
import SuccessPendaftaranBantuan from "./components/landing_page/SuccessPendaftaranBantuan";

// admin page components
import Dashboard from "./components/admin_page/Dashboard";
import User from "./components/admin_page/User";
import BantuanAdmin from "./components/admin_page/BantuanAdmin";
import TambahBantuan from "./components/admin_page/TambahBantuan";
import EditProfileAdmin from "./components/admin_page/EditProfileAdmin";
import KriteriaBantuan from "./components/admin_page/KriteriaBantuan";
import EditKriteriaBantuan from "./components/admin_page/EditKriteriaBantuan";
import MasukanAdmin from "./components/admin_page/Masukan";
import PendaftaranBantuan from "./components/admin_page/PendaftaranBantuan";
import PendaftaranBantuanDetail from "./components/admin_page/PendaftaranBantuanDetail";
import WargaDetail from "./components/admin_page/WargaDetail";
import RangkingAlternatif from "./components/admin_page/RangkingAlternatif";

// npm packages
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Pemberitahuan from "./components/landing_page/Pemberitahuan";

const PrivateRouteAdmin = ({ children }) => {
  const isAuthenticated = kuki.get("admin")

  if (isAuthenticated ) {
    return children
  }

  return <Navigate to="/" />;
};

const PrivateRouteWarga = ({ children }) => {
  const isAuthenticated = kuki.get("warga")

  if (isAuthenticated) {
    return children
  }

  return <Navigate to="/dashboard" />;
};

class App extends Component{
  render(){
    return(
      <Router>
        <div>
          <Routes>
              {/* Landing page components */}
              <Route
                exact
                path="/"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <Home />
                  </PrivateRouteWarga> :
                  <Home />
                }
              />

              <Route
                exact
                path="/tentang"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <About />
                  </PrivateRouteWarga> :
                  <About />
                }
              />

              <Route
                exact
                path="/bantuan"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <Bantuan />
                  </PrivateRouteWarga> :
                  <Bantuan />
                }
              />

              <Route
                exact
                path="/bantuan-detail"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <BantuanDetail activeNav="true" />
                  </PrivateRouteWarga> :
                  <BantuanDetail activeNav="true" />
                }
              />

              <Route
                exact
                path="/login"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <Login />
                  </PrivateRouteWarga> :
                  <Login />
                }
              />

              <Route
                exact
                path="/register"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <Register />
                  </PrivateRouteWarga> :
                  <Register />
                }
              />

              <Route
                exact
                path="/masukan"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <Masukan data="true"/>
                  </PrivateRouteWarga> :
                  <Masukan data="true"/>
                }
              />

              <Route
                exact
                path="/edit-profile"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <EditProfile />
                  </PrivateRouteWarga> :
                  <EditProfile />
                }
              />

              <Route
                exact
                path="/panduan-pendaftaran"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <PageAwalKuesioner />
                  </PrivateRouteWarga> :
                  <PageAwalKuesioner />
                }
              />

              <Route
                exact
                path="/kuesioner-pendaftaran"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <KuesionerPendaftaran />
                  </PrivateRouteWarga> :
                  <KuesionerPendaftaran />
                }
              />

              <Route
                exact
                path="/hasil-kuesioner-pendaftaran"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <HasilKuesionerPendaftaran />
                  </PrivateRouteWarga> :
                  <HasilKuesionerPendaftaran />
                }
              />

              <Route
                exact
                path="/form-pendaftaran"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <FormPendaftaranBantuan />
                  </PrivateRouteWarga> :
                  <FormPendaftaranBantuan />
                }
              />

              <Route
                exact
                path="/form-pendaftaran-success"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <SuccessPendaftaranBantuan />
                  </PrivateRouteWarga> :
                  <SuccessPendaftaranBantuan />
                }
              />

              <Route
                exact
                path="/pemberitahuan"
                element={
                  kuki.get("warga") || kuki.get("admin") ? 
                  <PrivateRouteWarga>
                    <Pemberitahuan />
                  </PrivateRouteWarga> :
                  <Pemberitahuan />
                }
              />
              {/* Akhir landing page components */}

              {/* Admin page components */}
              <Route
                exact
                path="/dashboard"
                element={
                  <PrivateRouteAdmin>
                    <Dashboard />
                  </PrivateRouteAdmin>
                }
              />

              <Route
                exact
                path="/user"
                element={
                  <PrivateRouteAdmin>
                    <User />
                  </PrivateRouteAdmin>
                }
              />

              <Route
                exact
                path="/kelola-bantuan"
                element={
                  <PrivateRouteAdmin>
                    <BantuanAdmin />
                  </PrivateRouteAdmin>
                }
              />

              <Route
                exact
                path="/tambah-bantuan"
                element={
                  <PrivateRouteAdmin>
                    <TambahBantuan />
                  </PrivateRouteAdmin>
                }
              />

              <Route
                exact
                path="/edit-profile-admin"
                element={
                  <PrivateRouteAdmin>
                    <EditProfileAdmin />
                  </PrivateRouteAdmin>
                }
              />

              <Route
                exact
                path="/kriteria-bantuan"
                element={
                  <PrivateRouteAdmin>
                    <KriteriaBantuan />
                  </PrivateRouteAdmin>
                }
              />

              <Route
                exact
                path="/edit-kriteria-bantuan"
                element={
                  <PrivateRouteAdmin>
                    <EditKriteriaBantuan />
                  </PrivateRouteAdmin>
                }
              />

              <Route
                exact
                path="/kelola-masukan"
                element={
                  <PrivateRouteAdmin>
                    <MasukanAdmin />
                  </PrivateRouteAdmin>
                }
              />

              <Route
                exact
                path="/pendaftaran-bantuan"
                element={
                  <PrivateRouteAdmin>
                    <PendaftaranBantuan />
                  </PrivateRouteAdmin>
                }
              />

              <Route
                exact
                path="/pendaftaran-bantuan-detail"
                element={
                  <PrivateRouteAdmin>
                    <PendaftaranBantuanDetail />
                  </PrivateRouteAdmin>
                }
              />

              <Route
                exact
                path="/warga-detail"
                element={
                  <PrivateRouteAdmin>
                    <WargaDetail />
                  </PrivateRouteAdmin>
                }
              />

              <Route
                exact
                path="/rangking"
                element={
                  <PrivateRouteAdmin>
                    <RangkingAlternatif />
                  </PrivateRouteAdmin>
                }
              />
              {/* Akhir admin page components */}

              {/* Empty Page */}
              <Route exact path="*" element={<EmptyPage />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

export default App;
