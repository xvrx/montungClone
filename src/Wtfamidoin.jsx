import React, { useEffect, useState } from "react";
import Loader from "./Components/Loader/Loader";
import { Navigate } from "react-router-dom";

import loadable from "@loadable/component";
import axios from "axios";
axios.defaults.withCredentials = true;

const App = loadable(() => import("./App"), {
  fallback: <Loader />,
});

// async function initiateLogin() {
//   try {
//     const result = await axios.get("http://localhost:2000/api/user/verify", {
//       withCredentials: true,
//     });
//     console.log(result?.data?.stat);
//     return result?.data?.stat;
//   } catch (error) {
//     console.log(error.response.data.stat);
//     return error?.response?.data?.stat;
//   }
// }

const Wtfamidoin = () => {
  // const server0 = "http://localhost:2000/";
  const server0 = "http://192.168.1.2:2000/";

  const [loading, setloading] = useState(null);
  useEffect(() => {
    axios
      .get(server0 + "api/user/verify", {
        withCredentials: true,
      })
      .then((resp) => {
        console.log("axios resolve", resp);
        if (resp?.data?.stat === true) {
          setloading(true);
        }
      })
      .catch((err) => {
        console.log("axios error :", err.response);
        if (err?.response?.data?.stat === false) {
          setloading(false);
        }
      });
  }, []);

  if (loading === null) {
    return <Loader />;
  } else if (loading === false) {
    return <Navigate to={"/"} />;
  } else if (loading === true) {
    // return <Loader />;
    return <App />;
  }
  // if (initiateLogin() === true) return () => <App />;
  // if (initiateLogin() !== true) return <Navigate to={"/"} />;
};

export default Wtfamidoin;
