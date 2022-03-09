// styling component linked in kriteria_bantuan.scss file

import React, { useState, useEffect } from "react";

// components
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

// API storage
import API from "../../api";

// npm packages
import { Button, CircularProgress } from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "jspdf-autotable";
import { jsPDF } from "jspdf";

const KriteriaBantuan = () => {
	const [kriteriaBantuan, setKriteriaBantuan] = useState([]);
	const [isLoad, setIsLoad] = useState(false);
	const [isShow, setIsShow] = useState(false);
	const navigate = useNavigate();

	const jmlhKriteria = 5;
	const nilaiRI = 1.12;

	let nilaiMatriks1 = [];
	let nilaiMatriks2 = [];
	let nilaiMatriks3 = [];
	let nilaiMatriks4 = [];
	let nilaiMatriks5 = [];

	let normalisasiKriteria1 = [];
	let normalisasiKriteria2 = [];
	let normalisasiKriteria3 = [];
	let normalisasiKriteria4 = [];
	let normalisasiKriteria5 = [];
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

	for (let y = 0; y < kriteriaBantuan.length; y++) {
		hasilAkhir.push(
			roundMatriks1[y] +
				roundMatriks2[y] +
				roundMatriks3[y] +
				roundMatriks4[y] +
				roundMatriks5[y]
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
			API.updateKriteriaByID(i + 1, {
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
		doc.text("Data Kriteria Bantuan", 80, 20);
		doc.autoTable({
			head: [["Nama", "Nilai Bobot", "Nilai Prioritas", "Nilai Lamda"]],
			body: kriteriaBantuan.map((e, i) => {
				return [e.nama, e.nilai_bobot, e.nilai_prioritas, nilaiLamda[i]];
			}),
			startY: 30,
		});
		doc.setFontSize(11);
		doc.text(`Nilai lamda maks: ${nilaiLamdaMaks}`, 15, 85);
		doc.setFontSize(11);
		doc.text(`Nilai CI: ${nilaiCI}`, 15, 91);
		doc.setFontSize(11);
		doc.text(`Nilai CR: ${nilaiCR}`, 15, 97);
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
							<Button variant="contained" onClick={handleClick}>
								Hitung nilai prioritas
							</Button>
							<div className="cetak_data_kriteria_bantuan">
								<Button
									variant="contained"
									className="generate_pdf_kriteria_bantuan"
									onClick={generatePdf}
								>
									Cetak ke PDF
								</Button>
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
													className="btn_as_admin"
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
