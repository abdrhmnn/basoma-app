// styling component linked in bantuan.scss file

import React, { useState, useEffect } from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

// API storage
import API from "../../api";

// npm packages
import {
	TextField,
	FormGroup,
	Checkbox,
	FormControlLabel,
	Box,
	Typography,
} from "@mui/material";
import { useNavigate, createSearchParams } from "react-router-dom";
import { AES } from "crypto-js";

const Bantuan = () => {
	const [bantuan, setBantuan] = useState([]);
	const [searchDataBantuan, setSearchDataBantuan] = useState("");
	const [checkedKapasitas100, setCheckedKapasitas100] = useState(false);
	const [checkedKapasitas50, setCheckedKapasitas50] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Cari Bantuan";
		getAllBantuan();
	}, []);

	const getAllBantuan = async () => {
		const response = await API.getAllBantuan();
		setBantuan(response.data);
	};

	const showBantuan = (data) => {
		if (checkedKapasitas100) {
			if (checkedKapasitas50) {
				return data.map((e, i) => {
					if (e.nama.toLowerCase().includes(searchDataBantuan)) {
						return (
							<Box
								key={i}
								sx={{
									height: 90,
									p: 3,
									borderRadius: 3,
								}}
								onClick={() =>
									navigate({
										pathname: "/bantuan-detail",
										search: `?${createSearchParams({
											bi: AES.encrypt(e.kd_bantuan, "bantuan_id"),
										}).toString()}`,
									})
								}
							>
								<Typography variant="h4" style={{ fontSize: "1.7em" }}>
									{e.nama}
								</Typography>

								<div style={{ fontSize: ".9em" }}>
									<p>
										Kapasitas: <span>{e.kapasitas}</span>
									</p>
								</div>
							</Box>
						);
					}
					return null;
				});
			}

			return data
				.filter((e) => e.kapasitas === "100")
				.map((e, i) => {
					if (e.nama.toLowerCase().includes(searchDataBantuan)) {
						return (
							<Box
								key={i}
								sx={{
									height: 90,
									p: 3,
									borderRadius: 3,
								}}
								onClick={() =>
									navigate({
										pathname: "/bantuan-detail",
										search: `?${createSearchParams({
											bi: AES.encrypt(e.kd_bantuan, "bantuan_id"),
										}).toString()}`,
									})
								}
							>
								<Typography variant="h4" style={{ fontSize: "1.7em" }}>
									{e.nama}
								</Typography>

								<div style={{ fontSize: ".9em" }}>
									<p>
										Kapasitas: <span>{e.kapasitas}</span>
									</p>
								</div>
							</Box>
						);
					}

					return null;
				});
		} else if (checkedKapasitas50) {
			return data
				.filter((e) => e.kapasitas === "50")
				.map((e, i) => {
					if (e.nama.toLowerCase().includes(searchDataBantuan)) {
						return (
							<Box
								key={i}
								sx={{
									height: 90,
									p: 3,
									borderRadius: 3,
								}}
								onClick={() =>
									navigate({
										pathname: "/bantuan-detail",
										search: `?${createSearchParams({
											bi: AES.encrypt(e.kd_bantuan, "bantuan_id"),
										}).toString()}`,
									})
								}
							>
								<Typography variant="h4" style={{ fontSize: "1.7em" }}>
									{e.nama}
								</Typography>

								<div style={{ fontSize: ".9em" }}>
									<p>
										Kapasitas: <span>{e.kapasitas}</span>
									</p>
								</div>
							</Box>
						);
					}

					return null;
				});
		}

		return data.map((e, i) => {
			if (e.nama.toLowerCase().includes(searchDataBantuan)) {
				return (
					<Box
						key={i}
						sx={{
							height: 90,
							p: 3,
							borderRadius: 3,
						}}
						onClick={() =>
							navigate({
								pathname: "/bantuan-detail",
								search: `?${createSearchParams({
									bi: AES.encrypt(e.kd_bantuan, "bantuan_id"),
								}).toString()}`,
							})
						}
					>
						<Typography variant="h4" style={{ fontSize: "1.7em" }}>
							{e.nama}
						</Typography>

						<div style={{ fontSize: ".9em" }}>
							<p>
								Kapasitas: <span>{e.kapasitas}</span>
							</p>
						</div>
					</Box>
				);
			}

			return null;
		});
	};

	return (
		<div>
			<Navbar />

			{/* Component bantuan content */}
			<div className="bantuan">
				<h1>Bantuan Sosial Masyarakat</h1>

				{/* Search data section */}
				<div className="search_bantuan">
					<TextField
						label="Cari bantuan"
						name="cari_bantuan"
						variant="outlined"
						autoComplete="off"
						sx={{ width: "60%" }}
						onChange={(e) => {
							setSearchDataBantuan(e.target.value);
						}}
					/>
				</div>
				{/* Akhir search data section */}

				<div className="bantuan_content">
					{/* Filtering data section */}
					<div className="filtering_bantuan">
						<h3>Cari Berdasarkan</h3>
						<p>Kapasitas</p>
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										onChange={(e) => {
											setCheckedKapasitas100(e.target.checked);
										}}
									/>
								}
								label="100"
							/>
							<FormControlLabel
								control={
									<Checkbox
										onChange={(e) => {
											setCheckedKapasitas50(e.target.checked);
										}}
									/>
								}
								label="50"
							/>
						</FormGroup>
					</div>
					{/* Akhir filtering data section */}

					{/* Showing data based on search and filter */}
					<div className="result_bantuan">
						{bantuan && showBantuan(bantuan)}
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
