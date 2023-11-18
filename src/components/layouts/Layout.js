//layout.js
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./layout.scss";
const DefaultLayout = () => {
  return (
    <>
      <Header />

      <div className="container">
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
