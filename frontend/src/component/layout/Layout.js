import React from "react";
import "../../style.css";
import Menu from "../menu/Menu";
import Footer from "../../pages/footer/Footer";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Menu/>
        <div className="jumbotron" style={{"padding" : "50px"}}>
            <h2 >{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
    
    <Footer className="mt-4" />
    </div>
);

export default Layout;