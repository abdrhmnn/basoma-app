import React, { useState, useEffect } from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";
import BantuanList from "./BantuanList";
import BoxBantuanBerhasilFilter from "./BoxBantuanBerhasilFilter";
import BoxBantuanBerhasilSearch from "./BoxBantuanBerhasilSearch";

// npm packages
import {
	TextField,
	Button,
	Radio,
	RadioGroup,
	FormControl,
	FormControlLabel,
	FormLabel,
} from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";
import axios from "axios";
import { Formik, Field } from "formik";
import * as Yup from "yup";

const Bantuan = () => {
	const [bantuan, setBantuan] = useState([]);
	const [validShowBantuan, setValidShowBantuan] = useState();
	const [dataFilter, setDataFilter] = useState();
	const navigate = useNavigate();

	const schemaSearching = Yup.object({
		cari: Yup.string(),
	});

	const schemaFiltering = Yup.object({
		kapasitas: Yup.string(),
	});

	useEffect(() => {
		document.title = "Cari Bantuan";
		getAllBantuan();
	}, []);

	const getAllBantuan = async () => {
		const response = await axios.get("http://localhost:5000/bantuan");
		setBantuan(response.data);
	};

	const ShowBantuanByFilter = (props) => {
		const isFilter = props.isFiltering;
		const isSearch = props.isSearching;

		if (isFilter) return <BoxBantuanBerhasilFilter data={dataFilter} />;
		else if (isSearch)
			return <BoxBantuanBerhasilSearch data={validShowBantuan} />;

		return <BantuanList bantuan={props.bantuan} />;
	};

	return (
		<div>
			<Navbar />
			<div className="bantuan">
				<h1>Bantuan Sosial Masyarakat</h1>
				<div className="search_bantuan">
					<Formik
						initialValues={{ cari: "" }}
						validationSchema={schemaSearching}
						onSubmit={(values, actions) => {
							let namaBantuan = [];
							bantuan.map((e, i) => namaBantuan.push(e.nama));
							const validBantuan = namaBantuan.find(
								(e) => e === values.cari
							);
							navigate({
								search: `?${createSearchParams({
									s: validBantuan ? validBantuan : "",
								}).toString()}`,
							});

							axios
								.get(`http://localhost:5000/bantuan/${validBantuan}`)
								.then(function (response) {
									setValidShowBantuan(response.data);
								});
						}}
					>
						{(props) => (
							<form onSubmit={props.handleSubmit}>
								<Field
									name="cari"
									variant="outlined"
									label="Cari Bantuan"
									as={TextField}
									error={
										props.touched.cari && props.errors.cari
											? true
											: false
									}
									helperText={props.touched.cari && props.errors.cari}
								/>
								<Button
									variant="contained"
									className="btn_cari"
									type="submit"
								>
									Cari
								</Button>
							</form>
						)}
					</Formik>
				</div>
				<div className="bantuan_content">
					<div className="filtering_bantuan">
						<h2>Cari Berdasarkan</h2>
						<Formik
							initialValues={{ kapasitas: "" }}
							validationSchema={schemaFiltering}
							onSubmit={(values, actions) => {
								navigate({
									search: `?${createSearchParams({
										kapasitas: values.kapasitas,
									}).toString()}`,
								});

								axios
									.get(
										`http://localhost:5000/bantuan/kapasitas/${values.kapasitas}`
									)
									.then((res) => {
										setDataFilter(res.data);
									});
							}}
						>
							{(props) => (
								<form onSubmit={props.handleSubmit}>
									<FormControl component="fieldset">
										<FormLabel component="legend">
											Kapasitas
										</FormLabel>
										<RadioGroup
											row
											name="kapasitas"
											onChange={props.handleChange}
										>
											<FormControlLabel
												value="50"
												control={<Radio />}
												label="50"
											/>
											<FormControlLabel
												value="100"
												control={<Radio />}
												label="100"
											/>
										</RadioGroup>
									</FormControl>
									<Button
										variant="contained"
										sx={{ mt: 3 }}
										type="submit"
									>
										Submit
									</Button>
								</form>
							)}
						</Formik>
					</div>
					<div className="result_bantuan">
						{
							<ShowBantuanByFilter
								isFiltering={dataFilter ? true : false}
								isSearching={validShowBantuan ? true : false}
								bantuan={bantuan}
							/>
						}
					</div>
				</div>
			</div>
			<Footer class_bantuan="bantuan_foot" />
		</div>
	);
};

export default Bantuan;
