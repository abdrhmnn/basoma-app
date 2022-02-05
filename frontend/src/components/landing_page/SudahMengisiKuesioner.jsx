import React, { useState, useEffect } from "react";

// files
import { kuki } from "../../kuki";

// img
import feel_sorry from "../../images/feeling_sorry.svg";

// npm packages
import axios from "axios";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SudahMengisiKuesioner = () => {
	const [userById, setUserById] = useState(null);
	const [nilaiPrioritasById, setNilaiPrioritasById] = useState(null);

	useEffect(() => {
		getUserById();
		getNilaiPrioritasByID();
	}, []);

	const getNilaiPrioritasByID = async () => {
		const response = await axios.get(
			`http://localhost:5000/nilai-prioritas/${kuki.get("user_id")}`
		);
		setNilaiPrioritasById(response.data);
	};

	const getUserById = async () => {
		const response = await axios.get(
			`http://localhost:5000/users/${kuki.get("user_id")}`
		);
		setUserById(response.data);
	};
	return (
		<div className="sudah_mengisi">
			<div className="sudah_title">
				<h2>Basoma</h2>
			</div>
			{userById && nilaiPrioritasById && (
				<div className="sudah_content">
					<img
						src={feel_sorry}
						alt="Maaf tidak bisa mengisi kuesioner lagi"
						width={350}
					/>
					<h2>Kuesioner telah diisi sebelumnya</h2>
					<p>
						Hasil pengisian kuesioner sebelumnya dengan nama{" "}
						<i>
							{userById.nm_depan} {userById.nm_belakang}
						</i>{" "}
						adalah <b>{nilaiPrioritasById.total_nilai + "%"}</b>
					</p>
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
