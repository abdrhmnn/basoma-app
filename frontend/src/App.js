// import { Component } from "react";

// styling
import "./styles/App.scss";

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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TambahBantuan from "./components/admin_page/TambahBantuan";


// const PrivatRoute = ({ component: Component, ...rest }) => {
//   const navigate = useNavigate()
//   const isAuth = kuki.get("user_id");

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuth ? (
//           <Component {...props} {...rest} />
//         ) : (
//           navigate({
//             to: "/"
//           })
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

function App() {
  return (
    <Router>
      <div>
        <Routes>
            {/* landing page components */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/tentang" element={<About />} />
            <Route exact path="/bantuan" element={<Bantuan />} />
            <Route exact path="/bantuan-detail" element={<BantuanDetail data="true" />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/masukan" element={<Masukan data="true"/>} />
            <Route exact path="/edit-profile" element={<EditProfile />} />
            {/* <PrivatRoute exact path="/edit-profile" element={<EditProfile />}/> */}

            {/* admin page components */}
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/user" element={<User />} />
            <Route exact path="/kelola-bantuan" element={<BantuanAdmin />} />
            <Route exact path="/tambah-bantuan" element={<TambahBantuan />} />


            {/* Empty Page */}
            <Route exact path="*" element={<EmptyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
