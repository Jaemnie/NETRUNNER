import React from "react";
import "./MainPage.css"
const MainComponents=({children})=>{
    return (
    <main>
        <nav className="main-menu">
            <h1>App</h1>
            <ul>
                <li className="nav-item active">
                    <b></b>
                    <b></b>
                    <a href="#">
                        <i className="fa fa-house nav-icon"></i>
                        <span className="nav-text">Home</span>
                    </a>
                </li>
                <li className="nav-item">
                    <b></b>
                    <b></b>
                    <a href="#">
                        <i className="fa fa-user nav-icon"></i>
                        <span className="nav-text">Profile</span>
                    </a>
                </li>

                <li className="nav-item">
                    <b></b>
                    <b></b>
                    <a href="#">
                        <i className="fa fa-calendar-check nav-icon"></i>
                        <span className="nav-text">Schedule</span>
                    </a>
                </li>

                <li className="nav-item">
                    <b></b>
                    <b></b>
                    <a href="#">
                        <i className="fa fa-person-running nav-icon"></i>
                        <span className="nav-text">Activities</span>
                    </a>
                </li>

                <li className="nav-item">
                    <b></b>
                    <b></b>
                    <a href="#">
                        <i className="fa fa-sliders nav-icon"></i>
                        <span className="nav-text">Settings</span>
                    </a>
                </li>
            </ul>
        </nav>
        <section className="content">
            {children}
        </section>
    </main>
    );
};
export default MainComponents;