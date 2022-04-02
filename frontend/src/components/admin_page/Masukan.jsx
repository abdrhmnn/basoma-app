// styling component linked in masukan_admin.scss file

import React, { useState, useEffect } from "react";

// components
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

// API storage
import API from "../../api";

// npm packages
import {
	TextField,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	FormControl,
	Select,
	MenuItem,
} from "@mui/material";

const Masukan = () => {
	const [masukan, setMasukan] = useState(null);
	const [masukanByID, setMasukanByID] = useState(null);
	const [valueCari, setValueCari] = useState("");

	const [openDialog, setOpenDialog] = useState(false);

	const [dataMasukanLength, setDataMasukanLength] = useState(5);

	useEffect(() => {
		document.title = "Kelola Masukan";
		getAllMasukan();
	}, []);

	const getAllMasukan = async () => {
		const response = await API.getAllMasukan();
		setMasukan(response.data);
	};

	const handleChange = (e) => {
		setValueCari(e.target.value);
	};

	const showMasukan = (data) => {
		return data.slice(0, dataMasukanLength).map((e, i) => {
			const stringData = e.nm_depan + e.nm_belakang;

			if (stringData.toLowerCase().includes(valueCari)) {
				return (
					<tr key={i}>
						<td>{i + 1}</td>
						<td>
							{e.nm_depan} {e.nm_belakang}
						</td>
						<td
							style={{
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
								maxWidth: 100,
							}}
						>
							{e.pesan}
						</td>
						<td>
							<Button
								variant="contained"
								className="btn_detail_masukan"
								onClick={() => {
									setOpenDialog(true);
									API.getMasukanByID(e.id_masukan).then((res) => {
										setMasukanByID(res.data);
									});
									setMasukanByID(null);
								}}
							>
								detail
							</Button>
						</td>
					</tr>
				);
			}
			return null;
		});
	};

	return (
		<div style={{ display: "flex" }}>
			<NavbarAdmin />
			<div className="flex_header_admin">
				<HeaderAdmin />
				<div className="content_dashboard_admin">
					<h2>Data Masukan</h2>
					<div className="wrap_tbl_masukan">
						<div className="flex_element_masukan">
							<TextField
								label="Cari berdasarkan nama"
								name="nm_depan"
								variant="outlined"
								sx={{ width: "30%" }}
								autoComplete="off"
								onChange={handleChange}
							/>
						</div>
						<table className="tbl_class">
							<thead className="tbl_class_head">
								<tr>
									<th>No</th>
									<th>Nama Lengkap</th>
									<th>Pesan</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody className="tbl_class_body">
								{masukan && showMasukan(masukan)}
							</tbody>
						</table>
						<div className="show_length_data_masukan">
							<p>Liat baris: </p>
							<FormControl>
								<Select
									id="masukan_data_length"
									value={dataMasukanLength}
									onChange={(e) => {
										setDataMasukanLength(e.target.value);
									}}
								>
									<MenuItem value={5}>5</MenuItem>
									<MenuItem value={10}>10</MenuItem>
									<MenuItem value={20}>20</MenuItem>
									<MenuItem value={50}>50</MenuItem>
								</Select>
							</FormControl>
						</div>
						{masukanByID && (
							<Dialog
								open={openDialog}
								onClose={() => {
									setOpenDialog(false);
								}}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle
									id="alert-dialog-title"
									sx={{ fontSize: "1em" }}
								>
									Detail Masukan
								</DialogTitle>
								<DialogContent>
									<TextField
										name="nama_pengirim"
										variant="outlined"
										label="Nama Pengirim"
										defaultValue={`${masukanByID.nm_depan} ${masukanByID.nm_belakang}`}
										className="text_nama_pengirim"
										disabled={true}
										fullWidth
										sx={{ marginTop: "6px" }}
									/>
									<TextField
										name="pesan_masukan"
										variant="outlined"
										label="Pesan"
										multiline
										rows={6}
										defaultValue={`${masukanByID.pesan}`}
										disabled={true}
										fullWidth
										sx={{ marginTop: "20px" }}
									/>
								</DialogContent>
							</Dialog>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Masukan;
