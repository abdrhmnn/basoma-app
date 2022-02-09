// styling component linked in navbar.scss file

import React, { useState, useEffect } from "react";

// Cookie storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

// npm packages
import { NavLink, useNavigate, createSearchParams } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AES } from "crypto-js";

const Navbar = (props) => {
	const [userByID, setUserByID] = useState([]);
	const [isShowMobileNavbar, setIsShowMobileNavbar] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const navigate = useNavigate();
	const open = Boolean(anchorEl);
	const encrypt = AES.encrypt(kuki.get("user_id"), "userID");

	useEffect(() => {
		getUserByID();
	}, []);

	const getUserByID = async () => {
		const response = await API.getUserByID(kuki.get("user_id"));
		setUserByID(response.data);
	};

	const handleClick = () => {
		setIsShowMobileNavbar(!isShowMobileNavbar);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<nav className="nav">
			<h3>Basoma</h3>
			{/* Navbar content */}
			<ul className={isShowMobileNavbar ? "isShow" : ""}>
				<li>
					<NavLink
						exact="true"
						to="/"
						className={({ isActive }) =>
							isActive ? "active" : "unselected"
						}
					>
						Beranda
					</NavLink>
				</li>
				<li>
					<NavLink
						exact="true"
						to="/bantuan"
						className={({ isActive }) =>
							isActive || props.dataBantuan ? "active" : "unselected"
						}
					>
						Bantuan
					</NavLink>
				</li>
				<li>
					<NavLink
						exact="true"
						to="/tentang"
						className={({ isActive }) =>
							isActive || props.data ? "active" : "unselected"
						}
					>
						Tentang
					</NavLink>
				</li>

				{/* Navbar active when user login */}
				<li>
					{kuki.get("user_id") ? (
						<div className="menu_akun">
							<Button
								id="basic-button"
								aria-controls={open ? "basic-menu" : undefined}
								aria-haspopup="true"
								aria-expanded={open ? "true" : undefined}
								onClick={(e) => setAnchorEl(e.currentTarget)}
							>
								Hi, {userByID.username}{" "}
								<MdKeyboardArrowDown style={{ marginLeft: 5 }} />
							</Button>
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									"aria-labelledby": "basic-button",
								}}
							>
								<MenuItem
									onClick={() => {
										navigate({
											pathname: "/edit-profile",
											search: `?${createSearchParams({
												ui: encrypt,
											}).toString()}`,
										});
									}}
								>
									Ubah Profile
								</MenuItem>
								<MenuItem
									onClick={() => {
										kuki.remove("user_id");
										window.location.href = "/";
									}}
								>
									Logout
								</MenuItem>
							</Menu>
						</div>
					) : (
						<NavLink exact="true" to="/login" className="login">
							Masuk
						</NavLink>
					)}
				</li>
				{/* Akhir navbar active when user login */}
			</ul>
			{/* Akhir navbar content */}

			{/* Hamburger menu */}
			<div className="hamburger-menu">
				<input
					type="checkbox"
					name="checkbox"
					id="checkbox"
					onChange={handleClick}
					checked={isShowMobileNavbar ? true : false}
				/>
				<span></span>
				<span></span>
				<span></span>
			</div>
			{/* Akhir hamburger menu */}
		</nav>
	);
};

export default Navbar;
