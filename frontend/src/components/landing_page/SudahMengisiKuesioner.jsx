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
	const [nilaiPrioritasByID, setNilaiPrioritasByID] = useState(null);

	useEffect(() => {
		getUserByID();
		getNilaiPrioritasByID();
	}, []);

	const getNilaiPrioritasByID = async () => {
		const response = await API.getPrioritasByUserID(kuki.get("user_id"));
		setNilaiPrioritasByID(response.data);
	};

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
					<h2>Kuesioner telah diisi sebelumnya</h2>
					{/* <p>
						Hasil pengisian kuesioner sebelumnya dengan nama{" "}
						<i>
							{userByID.nm_depan} {userByID.nm_belakang}
						</i>{" "}
						adalah <b>{nilaiPrioritasByID.total_nilai + "%"}</b>
					</p> */}
					<p>
						Batas pengisian kuesioner pendaftaran hanya satu kali, jika
						mendapatkan hasil akhir dibawah rata - rata maka tidak bisa
						melanjutkan ke tahap selanjutnya, Terima kasih
					</p>
					<Button
						variant="contained"
						component={Link}
						to="/"
						sx={{ mt: 3, mb: 4 }}
					>
						kembali ke beranda
					</Button>
				</div>
			)}
		</div>
	);
};

export default SudahMengisiKuesioner;
