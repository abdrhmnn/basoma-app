// import { Component } from "react";

// styling
import "./styles/App.scss";

import kuki from "./kuki";

// components or files
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
// import { kuki } from "./kuki";

// admin page components
import Dashboard from "./components/admin_page/Dashboard";
import User from "./components/admin_page/User";
import BantuanAdmin from "./components/admin_page/BantuanAdmin";

// npm packages
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import TambahBantuan from "./components/admin_page/TambahBantuan";
import EditProfileAdmin from "./components/admin_page/EditProfileAdmin";
import KriteriaBantuan from "./components/admin_page/KriteriaBantuan";
import EditKriteriaBantuan from "./components/admin_page/EditKriteriaBantuan";
import PageAwalKuesioner from "./components/landing_page/PageAwalKuesioner";
import KuesionerPendaftaran from "./components/landing_page/KuesionerPendaftaran";
import HasilKuesionerPendaftaran from "./components/landing_page/HasilKuesionerPendaftaran";
import FormPendaftaranBantuan from "./components/landing_page/FormPendaftaranBantuan";
import SuccessPendaftaranBantuan from "./components/landing_page/SuccessPendaftaranBantuan";
import React, { Component } from "react";


// const PrivatRouteHasilPengisian = ({ component: Component, ...rest }) => {
//   const isSubmitted = kuki.get("pengisian");
//   const navigate = useNavigate();
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isSubmitted ? (
//           <Component {...props} {...rest} />
//         ) : (
//           navigate("/")
//           // <Redirect
//           //   to={{
//           //     pathname: "/",
//           //     state: {
//           //       // from: props.location
//           //     },
//           //   }}
//           // />
//         )
//       }
//     />
//   );
// };

class App extends Component{
  render(){
    const isSubmitted = kuki.get("pengisian");
    return(
<Router>
      <div>
        <Routes>
            {/* landing page components */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/tentang" element={<About />} />
            <Route exact path="/bantuan" element={<Bantuan />} />
            <Route exact path="/bantuan-detail" element={<BantuanDetail activeNav="true" />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/masukan" element={<Masukan data="true"/>} />
            <Route exact path="/edit-profile" element={<EditProfile />} />
            <Route exact path="/panduan-pendaftaran" element={<PageAwalKuesioner />} />
            <Route exact path="/kuesioner-pendaftaran" element={<KuesionerPendaftaran />} />
            <Route exact path="/hasil-kuesioner-pendaftaran" element={<HasilKuesionerPendaftaran />} />

            
            
            <Route exact path="/form-pendaftaran" element={<FormPendaftaranBantuan />} />
            <Route exact path="/form-pendaftaran-success" element={<SuccessPendaftaranBantuan />} />
            {/* <PrivatRoute exact path="/edit-profile" element={<EditProfile />}/> */}

            {/* admin page components */}
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/user" element={<User />} />
            <Route exact path="/kelola-bantuan" element={<BantuanAdmin />} />
            <Route exact path="/tambah-bantuan" element={<TambahBantuan />} />
            <Route exact path="/edit-profile-admin" element={<EditProfileAdmin />} />
            <Route exact path="/kriteria-bantuan" element={<KriteriaBantuan />} />
            <Route exact path="/edit-kriteria-bantuan" element={<EditKriteriaBantuan />} />


            {/* Empty Page */}
            <Route exact path="*" element={<EmptyPage />} />
        </Routes>
      </div>
    </Router>
    )
  }
}

// function App() {
//   return (
    
//   );
// }

export default App;
