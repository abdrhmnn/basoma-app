// styling component linked in navbar_petugas.scss file

import React from "react";

// npm packages
import { NavLink } from "react-router-dom";
import { RiDashboard3Line } from "react-icons/ri";
import { MdAssignmentInd } from "react-icons/md";

const NavbarPetugas = () => {
	return (
		<div className="nav_petugas">
			<div className="wrap_nav_petugas">
				<div className="logo_petugas">
					<h2>Basoma</h2>
				</div>
				<div className="nav_menu_petugas">
					<NavLink
						exact="true"
						to="/dashboard-petugas"
						className={({ isActive }) =>
							isActive ? "active" : "unselected"
						}
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
					<NavLink
						exact="true"
						to="/pendaftaran-bantuan-petugas"
						className={({ isActive }) =>
							isActive ? "active" : "unselected"
						}
					>
						<div className="menu_item">
							<div className="menu_item_logo">
								<MdAssignmentInd size={20} />
							</div>
							<div className="menu_item_text">
								<p>Pendaftaran</p>
							</div>
						</div>
					</NavLink>
				</div>
			</div>
			<div className="nav_foot">
				<p>Created by. Team JAI</p>
			</div>
		</div>
	);
};

export default NavbarPetugas;
