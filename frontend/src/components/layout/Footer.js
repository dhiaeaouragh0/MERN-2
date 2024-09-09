import React, { Fragment } from "react";
import '../../App.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Fragment>
            <footer className="footer">
                <div className="footer-content">
                    <p className="footer-text">
                        © {currentYear} - Created by AOURAGH DHIAEDDINE. All Rights Reserved.
                    </p>
                    <div className="footer-links">
                        <a href="#privacy">Privacy Policy</a>
                        <a href="#terms">Terms of Service</a>
                        <a href="#contact">Contact</a>
                    </div>
                </div>
            </footer>
        </Fragment>
    );
}

export default Footer;
