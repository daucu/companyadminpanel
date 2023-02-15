import React, { useState } from "react";
import axios from "axios";
import verify from "../assets/images/verify.gif";
import { useNavigate } from "react-router-dom";
function Protected({ Component }) {
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
        console.log(res.data.length);
        // setCompanyProfileData(res.data[0].data);
        // console.log(res.data[0].data.status);
        setVerified(res.data);
        if (res.data.length === 0) {
          navigate("/company_reg");
        }
      })
      .catch((e) => {
        // print the error
        console.log(e);
        console.log(e.response.data.message);
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
