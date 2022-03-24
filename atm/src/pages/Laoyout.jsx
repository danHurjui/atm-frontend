import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import BootstrapNavbar from "./BootsraptNavbar";

const Layout = () => {
        return (
                <>
                        <BootstrapNavbar />
                        <Outlet />
                </>
        );
};

export default Layout;