import React, { useState } from "react";
import axios from "axios";
import verify from "../assets/images/verify.gif";
import { useNavigate } from "react-router-dom";
function Protected({ Component }) {
  const [userLoginValue, setUserLoginValue] = useState(false);
  const [userdata, setUserdata] = useState("username");
  const checkLogin = async () => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/login/check`, {
        withCredentials: true,
      })
      .then((res) => {
        setUserLoginValue(res.data.islogin);
        setUserdata(res.data.user);
        if (res.data.islogin === true) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        navigate("/");
      });
  };

  React.useEffect(() => {
    checkLogin();
  }, []);

  const [companyProfileData, setCompanyProfileData] = React.useState([]);
  const [verified, setVerified] = useState([]);
  const navigate = useNavigate();
  const getCompanyProfileData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies/my`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(res.data.length);

        setVerified(res.data);
        if (res.data.length === 0) {
          navigate("/company_reg");
        }
      })
      .catch((e) => {
        // print the error
        console.log(e);
      });
  };
  React.useEffect(() => {
    getCompanyProfileData();
  }, []);
  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
