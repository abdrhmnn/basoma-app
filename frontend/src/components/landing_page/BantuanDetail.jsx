import React, { useState, useEffect } from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";
import { kuki } from "../../kuki";

// img
import img1 from "./../../images/test.png";

// npm packages
import { useLocation, Link } from "react-router-dom";
import { Button, CircularProgress, Alert } from "@mui/material";
import { AES, enc } from "crypto-js";
import axios from "axios";

const BantuanDetail = ({ data }) => {
	const [isLoad, setIsLoad] = useState(false);
	const [bantuanById, setBantuanById] = useState();
	const [isShow, setIsShow] = useState(false);
	const location = useLocation();

	useEffect(() => {
		document.title = "Detail Bantuan";
		const params = new URLSearchParams(location.search);
		const bi = AES.decrypt(params.get("bi"), "bantuan_id").toString(enc.Utf8);
		axios.get(`http://localhost:5000/bantuan/id/${bi}`).then((res) => {
			setBantuanById(res.data);
		});
		setTimeout(() => {
			setIsLoad(true);
		}, 2000);
	}, [location]);

	return (
		<div>
			<Navbar dataBantuan="true" />
			{isLoad ? (
				<div className="alert_auth_login">
					{kuki.get("user_id") || isShow ? null : (
						<Alert
							onClose={() => {
								setIsShow(true);
							}}
							variant="outlined"
							severity="warning"
							sx={{ mb: 2, mt: 2 }}
						>
							<span style={{ fontWeight: "bold" }}>PERHATIKAN!</span>,
							silahkan login terlebih dahulu untuk bisa melakukan
							pendaftaran.
						</Alert>
					)}
					<div className="card_bantuan">
						<div className="card_detail">
							<h1>{bantuanById.nama}</h1>
							<p>
								Bantuan ini diberikan oleh <span>test</span>
							</p>
							<img src={img1} alt="Card" />
							<h2>Deskripsi</h2>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing
								elit. Unde perspiciatis amet, doloribus eos quo dicta
								fugiat. Magnam ipsum tenetur, dolorem dicta sed
								blanditiis. A nihil consequuntur placeat vel delectus
								natus.
							</p>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing
								elit. Unde perspiciatis amet, doloribus eos quo dicta
								fugiat. Magnam ipsum tenetur, dolorem dicta sed
								blanditiis. A nihil consequuntur placeat vel delectus
								natus.
							</p>
							<p>
								Lorem ipsum dolor sit amet consectetur, adipisicing
								elit. Unde perspiciatis amet, doloribus eos quo dicta
								fugiat. Magnam ipsum tenetur, dolorem dicta sed
								blanditiis. A nihil consequuntur placeat vel delectus
								natus.
							</p>
						</div>
						<div className="card_info">
							<div className="card_detail_info">
								<div className="kapasitas">
									<h2>Kapasitas</h2>
									<p>{bantuanById.kapasitas} Orang</p>
								</div>
							</div>
							<Button
								variant="contained"
								className="btn_daftar"
								component={Link}
								to="/panduan-pendaftaran"
								disabled={kuki.get("user_id") ? false : true}
							>
								Daftar
							</Button>
						</div>
					</div>
				</div>
			) : (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "80vh",
					}}
				>
					<CircularProgress />
				</div>
			)}
			<Footer
				class_bantuan_detail="bantuan_detail_foot"
				active_foot={data}
			/>
		</div>
	);
};

export default BantuanDetail;
