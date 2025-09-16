import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <React.Fragment>
      <Header />
      <main className="container mx-auto px-6 my-[12vh] z-10">
        <Outlet />
      </main>
      <Footer />
    </React.Fragment>
  );
};
