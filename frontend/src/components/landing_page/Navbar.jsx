import React, { useState, useEffect } from "react";

// components or files
import { kuki } from "../../kuki";

// npm packages
import { NavLink, useNavigate, createSearchParams } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AES } from "crypto-js";
import axios from "axios";

const Navbar = (props) => {
	const [userById, setUserById] = useState([]);
	const [isShow, setIsShow] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();
	const open = Boolean(anchorEl);
	const encrypt = AES.encrypt(kuki.get("user_id"), "abdu");
	// const decryptUserId = AES.decrypt(params.get("ui"), "abdu").toString(enc.Utf8)

	useEffect(() => {
		getUserById();
	}, []);

	const getUserById = async () => {
		const response = await axios.get(
			`http://localhost:5000/users/${kuki.get("user_id")}`
		);
		setUserById(response.data);
	};

	const handleClick = () => {
		setIsShow(!isShow);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<nav className="nav">
			<h3>Basoma</h3>
			<ul className={isShow ? "isShow" : ""}>
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
								Hi, {userById.username}{" "}
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
			</ul>
			<div className="hamburger-menu">
				<input
					type="checkbox"
					name="checkbox"
					id="checkbox"
					onChange={handleClick}
					checked={isShow ? true : false}
				/>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</nav>
	);
};

export default Navbar;
