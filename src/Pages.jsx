import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Wtfamidoin from "./Wtfamidoin";
// import App from "./App";

const Pages = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/main"} element={<Wtfamidoin />} />
        <Route path={"/"} element={<Login />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Router>
  );
};

export default Pages;
