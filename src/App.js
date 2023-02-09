import "./App.css";
import MiniDrawer from "./components/Drawer";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Storage from "./pages/Storage";
import Pages from "./pages/Pages";
import Tags from "./pages/Tags";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import Posts from "./pages/Posts";
import Bids from "./pages/Bids";
import Info from "./pages/Info";
import Account from "./pages/Account";
import Notifications from "./pages/Notifications";
import AddProduct from "./pages/AddProducts";
import AddPage from "./pages/AddPage";
import AddPost from "./pages/AddPost";
import Auctions from "./pages/Auctions";
import Points from "./pages/Points";
import Services from "./pages/Services";
import Offers from "./pages/Offers";
import Companies from "./pages/Companies";
import Commission from "./pages/Commission";
import Classifications from "./pages/Classifications";
import Search from "./pages/Search";
import NewCategory from "./pages/NewCategory";
import Invoice from "./pages/Invoice";
import axios from "axios";
import * as React from "react";
import ViewMedia from "./pages/ViewMedia";
import Withdraw from "./pages/Withdraw";
import ViewProduct from "./pages/ViewProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Loading from "./pages/Loading";
import Company_reg from "./pages/Company_reg";
import Company_Login from "./pages/Company_Login";
import CharbotServices from "./pages/CharbotServices";
import PServices from "./pages/PServices";
import Contract from "./pages/Contract";
import Deals from "./pages/Deals";
import Wallets from "./pages/Wallets";
import Bankaccounts from "./pages/Bankaccounts";
import Loyality_Points from "./pages/Loyality_Points";
import Ads from "./pages/Ads";
import Traders from "./pages/Traders";
import Jobs from "./pages/Jobs";
import Compilance from "./pages/Compilance";
import Profile from "./pages/Profile";

//Axios allow auth
axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();

  //Check login
  // async function checkLogin() {
  //   await axios
  //     .post(`${process.env.REACT_APP_BACKEND_URL}/login/checktoken`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       // if (res.data.islogin !== true) {
  //       //   console.log("Not logged in");
  //       //   // navigate("/login");
  //       // }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       // console.log(e.response.data);
  //       // navigate("/login");
  //     });
  // }
  const [loadingif, setLoadingif] = React.useState(true);
  const checkLogin = async () => {
    setLoadingif(true);
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/login/checktoken`, {
        withCredentials: true,
      })
      .then((res) => {
        setLoadingif(false);
        // console.log(res);
        // console.log(res.data.islogin);
        if (res.data.islogin === true) {
          navigate("/admin");
        } else {
          // setTimeout(() => {
          //   navigate("/login");
          // }, [2000]);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoadingif(false);
        // setTimeout(() => {
        //   navigate("/login");
        // }, [2000]);
      });
  };

  React.useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="App">
      {loadingif != false ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/company_reg" element={<Company_reg />} />
          <Route path="/register" element={<Register />} />
          <Route path="/company_login" element={<Company_Login />} />

          <Route path="/admin" element={<MiniDrawer />}>
            <Route path="" element={<Dashboard />} />

            <Route path="account" element={<Account />} />
            <Route path="new-account" element={<AddProduct />} />

            <Route path="categories" element={<Categories />} />
            <Route path="new-category" element={<NewCategory />} />

            <Route path="products" element={<Products />} />
            <Route path="new-product" element={<AddProduct />} />
            <Route path="viewproduct/:slug" element={<ViewProduct />} />
            <Route path="update/:slug" element={<UpdateProduct />} />

            <Route path="media" element={<Storage />} />
            <Route path="viewmedia" element={<ViewMedia />} />
            <Route path="withdraw" element={<Withdraw />} />
            {/*  */}
            <Route path="chatbotservice" element={<CharbotServices />} />
            <Route path="pservices" element={<PServices />} />
            <Route path="contract" element={<Contract />} />
            <Route path="deals" element={<Deals />} />
            <Route path="wallets" element={<Wallets />} />
            <Route path="bankaccounts" element={<Bankaccounts />} />
            <Route path="loyalitypoints" element={<Loyality_Points />} />
            <Route path="ads" element={<Ads />} />
            <Route path="traders" element={<Traders />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="compilance" element={<Compilance />} />

            <Route path="profile" element={<Profile />} />

            {/*  */}
            <Route path="pages" element={<Pages />} />
            <Route path="new-page" element={<AddPage />} />

            <Route path="tags" element={<Tags />} />
            <Route path="new-tag" element={<AddProduct />} />

            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="support" element={<Support />} />

            <Route path="posts" element={<Posts />} />
            <Route path="new-post" element={<AddPost />} />

            <Route path="orders" element={<Posts />} />

            <Route path="invoice" element={<Invoice />} />

            <Route path="bids" element={<Bids />} />

            <Route path="info" element={<Info />} />
            <Route path="notifications" element={<Notifications />} />

            <Route path="auctions" element={<Auctions />} />
            <Route path="points" element={<Points />} />

            <Route path="services" element={<Services />} />

            <Route path="offers" element={<Offers />} />

            <Route path="companies" element={<Companies />} />

            <Route path="commission" element={<Commission />} />

            <Route path="classifications" element={<Classifications />} />

            <Route path="search" element={<Search />} />

            {/* 404 page */}
            <Route
              path="*"
              element={
                <div
                  className="text-center"
                  style={{
                    marginTop: "20%",
                    color: "white",
                  }}
                >
                  <h1 className="text-5xl font-bold">404</h1>
                  <p className="text-2xl">Page not found</p>
                </div>
              }
            />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
