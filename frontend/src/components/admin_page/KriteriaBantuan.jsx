import React, { useState, useEffect } from "react";

// components
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

// npm packages
import axios from "axios";
import { Button, CircularProgress } from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate, createSearchParams } from "react-router-dom";
import { AES } from "crypto-js";
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
		const response = await axios.get("http://localhost:5000/kriteria");
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

	const roundMatriks1 = nilaiMatriks1.map((e, i) => Math.floor(e * 100) / 100);
	const roundMatriks2 = nilaiMatriks2.map((e, i) => Math.floor(e * 100) / 100);
	const roundMatriks3 = nilaiMatriks3.map((e, i) => Math.floor(e * 100) / 100);
	const roundMatriks4 = nilaiMatriks4.map((e, i) => Math.floor(e * 100) / 100);
	const roundMatriks5 = nilaiMatriks5.map((e, i) => Math.floor(e * 100) / 100);

	for (let y = 0; y < kriteriaBantuan.length; y++) {
		hasilAkhir.push(
			roundMatriks1[y] +
				roundMatriks2[y] +
				roundMatriks3[y] +
				roundMatriks4[y] +
				roundMatriks5[y]
		);
	}

	for (let x = 0; x < kriteriaBantuan.length; x++) {
		normalisasiKriteria1.push(roundMatriks1[x] / hasilAkhir[x]);
		normalisasiKriteria2.push(roundMatriks2[x] / hasilAkhir[x]);
		normalisasiKriteria3.push(roundMatriks3[x] / hasilAkhir[x]);
		normalisasiKriteria4.push(roundMatriks4[x] / hasilAkhir[x]);
		normalisasiKriteria5.push(roundMatriks5[x] / hasilAkhir[x]);
	}

	// membulatkan nilai normalisai kriteria
	const roundNormalisasiKriteria1 = normalisasiKriteria1.map(
		(e, i) => Math.round(e * 100) / 100
	);
	const roundNormalisasiKriteria2 = normalisasiKriteria2.map(
		(e, i) => Math.round(e * 100) / 100
	);
	const roundNormalisasiKriteria3 = normalisasiKriteria3.map(
		(e, i) => Math.round(e * 100) / 100
	);
	const roundNormalisasiKriteria4 = normalisasiKriteria4.map(
		(e, i) => Math.round(e * 100) / 100
	);
	const roundNormalisasiKriteria5 = normalisasiKriteria5.map(
		(e, i) => Math.round(e * 100) / 100
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
		Math.round((jmlhNormalisasiKriteria1 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria2 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria3 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria4 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria5 / jmlhKriteria) * 100) / 100
	);

	// mencari nilai lamda, lamda maks, CI, dan CR
	for (let i = 0; i < kriteriaBantuan.length; i++) {
		nilaiLamda.push(hasilAkhirNilaiPrioritas[i] * hasilAkhir[i]);
	}

	const nilaiLamdaMaks = nilaiLamda.reduce((accu, curr) => accu + curr, 0);
	const nilaiCI = (nilaiLamdaMaks - jmlhKriteria) / (jmlhKriteria - 1);
	const nilaiCR = nilaiCI / nilaiRI;

	const handleClick = (e) => {
		for (let i = 0; i < kriteriaBantuan.length + 1; i++) {
			axios.patch(`http://localhost:5000/kriteria/KB_${i + 1}`, {
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
												{/* btn hapus */}
												{/* <Button
                                                        variant="contained"
                                                        className="btn_delete_bantuan"
                                                        onClick={() => {
                                                            swal({
                                                                title: "Yakin ingin hapus data?",
                                                                text: "Jika iya, maka data tidak bisa dikembalikan lagi!",
                                                                icon: "warning",
                                                                buttons: ["Tidak", "Yakin"],
                                                                dangerMode: true
                                                            })
                                                            .then((willDelete) => {
                                                                if (willDelete) {
                                                                    axios.delete(`http://localhost:5000/kriteria/${e.id_kriteria}`)
                                                                    .then(res => {
                                                                        swal("Kriteria berhasil dihapus!", {
                                                                        icon: "success",
                                                                        })
                                                                    })
                                                                    getAllKriteria()
                                                                }
                                                            });
                                                        }}
                                                ><RiDeleteBin6Line /></Button> */}

												{/* btn edit */}
												<Button
													variant="contained"
													className="btn_as_admin"
													sx={{
														mr: 1,
													}}
													onClick={() => {
														const encrypt = AES.encrypt(
															e.id_kriteria,
															"id_kriteria"
														);
														navigate({
															pathname: "/edit-kriteria-bantuan",
															search: `?${createSearchParams({
																ki: encrypt,
															}).toString()}`,
														});
													}}
												>
													<AiOutlineEdit />
												</Button>
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
