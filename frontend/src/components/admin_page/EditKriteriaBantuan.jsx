// styling component linked in edit-kriteria-bantuan.scss file

import React, { useState } from "react";

// components
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

// API storage
import API from "../../api";

// npm packages
import {
	TextField,
	Button,
	InputLabel,
	Select,
	FormControl,
	MenuItem,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import { useLocation, Link } from "react-router-dom";
import swal from "sweetalert";

const EditKriteriaBantuan = () => {
	const [nilaiBobot, setNilaiBobot] = useState("");

	const location = useLocation();

	const schemaEditKriteria = Yup.object({
		nama: Yup.string().required("Nama kriteria tidak boleh kosong!"),
	});

	return (
		<div style={{ display: "flex" }}>
			<NavbarAdmin />
			<div className="flex_header_admin">
				<HeaderAdmin />
				<div className="content_dashboard_admin">
					<h2>Edit Kriteria Bantuan</h2>
					<div className="wrap_form_edit_kriteria">
						<Formik
							initialValues={{ nama: "" }}
							validationSchema={schemaEditKriteria}
							onSubmit={(values, actions) => {
								API.updateKriteriaByID(location.state, {
									nama: values.nama,
									nilai_bobot: nilaiBobot,
									nilai_prioritas: 0,
								}).then((res) => {
									swal("Kriteria berhasil diubah!", {
										icon: "success",
									}).then(() => {
										window.location.href = "/kriteria-bantuan";
									});
								});
							}}
						>
							{(props) => (
								<form onSubmit={props.handleSubmit}>
									<Field
										name="nama"
										variant="outlined"
										label="Nama Kriteria"
										autoComplete="off"
										as={TextField}
										error={
											props.touched.nama && props.errors.nama
												? true
												: false
										}
										helperText={
											props.touched.nama && props.errors.nama
										}
									/>
									<FormControl fullWidth sx={{ mt: 3, mb: 3 }}>
										<InputLabel id="nilai_bobot">
											Nilai Bobot
										</InputLabel>
										<Select
											labelId="nilai_bobot"
											id="nilai_bobot"
											value={nilaiBobot}
											label="Nilai Bobot"
											onChange={(e) => {
												setNilaiBobot(e.target.value);
											}}
										>
											<MenuItem value={1}>
												1 - Nilai ini memiliki nilai kepentingan
												yang paling rendah
											</MenuItem>
											<MenuItem value={2}>
												2 - Nilai ini merupakan nilai kepentingan
												diantara 2 nilai yang saling berdekatan
											</MenuItem>
											<MenuItem value={3}>
												3 - Nilai ini merupakan nilai yang penting
												daripada nilai bobot dibawahnya
											</MenuItem>
											<MenuItem value={4}>
												4 - Nilai ini merupakan nilai kepentingan
												diantara 2 nilai yang saling berdekatan
											</MenuItem>
											<MenuItem value={5}>
												5 - Nilai ini merupakan nilai yang cukup
												penting daripada nilai bobot dibawahnya
											</MenuItem>
											<MenuItem value={6}>
												6 - Nilai ini merupakan nilai kepentingan
												diantara 2 nilai yang saling berdekatan
											</MenuItem>
											<MenuItem value={7}>
												7 - Nilai ini merupakan nilai lebih penting
												daripada nilai bobot dibawahnya
											</MenuItem>
											<MenuItem value={8}>
												8 - Nilai ini merupakan nilai kepentingan
												diantara 2 nilai yang saling berdekatan
											</MenuItem>
											<MenuItem value={9}>
												9 - Nilai ini merupakan nilai yang paling
												penting daripada nilai bobot lainnya
											</MenuItem>
										</Select>
									</FormControl>
									<Button
										variant="contained"
										sx={{
											p: 1,
											fontWeight: "bold",
											mt: 1,
										}}
										type="submit"
									>
										ubah
									</Button>
									<Button
										variant="contained"
										color="error"
										component={Link}
										to="/kriteria-bantuan"
										sx={{
											p: 1,
											fontWeight: "bold",
											mt: 2,
										}}
									>
										batal
									</Button>
								</form>
							)}
						</Formik>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditKriteriaBantuan;
