import * as React from "react";
import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Info from "./pages/Info";
import Account from "./pages/Account";
import Notifications from "./pages/Notifications";
import AddProduct from "./pages/AddProducts";
import AddPage from "./pages/AddPage";
import AddPost from "./pages/AddPost";
import Auctions from "./pages/Auctions";
import Points from "./pages/Points";
import Services from "./pages/Services";
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
import EditContract from "./pages/EditContract";
import EditAuctino from "./pages/EditAuctino";
import AddBankAccount from "./pages/AddBankAccount";
import Offer from "./pages/Offer";
import Bid from "./pages/Bid";
import AddBid from "./pages/AddBid";
import New_Drawer from "./components/New_Drawer";

//Axios allow auth
axios.defaults.withCredentials = true;

function App() {
  const navigate = useNavigate();

  const [loadingif, setLoadingif] = React.useState(true);

  const checkLogin = async () => {
    setLoadingif(true);
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login/check`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setLoadingif(false);
        // if (res.data.islogin === true) {
        //   navigate(window.location.pathname);
        //   if (window.location.pathname === "/") {
        //     navigate("/admin");
        //   } else {
        //     navigate(window.location.pathname);
        //   }
        // } else {
        //   navigate("/");
        // }
      })
      .catch((e) => {
        console.log(e);
        setLoadingif(false);
        // navigate("/");
      });
  };

  React.useEffect(() => {
    checkLogin();
  }, []);

  // code to get langage from the local storage and store into state variabel and then write a code to change the language of the website

  return (
    <div className="App">
      {loadingif != false ? (
        <Loading />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/company_reg" element={<Company_reg />} />
            <Route path="/register" element={<Register />} />
            <Route path="/newdrawer" element={<New_Drawer />} />
            <Route path="/company_login" element={<Company_Login />} />

            <Route path="/protected" element={<Protected />} />

            <Route path="/admin" element={<MiniDrawer />}>
              <Route path="" element={<Protected Component={Dashboard} />} />

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
              <Route path="editcontract/:id" element={<EditContract />} />

              <Route path="media" element={<Protected Component={Storage} />} />
              <Route
                path="viewmedia"
                element={<Protected Component={ViewMedia} />}
              />
              <Route
                path="addbank"
                element={<Protected Component={AddBankAccount} />}
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
              <Route
                path="wallets"
                element={<Protected Component={Wallets} />}
              />
              <Route
                path="bankaccounts"
                element={<Protected Component={Bankaccounts} />}
              />
              <Route
                path="loyalitypoints"
                element={<Protected Component={Loyality_Points} />}
              />
              <Route path="ads" element={<Protected Component={Ads} />} />
              <Route
                path="traders"
                element={<Protected Component={Traders} />}
              />
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
                path="editauctinos/:id"
                element={<Protected Component={EditAuctino} />}
              />
              <Route
                path="compilance"
                element={<Protected Component={Compilance} />}
              />

              <Route
                path="profile"
                element={<Protected Component={Profile} />}
              />

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
              <Route
                path="support"
                element={<Protected Component={Support} />}
              />

              <Route path="posts" element={<Protected Component={Posts} />} />
              <Route
                path="new-post"
                element={<Protected Component={AddPost} />}
              />

              <Route path="orders" element={<Protected Component={Posts} />} />

              <Route
                path="invoice"
                element={<Protected Component={Invoice} />}
              />

              <Route path="bids" element={<Protected Component={Bid} />} />
              <Route
                path="addbids"
                element={<Protected Component={AddBid} />}
              />

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
              <Route path="offer" element={<Protected Component={Offer} />} />

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
        </>
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
