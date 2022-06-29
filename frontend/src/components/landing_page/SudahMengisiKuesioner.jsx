// styling component linked in sudah_mengisi_kuesioner.scss file

import React, { useState, useEffect } from "react";

// Cookie storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

// img
import feel_sorry from "../../images/feeling_sorry.svg";

// npm packages
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SudahMengisiKuesioner = () => {
	const [userByID, setUserByID] = useState(null);

	useEffect(() => {
		getUserByID();
	}, []);

	const getUserByID = async () => {
		const response = await API.getUserByID(kuki.get("user_id"));
		setUserByID(response.data);
	};
	return (
		<div className="sudah_mengisi">
			<div className="sudah_title">
				<h2>Basoma</h2>
			</div>
			{userByID && (
				<div className="sudah_content">
					<img
						src={feel_sorry}
						alt="Maaf tidak bisa mengisi kuesioner lagi"
					/>
					<h2>Anda sudah mendaftar bantuan sosial sebelumnya!</h2>
					<p>
						Batas pendaftaran hanya satu kali, Anda tidak bisa lagi
						mendaftar bantuan sosial, silahkan menunggu hasil keputusan
						yang akan ditampilkan <Link to="/pemberitahuan">disini</Link>,
						Terima kasih.
					</p>
					<Button
						variant="contained"
						component={Link}
						to="/"
						sx={{ mt: 2, mb: 4, fontWeight: "bold" }}
					>
						kembali ke beranda
					</Button>
				</div>
			)}
		</div>
	);
};

export default SudahMengisiKuesioner;
