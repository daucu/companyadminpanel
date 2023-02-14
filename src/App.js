import * as React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";

import MiniDrawer from "./components/Drawer";
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
import AddServices from "./pages/AddServices";
import CreateContract from "./pages/CreateContract";
import AddAuction from "./pages/AddAuction";
import Protected from "./pages/Protected";
import Complaints from "./pages/Complaints";
import AddComplaints from "./pages/AddComplaints";

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
          <Route path="/protected" element={<Protected />} />

          <Route path="/admin" element={<MiniDrawer />}>
            <Route path="" element={<Dashboard />} />

            <Route path="account" element={<Account />} />
            <Route path="new-account" element={<AddProduct />} />
            <Route
              path="categories"
              element={<Protected Component={Categories} />}
            />
            <Route
              path="new-category"
              element={<Protected Component={NewCategory} />}
            />

            <Route
              path="products"
              element={<Protected Component={Products} />}
            />
            <Route
              path="new-product"
              element={<Protected Component={AddProduct} />}
            />
            <Route
              path="viewproduct/:id"
              element={<Protected Component={ViewProduct} />}
            />
            <Route path="update/:id" element={<UpdateProduct />} />

            <Route path="media" element={<Protected Component={Storage} />} />
            <Route
              path="viewmedia"
              element={<Protected Component={ViewMedia} />}
            />
            <Route
              path="withdraw"
              element={<Protected Component={Withdraw} />}
            />
            {/*  */}
            <Route
              path="chatbotservice"
              element={<Protected Component={CharbotServices} />}
            />
            <Route
              path="pservices"
              element={<Protected Component={PServices} />}
            />
            <Route
              path="contract"
              element={<Protected Component={Contract} />}
            />
            <Route path="deals" element={<Protected Component={Deals} />} />
            <Route path="wallets" element={<Protected Component={Wallets} />} />
            <Route
              path="bankaccounts"
              element={<Protected Component={Bankaccounts} />}
            />
            <Route
              path="loyalitypoints"
              element={<Protected Component={Loyality_Points} />}
            />
            <Route path="ads" element={<Protected Component={Ads} />} />
            <Route path="traders" element={<Protected Component={Traders} />} />
            <Route path="jobs" element={<Protected Component={Jobs} />} />
            <Route
              path="addservices"
              element={<Protected Component={AddServices} />}
            />
            <Route
              path="createcontract"
              element={<Protected Component={CreateContract} />}
            />
            <Route
              path="addauctinos"
              element={<Protected Component={AddAuction} />}
            />
            <Route
              path="compilance"
              element={<Protected Component={Compilance} />}
            />

            <Route path="profile" element={<Protected Component={Profile} />} />

            {/*  */}
            <Route path="pages" element={<Protected Component={Pages} />} />
            <Route
              path="new-page"
              element={<Protected Component={AddPage} />}
            />

            <Route path="tags" element={<Protected Component={Tags} />} />
            <Route
              path="new-tag"
              element={<Protected Component={AddProduct} />}
            />

            <Route path="users" element={<Protected Component={Users} />} />
            <Route
              path="settings"
              element={<Protected Component={Settings} />}
            />
            <Route path="support" element={<Protected Component={Support} />} />

            <Route path="posts" element={<Protected Component={Posts} />} />
            <Route
              path="new-post"
              element={<Protected Component={AddPost} />}
            />

            <Route path="orders" element={<Protected Component={Posts} />} />

            <Route path="invoice" element={<Protected Component={Invoice} />} />

            <Route path="bids" element={<Protected Component={Bids} />} />

            <Route path="info" element={<Protected Component={Info} />} />
            <Route
              path="notifications"
              element={<Protected Component={Notifications} />}
            />

            <Route
              path="auctions"
              element={<Protected Component={Auctions} />}
            />
            <Route path="points" element={<Protected Component={Points} />} />

            <Route
              path="services"
              element={<Protected Component={Services} />}
            />

            <Route path="offers" element={<Protected Component={Offers} />} />

            <Route
              path="companies"
              element={<Protected Component={Companies} />}
            />

            <Route
              path="commission"
              element={<Protected Component={Commission} />}
            />

            <Route
              path="classifications"
              element={<Protected Component={Classifications} />}
            />

            <Route path="search" element={<Protected Component={Search} />} />
            <Route
              path="addcomplaints"
              element={<Protected Component={AddComplaints} />}
            />
            <Route
              path="complaints"
              element={<Protected Component={Complaints} />}
            />

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
