// styling component linked in bantuan.scss file

import React, { useState, useEffect } from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";
import BantuanList from "./BantuanList";
import BoxBantuanBerhasilFilter from "./BoxBantuanBerhasilFilter";
import BoxBantuanBerhasilSearch from "./BoxBantuanBerhasilSearch";

// API storage
import API from "../../api";

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
import { Formik, Field } from "formik";
import * as Yup from "yup";

const Bantuan = () => {
	const [bantuan, setBantuan] = useState([]);
	const [searchDataBantuan, setSearchDataBantuan] = useState(null);
	const [filterDataBantuan, setFilterDataBantuan] = useState(null);

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
		const response = await API.getAllBantuan();
		setBantuan(response.data);
	};

	const ShowDataBantuanByFilterAndSearch = (props) => {
		const isFilter = props.isFiltering;
		const isSearch = props.isSearching;

		if (isFilter)
			return <BoxBantuanBerhasilFilter data={filterDataBantuan} />;
		else if (isSearch)
			return <BoxBantuanBerhasilSearch data={searchDataBantuan} />;

		return <BantuanList bantuan={props.bantuan} />;
	};

	return (
		<div>
			<Navbar />

			{/* Component bantuan content */}
			<div className="bantuan">
				<h1>Bantuan Sosial Masyarakat</h1>

				{/* Search data section */}
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

							API.getBantuanByNama(validBantuan).then((res) => {
								setSearchDataBantuan(res.data);
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
									className="btn_cari_bantuan"
									type="submit"
								>
									Cari
								</Button>
							</form>
						)}
					</Formik>
				</div>
				{/* Akhir search data section */}

				<div className="bantuan_content">
					{/* Filtering data section */}
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

								API.getBantuanByKapasitas(values.kapasitas).then(
									(res) => {
										setFilterDataBantuan(res.data);
									}
								);
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
					{/* Akhir filtering data section */}

					{/* Showing data based on search and filter */}
					<div className="result_bantuan">
						{
							<ShowDataBantuanByFilterAndSearch
								isFiltering={filterDataBantuan ? true : false}
								isSearching={searchDataBantuan ? true : false}
								bantuan={bantuan}
							/>
						}
					</div>
					{/* Akhir showing data based on search and filter */}
				</div>
			</div>
			{/* Akhir component bantuan content */}

			<Footer class_bantuan="bantuan_foot" />
		</div>
	);
};

export default Bantuan;
