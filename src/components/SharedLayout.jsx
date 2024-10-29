import { Outlet } from "react-router-dom";
import { Footer, Header } from "./Home";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer/>
    </>
  );
};

export default SharedLayout;
