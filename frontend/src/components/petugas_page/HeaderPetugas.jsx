// styling component linked in head_petugas.scss file

import React, { useState, useEffect } from "react";

// Cookie storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

// npm packages
import { Button, Menu, MenuItem, Avatar } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

const HeaderPetugas = () => {
	const [userById, setUserById] = useState({});
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	// const navigate = useNavigate();

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		getUserById();
	}, []);

	const getUserById = async () => {
		const response = await API.getUserByID(kuki.get("user_id"));
		setUserById(response.data);
	};

	return (
		<div className="head_petugas">
			<div className="nav_profile_petugas">
				<Button
					id="basic-button"
					aria-controls={open ? "basic-menu" : undefined}
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					onClick={(e) => setAnchorEl(e.currentTarget)}
				>
					<Avatar
						alt="Foto Profile"
						src={
							userById.gambar
								? userById.gambar === "default_img.svg"
									? `http://localhost:5000/public/${userById.gambar}`
									: `http://localhost:5000/public/user/${userById.gambar}`
								: "blank_img.png"
						}
					/>
					<MdKeyboardArrowDown
						size={20}
						style={{ marginLeft: 5, color: "rgb(117, 117, 117)" }}
					/>
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
					// onClick={() => {
					// 	navigate("/edit-profile-admin", {
					// 		state: kuki.get("user_id"),
					// 	});
					// }}
					>
						Ubah Profile
					</MenuItem>
					<MenuItem
						onClick={() => {
							kuki.remove("petugas");
							kuki.remove("user_id");
							window.location.href = "/";
						}}
						style={{ padding: "10 15 10 15" }}
					>
						Logout
					</MenuItem>
				</Menu>
			</div>
		</div>
	);
};

export default HeaderPetugas;
