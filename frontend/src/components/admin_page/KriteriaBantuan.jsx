// styling component linked in kriteria_bantuan.scss file

import React, { useState, useEffect } from "react";

// components
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

// API storage
import API from "../../api";

// npm packages
import { Button, CircularProgress, Menu, MenuItem } from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsPrinter } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "jspdf-autotable";
import { jsPDF } from "jspdf";

const KriteriaBantuan = () => {
	const [kriteriaBantuan, setKriteriaBantuan] = useState([]);
	const [isLoad, setIsLoad] = useState(false);
	const [isShow, setIsShow] = useState(false);
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const jmlhKriteria = 11;
	const nilaiRI = 1.51;

	let nilaiMatriks1 = [];
	let nilaiMatriks2 = [];
	let nilaiMatriks3 = [];
	let nilaiMatriks4 = [];
	let nilaiMatriks5 = [];
	let nilaiMatriks6 = [];
	let nilaiMatriks7 = [];
	let nilaiMatriks8 = [];
	let nilaiMatriks9 = [];
	let nilaiMatriks10 = [];
	let nilaiMatriks11 = [];

	let normalisasiKriteria1 = [];
	let normalisasiKriteria2 = [];
	let normalisasiKriteria3 = [];
	let normalisasiKriteria4 = [];
	let normalisasiKriteria5 = [];
	let normalisasiKriteria6 = [];
	let normalisasiKriteria7 = [];
	let normalisasiKriteria8 = [];
	let normalisasiKriteria9 = [];
	let normalisasiKriteria10 = [];
	let normalisasiKriteria11 = [];
	let hasilAkhir = [];
	let hasilAkhirNilaiPrioritas = [];
	let nilaiLamda = [];

	useEffect(() => {
		document.title = "Kelola Kriteria Bantuan";
		getAllKriteria();
	}, []);

	const getAllKriteria = async () => {
		const response = await API.getAllKriteria();
		setKriteriaBantuan(response.data);
	};

	for (let i = 0; i < kriteriaBantuan.length; i++) {
		nilaiMatriks1.push(
			kriteriaBantuan[0].nilai_bobot / kriteriaBantuan[i].nilai_bobot
		);
		nilaiMatriks2.push(
			kriteriaBantuan[1].nilai_bobot / kriteriaBantuan[i].nilai_bobot
		);
		nilaiMatriks3.push(
			kriteriaBantuan[2].nilai_bobot / kriteriaBantuan[i].nilai_bobot
		);
		nilaiMatriks4.push(
			kriteriaBantuan[3].nilai_bobot / kriteriaBantuan[i].nilai_bobot
		);
		nilaiMatriks5.push(
			kriteriaBantuan[4].nilai_bobot / kriteriaBantuan[i].nilai_bobot
		);
		nilaiMatriks6.push(
			kriteriaBantuan[5].nilai_bobot / kriteriaBantuan[i].nilai_bobot
		);
		nilaiMatriks7.push(
			kriteriaBantuan[6].nilai_bobot / kriteriaBantuan[i].nilai_bobot
		);
		nilaiMatriks8.push(
			kriteriaBantuan[7].nilai_bobot / kriteriaBantuan[i].nilai_bobot
		);
		nilaiMatriks9.push(
			kriteriaBantuan[8].nilai_bobot / kriteriaBantuan[i].nilai_bobot
		);
		nilaiMatriks10.push(
			kriteriaBantuan[9].nilai_bobot / kriteriaBantuan[i].nilai_bobot
		);
		nilaiMatriks11.push(
			kriteriaBantuan[10].nilai_bobot / kriteriaBantuan[i].nilai_bobot
		);
	}

	const roundMatriks1 = nilaiMatriks1.map(
		(e, i) => Math.floor(e * 1000) / 1000
	);
	const roundMatriks2 = nilaiMatriks2.map(
		(e, i) => Math.floor(e * 1000) / 1000
	);
	const roundMatriks3 = nilaiMatriks3.map(
		(e, i) => Math.floor(e * 1000) / 1000
	);
	const roundMatriks4 = nilaiMatriks4.map(
		(e, i) => Math.floor(e * 1000) / 1000
	);
	const roundMatriks5 = nilaiMatriks5.map(
		(e, i) => Math.floor(e * 1000) / 1000
	);
	const roundMatriks6 = nilaiMatriks6.map(
		(e, i) => Math.floor(e * 1000) / 1000
	);
	const roundMatriks7 = nilaiMatriks7.map(
		(e, i) => Math.floor(e * 1000) / 1000
	);
	const roundMatriks8 = nilaiMatriks8.map(
		(e, i) => Math.floor(e * 1000) / 1000
	);
	const roundMatriks9 = nilaiMatriks9.map(
		(e, i) => Math.floor(e * 1000) / 1000
	);
	const roundMatriks10 = nilaiMatriks10.map(
		(e, i) => Math.floor(e * 1000) / 1000
	);
	const roundMatriks11 = nilaiMatriks11.map(
		(e, i) => Math.floor(e * 1000) / 1000
	);

	for (let y = 0; y < kriteriaBantuan.length; y++) {
		hasilAkhir.push(
			roundMatriks1[y] +
				roundMatriks2[y] +
				roundMatriks3[y] +
				roundMatriks4[y] +
				roundMatriks5[y] +
				roundMatriks6[y] +
				roundMatriks7[y] +
				roundMatriks8[y] +
				roundMatriks9[y] +
				roundMatriks10[y] +
				roundMatriks11[y]
		);
	}

	// round kalkulasi nilai perbandingan kriteria
	const roundKalkulasiPerbandinganKriteria = hasilAkhir.map(
		(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
	);

	for (let x = 0; x < kriteriaBantuan.length; x++) {
		normalisasiKriteria1.push(
			roundMatriks1[x] / roundKalkulasiPerbandinganKriteria[x]
		);
		normalisasiKriteria2.push(
			roundMatriks2[x] / roundKalkulasiPerbandinganKriteria[x]
		);
		normalisasiKriteria3.push(
			roundMatriks3[x] / roundKalkulasiPerbandinganKriteria[x]
		);
		normalisasiKriteria4.push(
			roundMatriks4[x] / roundKalkulasiPerbandinganKriteria[x]
		);
		normalisasiKriteria5.push(
			roundMatriks5[x] / roundKalkulasiPerbandinganKriteria[x]
		);
		normalisasiKriteria6.push(
			roundMatriks6[x] / roundKalkulasiPerbandinganKriteria[x]
		);
		normalisasiKriteria7.push(
			roundMatriks7[x] / roundKalkulasiPerbandinganKriteria[x]
		);
		normalisasiKriteria8.push(
			roundMatriks8[x] / roundKalkulasiPerbandinganKriteria[x]
		);
		normalisasiKriteria9.push(
			roundMatriks9[x] / roundKalkulasiPerbandinganKriteria[x]
		);
		normalisasiKriteria10.push(
			roundMatriks10[x] / roundKalkulasiPerbandinganKriteria[x]
		);
		normalisasiKriteria11.push(
			roundMatriks11[x] / roundKalkulasiPerbandinganKriteria[x]
		);
	}

	// membulatkan nilai normalisai kriteria
	const roundNormalisasiKriteria1 = normalisasiKriteria1.map(
		(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
	);
	const roundNormalisasiKriteria2 = normalisasiKriteria2.map(
		(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
	);
	const roundNormalisasiKriteria3 = normalisasiKriteria3.map(
		(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
	);
	const roundNormalisasiKriteria4 = normalisasiKriteria4.map(
		(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
	);
	const roundNormalisasiKriteria5 = normalisasiKriteria5.map(
		(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
	);
	const roundNormalisasiKriteria6 = normalisasiKriteria6.map(
		(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
	);
	const roundNormalisasiKriteria7 = normalisasiKriteria7.map(
		(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
	);
	const roundNormalisasiKriteria8 = normalisasiKriteria8.map(
		(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
	);
	const roundNormalisasiKriteria9 = normalisasiKriteria9.map(
		(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
	);
	const roundNormalisasiKriteria10 = normalisasiKriteria10.map(
		(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
	);
	const roundNormalisasiKriteria11 = normalisasiKriteria11.map(
		(e, i) => Math.round(e.toFixed(3) * 1e3) / 1e3
	);

	// kalkulasi data normalisasi kriteria
	const jmlhNormalisasiKriteria1 = roundNormalisasiKriteria1.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria2 = roundNormalisasiKriteria2.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria3 = roundNormalisasiKriteria3.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria4 = roundNormalisasiKriteria4.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria5 = roundNormalisasiKriteria5.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria6 = roundNormalisasiKriteria6.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria7 = roundNormalisasiKriteria7.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria8 = roundNormalisasiKriteria8.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria9 = roundNormalisasiKriteria9.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria10 = roundNormalisasiKriteria10.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria11 = roundNormalisasiKriteria11.reduce(
		(accu, curr) => accu + curr,
		0
	);

	// menghitung nilai eigen / prioritas
	hasilAkhirNilaiPrioritas.push(
		Math.round(
			(Math.round(jmlhNormalisasiKriteria1.toFixed(3) * 1e3) /
				1e3 /
				jmlhKriteria) *
				100
		) / 100,
		Math.round(
			(Math.round(jmlhNormalisasiKriteria2.toFixed(3) * 1e3) /
				1e3 /
				jmlhKriteria) *
				100
		) / 100,
		Math.round(
			(Math.round(jmlhNormalisasiKriteria3.toFixed(3) * 1e3) /
				1e3 /
				jmlhKriteria) *
				100
		) / 100,
		Math.round(
			(Math.round(jmlhNormalisasiKriteria4.toFixed(3) * 1e3) /
				1e3 /
				jmlhKriteria) *
				100
		) / 100,
		Math.round(
			(Math.round(jmlhNormalisasiKriteria5.toFixed(3) * 1e3) /
				1e3 /
				jmlhKriteria) *
				100
		) / 100,
		Math.round(
			(Math.round(jmlhNormalisasiKriteria6.toFixed(3) * 1e3) /
				1e3 /
				jmlhKriteria) *
				100
		) / 100,
		Math.round(
			(Math.round(jmlhNormalisasiKriteria7.toFixed(3) * 1e3) /
				1e3 /
				jmlhKriteria) *
				100
		) / 100,
		Math.round(
			(Math.round(jmlhNormalisasiKriteria8.toFixed(3) * 1e3) /
				1e3 /
				jmlhKriteria) *
				100
		) / 100,
		Math.round(
			(Math.round(jmlhNormalisasiKriteria9.toFixed(3) * 1e3) /
				1e3 /
				jmlhKriteria) *
				100
		) / 100,
		Math.round(
			(Math.round(jmlhNormalisasiKriteria10.toFixed(3) * 1e3) /
				1e3 /
				jmlhKriteria) *
				100
		) / 100,
		Math.round(
			(Math.round(jmlhNormalisasiKriteria11.toFixed(3) * 1e3) /
				1e3 /
				jmlhKriteria) *
				100
		) / 100
	);

	// mencari nilai lamda, lamda maks, CI, dan CR
	for (let i = 0; i < kriteriaBantuan.length; i++) {
		nilaiLamda.push(
			hasilAkhirNilaiPrioritas[i] * roundKalkulasiPerbandinganKriteria[i]
		);
	}

	const nilaiLamdaMaks = nilaiLamda.reduce((accu, curr) => accu + curr, 0);
	const nilaiCI = (nilaiLamdaMaks - jmlhKriteria) / (jmlhKriteria - 1);
	const nilaiCR = nilaiCI / nilaiRI;

	const handleClick = (e) => {
		for (let i = 0; i < kriteriaBantuan.length + 1; i++) {
			API.updateKriteriaByID(`KB_${i + 1}`, {
				nilai_prioritas: hasilAkhirNilaiPrioritas[i],
				nilai_lamda: nilaiLamda[i],
			});
		}

		setIsLoad(true);
		setTimeout(() => {
			setIsShow(true);
			getAllKriteria();
		}, 3000);
	};

	const generatePdf = () => {
		var doc = new jsPDF({ orientation: "p" });
		doc.setFontSize(13);
		doc.text("Data Kriteria BPNT", 90, 20);
		doc.autoTable({
			head: [["Kriteria", "Nilai Bobot", "Nilai Prioritas", "Nilai Lamda"]],
			body: kriteriaBantuan.map((e, i) => {
				return [e.nama, e.nilai_bobot, e.nilai_prioritas, nilaiLamda[i]];
			}),
			startY: 30,
		});
		doc.setFontSize(11);
		doc.text(`Nilai lamda maks: ${nilaiLamdaMaks}`, 15, 130);
		doc.setFontSize(11);
		doc.text(`Nilai CI: ${nilaiCI}`, 15, 137);
		doc.setFontSize(11);
		doc.text(`Nilai CR: ${nilaiCR}`, 15, 144);
		doc.save("data_kriteria.pdf");
	};

	return (
		<div style={{ display: "flex" }}>
			<NavbarAdmin />
			<div className="flex_header_admin">
				<HeaderAdmin />
				<div className="content_dashboard_admin">
					<h2 style={{ marginBottom: 10 }}>Data Kriteria</h2>
					<div className="wrap_tbl_kriteria">
						<div className="flex_element_kriteria_bantuan">
							<Button
								variant="contained"
								onClick={handleClick}
								sx={{ fontWeight: "bold" }}
							>
								Hitung nilai prioritas
							</Button>
							<div className="cetak_data_kriteria_bantuan">
								<Button
									id="basic-button"
									aria-controls={open ? "basic-menu" : undefined}
									aria-haspopup="true"
									aria-expanded={open ? "true" : undefined}
									onClick={(e) => setAnchorEl(e.currentTarget)}
								>
									<BsPrinter
										size={20}
										style={{
											marginLeft: 5,
											color: "rgb(75, 75, 253)",
										}}
									/>
									<MdKeyboardArrowDown
										size={20}
										style={{
											marginLeft: 5,
											color: "rgb(117, 117, 117)",
										}}
									/>
								</Button>
								<Menu
									id="basic-menu"
									anchorEl={anchorEl}
									open={open}
									onClose={() => setAnchorEl(null)}
									MenuListProps={{
										"aria-labelledby": "basic-button",
									}}
								>
									<MenuItem
										onClick={() => {
											generatePdf();
										}}
									>
										PDF
									</MenuItem>
								</Menu>
								{/* <Button
									variant="contained"
									className="generate_pdf_kriteria_bantuan"
									onClick={generatePdf}
								>
									Cetak ke PDF
								</Button> */}
							</div>
						</div>
						<table className="tbl_class">
							<thead className="tbl_class_head">
								<tr>
									<th>No</th>
									<th>Nama</th>
									<th>Nilai Bobot</th>
									<th>Nilai Prioritas</th>
									<th>Aksi</th>
								</tr>
							</thead>
							<tbody className="tbl_class_body">
								{kriteriaBantuan.map((e, i) => {
									return (
										<tr key={i}>
											<td>{i + 1}</td>
											<td>{e.nama}</td>
											<td>{e.nilai_bobot}</td>
											<td>
												{isLoad ? (
													isShow ? (
														e.nilai_prioritas
													) : (
														<CircularProgress size={20} />
													)
												) : (
													e.nilai_prioritas
												)}
											</td>
											<td>
												{/* btn edit */}
												<Button
													variant="contained"
													className="btn_as_petugas"
													sx={{
														mr: 1,
													}}
													onClick={() => {
														navigate("/edit-kriteria-bantuan", {
															state: e.id_kriteria,
														});
													}}
												>
													<AiOutlineEdit />
												</Button>
												{/* akhir btn edit */}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default KriteriaBantuan;
