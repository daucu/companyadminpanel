import React, { useState } from "react";
import axios from "axios";
import verify from "../assets/images/verify.gif";
function Protected({ Component }) {
  const [companyProfileData, setCompanyProfileData] = React.useState([]);
  const [verified, setVerified] = useState([]);

  const getCompanyProfileData = async () => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/profile/company`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setCompanyProfileData(res.data[0].data);
        setVerified(res.data[0].data.isVerified);
        console.log(res.data[0].data.isVerified);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  React.useEffect(() => {
    getCompanyProfileData();
  }, []);
  return (
    <div>
      {verified === true ? (
        <Component />
      ) : (
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
      )}
    </div>
  );
}

export default Protected;
