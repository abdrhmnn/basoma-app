import React from "react";

// npm packages
import { NavLink } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { FaRegHandshake } from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { AiOutlineDatabase } from "react-icons/ai";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

const NavbarAdmin = ({ dataTambahBantuan }) => {
    return(
        <div className="nav_admin">
            <div className="wrap_nav_admin">
                <div className="logo_admin">
                    <h2>Basoma</h2>
                </div>
                <div className="nav_menu_admin">
                    <NavLink
                        exact="true"
                        to="/dashboard"
                        className={({ isActive }) => (isActive ? 'active' : 'unselected')}
                    >
                        <div className="menu_item">
                            <div className="menu_item_logo">
                                <RiDashboard3Line size={20} />
                            </div>
                            <div className="menu_item_text">
                                <p>Dashboard</p>
                            </div>
                        </div>
                    </NavLink>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<MdExpandMore size={23}/>}
                            aria-controls="panelia-content"
                            id="panel1a-header"
                        >
                            <div className="menu_item_dropdown">
                                <div className="menu_item_logo_dropdown">
                                    <AiOutlineDatabase size={20} />
                                </div>
                                <div className="menu_item_text_dropdown">
                                    <p>Data</p>
                                </div>
                            </div>
                        </AccordionSummary>
                        <NavLink
                            exact="true"
                            to="/user"
                            className={({ isActive }) => (isActive ? 'active' : 'unselected')}
                        >
                            <AccordionDetails>
                                <div className="menu_item_dropdown">
                                    <div className="menu_item_logo_dropdown">
                                        <FiUsers size={20} />
                                    </div>
                                    <div className="menu_item_text_dropdown">
                                        <p>User</p>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </NavLink>
                        <NavLink
                            exact="true"
                            to="/kelola-bantuan"
                            className={({ isActive }) => (isActive || dataTambahBantuan ? 'active' : 'unselected')}
                            >
                                <AccordionDetails>
                                <div className="menu_item_dropdown">
                                    <div className="menu_item_logo_dropdown">
                                        <FaRegHandshake size={20} />
                                    </div>
                                    <div className="menu_item_text_dropdown">
                                        <p>Bantuan</p>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </NavLink>
                    </Accordion>
                    <NavLink
                        exact="true"
                        to="/asdasda"
                        className={({ isActive }) => (isActive ? 'active' : 'unselected')}
                    >
                        <div className="menu_item">
                            <div className="menu_item_logo">
                                <FiUsers size={20} />
                            </div>
                            <div className="menu_item_text">
                                <p>User</p>
                            </div>
                        </div>
                    </NavLink>
                </div>
            </div>
            <div className="nav_foot">
                <p>Created by. Team JAI</p>
            </div>
        </div>
    )
}

export default NavbarAdmin