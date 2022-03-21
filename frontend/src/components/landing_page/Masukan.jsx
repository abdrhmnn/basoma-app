// styling component linked in masukan.scss file

import React, { useEffect, useState } from "react";

// components
import Navbar from "./Navbar";
import SuccessFeedback from "./SuccessFeedback";
import Footer from "./Footer";

// Cookie storage
import kuki from "../../kuki";

// API storage
import API from "../../api";

// npm packages
import { TextField, Button, Alert } from "@mui/material";
import * as Yup from "yup";
import { Formik, Field } from "formik";

const Masukan = ({ data }) => {
	const [masukan, setMasukan] = useState([]);
	const [isSubmitMasukan, setIsSubmitMasukan] = useState(true);

	const schemaSubmitMasukan = Yup.object({
		nm_depan: Yup.string().required("Nama depan tidak boleh kosong!"),
		nm_belakang: Yup.string().required("Nama belakang tidak boleh kosong!"),
		pesan: Yup.string().required("Silahkan isi pesan terlebih dahulu!"),
	});

	useEffect(() => {
		document.title = "Masukan Bantuan Sosial Masyarakat";
		getAllMasukan();
	}, []);

	const getAllMasukan = async () => {
		const response = await API.getAllMasukan();
		setMasukan(response.data);
	};

	return (
		<div>
			<Navbar data="true" />

			{/* Masukan component content */}
			{isSubmitMasukan ? (
				<div className="masukan">
					{/* Alert validasi login */}
					{kuki.get("user_id") ? null : (
						<Alert
							variant="outlined"
							severity="warning"
							sx={{ mb: 2 }}
							className="alert_masukan"
						>
							<span style={{ fontWeight: "bold" }}>PERHATIKAN!</span>,
							silahkan login terlebih dahulu untuk bisa mengisi form
							feedback.
						</Alert>
					)}
					{/* Akhir alert validasi login */}

					<h2>Feedback Bantuan Sosial Masyarakat</h2>

					{/* Form pengisian masukan */}
					<div className="feed-form">
						<Formik
							initialValues={{
								id_masukan: "",
								nm_depan: "",
								nm_belakang: "",
								pesan: "",
								user_id: "",
							}}
							validationSchema={schemaSubmitMasukan}
							onSubmit={(values, actions) => {
								if (kuki.get("user_id")) {
									API.saveMasukan(
										values,
										masukan.length + 1,
										kuki.get("user_id")
									);
								} else {
									return;
								}
								setIsSubmitMasukan(false);
							}}
						>
							{(props) => (
								<form onSubmit={props.handleSubmit}>
									<Field
										name="nm_depan"
										variant="outlined"
										label="Nama Depan"
										autoComplete="off"
										as={TextField}
										error={
											props.touched.nm_depan && props.errors.nm_depan
												? true
												: false
										}
										helperText={
											props.touched.nm_depan && props.errors.nm_depan
										}
									/>
									<Field
										name="nm_belakang"
										variant="outlined"
										label="Nama Belakang"
										autoComplete="off"
										as={TextField}
										error={
											props.touched.nm_belakang &&
											props.errors.nm_belakang
												? true
												: false
										}
										helperText={
											props.touched.nm_belakang &&
											props.errors.nm_belakang
										}
									/>
									<Field
										name="pesan"
										variant="outlined"
										label="Pesan Feedback"
										autoComplete="off"
										multiline
										rows={6}
										as={TextField}
										error={
											props.touched.pesan && props.errors.pesan
												? true
												: false
										}
										helperText={
											props.touched.pesan && props.errors.pesan
										}
									/>
									<Button
										variant="contained"
										sx={{
											p: 2,
											fontWeight: "bold",
										}}
										type="submit"
										disabled={kuki.get("user_id") ? false : true}
									>
										Kirim
									</Button>
								</form>
							)}
						</Formik>
					</div>
					{/* Akhir form pengisian masukan */}
				</div>
			) : (
				<SuccessFeedback />
			)}
			{/* Akhir masukan component content */}

			<Footer class_masukan="masukan_foot" active_masukan={data} />
		</div>
	);
};

export default Masukan;
