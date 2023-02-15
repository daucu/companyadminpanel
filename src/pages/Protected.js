import React, { useState } from "react";
import axios from "axios";
import verify from "../assets/images/verify.gif";
function Protected({ Component }) {
  const [companyProfileData, setCompanyProfileData] = React.useState([]);
  const [verified, setVerified] = useState([]);

  const getCompanyProfileData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/companies/my-companies`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        // setCompanyProfileData(res.data[0].data);
        // console.log(res.data[0].data.status);
        setVerified(res.data[0].data.status);
      })
      .catch((e) => {
        // print the error
        console.log(e.response.data.message);
      });
  };
  React.useEffect(() => {
    getCompanyProfileData();
  }, []);
  return (
    <div>
      {verified === "active" ? (
        <>
          <div
            style={{
              display: "flex",

              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              minHeight: "80vh",
            }}
          >
            <div
              style={{
                fontSize: "22px",
                padding: "70px 0px",
                fontWeight: "semibold",
              }}
            >
              Your account is under verification. Please wait for a while.
            </div>
            <div
              style={{
                height: "300px",
                width: "300px",
              }}
            >
              <img
                src={verify}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
                alt="verify"
              />
            </div>
          </div>
        </>
      ) : (
        <Component />
      )}
    </div>
  );
}

export default Protected;
