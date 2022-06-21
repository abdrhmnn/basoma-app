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
import ReactExport from "react-data-export";
import { useNavigate } from "react-router-dom";
import "jspdf-autotable";
import { jsPDF } from "jspdf";

const KriteriaBantuan = () => {
	const [kriteriaBantuan, setKriteriaBantuan] = useState([]);
	const [isLoad, setIsLoad] = useState(false);
	const [isShow, setIsShow] = useState(false);
	const navigate = useNavigate();

	const ExcelFile = ReactExport.ExcelFile;
	const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

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
	let hasilNormalisasiKriteriaAkhir = [];
	let hasilAkhirNilaiPrioritas = [];
	let hasilAkhirNilaiPrioritasToExcel = [];
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

	for (let y = 0; y < kriteriaBantuan.length; y++) {
		hasilNormalisasiKriteriaAkhir.push(
			normalisasiKriteria1[y] +
				normalisasiKriteria2[y] +
				normalisasiKriteria3[y] +
				normalisasiKriteria4[y] +
				normalisasiKriteria5[y] +
				normalisasiKriteria6[y] +
				normalisasiKriteria7[y] +
				normalisasiKriteria8[y] +
				normalisasiKriteria9[y] +
				normalisasiKriteria10[y] +
				normalisasiKriteria11[y]
		);
	}

	// kalkulasi data normalisasi kriteria
	const jmlhNormalisasiKriteria1 = normalisasiKriteria1.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria2 = normalisasiKriteria2.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria3 = normalisasiKriteria3.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria4 = normalisasiKriteria4.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria5 = normalisasiKriteria5.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria6 = normalisasiKriteria6.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria7 = normalisasiKriteria7.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria8 = normalisasiKriteria8.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria9 = normalisasiKriteria9.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria10 = normalisasiKriteria10.reduce(
		(accu, curr) => accu + curr,
		0
	);
	const jmlhNormalisasiKriteria11 = normalisasiKriteria11.reduce(
		(accu, curr) => accu + curr,
		0
	);

	// menghitung nilai eigen / prioritas
	hasilAkhirNilaiPrioritas.push(
		jmlhNormalisasiKriteria1 / jmlhKriteria,
		jmlhNormalisasiKriteria2 / jmlhKriteria,
		jmlhNormalisasiKriteria3 / jmlhKriteria,
		jmlhNormalisasiKriteria4 / jmlhKriteria,
		jmlhNormalisasiKriteria5 / jmlhKriteria,
		jmlhNormalisasiKriteria6 / jmlhKriteria,
		jmlhNormalisasiKriteria7 / jmlhKriteria,
		jmlhNormalisasiKriteria8 / jmlhKriteria,
		jmlhNormalisasiKriteria9 / jmlhKriteria,
		jmlhNormalisasiKriteria10 / jmlhKriteria,
		jmlhNormalisasiKriteria11 / jmlhKriteria
	);

	hasilAkhirNilaiPrioritasToExcel.push(
		Math.round((jmlhNormalisasiKriteria1 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria2 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria3 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria4 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria5 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria6 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria7 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria8 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria9 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria10 / jmlhKriteria) * 100) / 100,
		Math.round((jmlhNormalisasiKriteria11 / jmlhKriteria) * 100) / 100
	);

	const totalNilaiEIGEN = hasilAkhirNilaiPrioritas.reduce(
		(accu, curr) => accu + curr,
		0
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
				nilai_prioritas:
					Math.round(hasilAkhirNilaiPrioritas[i] * 100) / 100,
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
		const today = new Date();
		const img = new Image();
		img.src = "/logo_basoma.png";

		var doc = new jsPDF({ orientation: "p" });
		doc.setFontSize(13);
		doc.text("Laporan Hasil Perhitungan AHP", 79, 21);
		doc.setFontSize(11);
		doc.addImage(img, "PNG", 13, 10, 17, 17);
		doc.line(13, 31, 197, 31);
		doc.text(
			`Tanggal cetak : ${today.getDate()} - 0${
				today.getMonth() + 1
			} - ${today.getFullYear()}`,
			14,
			39
		);

		doc.autoTable({
			head: [
				["No", "Kriteria", "Nilai Bobot", "Nilai Prioritas", "Nilai Lamda"],
			],
			body: kriteriaBantuan.map((e, i) => {
				return [
					`${i + 1}.`,
					e.nama,
					e.nilai_bobot,
					e.nilai_prioritas,
					nilaiLamda[i],
				];
			}),
			startY: 44,
			theme: "grid",
			columnStyles: {
				0: { halign: "center" },
				1: { halign: "left" },
				2: { halign: "center" },
				3: { halign: "center" },
				4: { halign: "center" },
			},
			headStyles: {
				fillColor: "rgb(75, 75, 253)",
				halign: "center",
			},
			alternateRowStyles: { fillColor: "rgb(218, 218, 218)" },
		});
		doc.setFontSize(11);
		doc.text(`Nilai lamda maks: ${nilaiLamdaMaks}`, 14, 143);
		doc.setFontSize(11);
		doc.text(`Nilai CI: ${nilaiCI}`, 14, 150);
		doc.setFontSize(11);
		doc.text(`Nilai CR: ${nilaiCR}`, 14, 157);
		window.open(doc.output("bloburl"), "_blank");
	};

	const multiDataSet = [
		{
			columns: [
				{ title: "", width: { wpx: 80 } }, // empty cell A
				{ title: "", width: { wch: 25 } }, // cell B
				{ title: "", width: { wpx: 72 } }, // cell C
				{ title: "", width: { wpx: 117 } }, // cell D
				{ title: "", width: { wpx: 94 } }, // cell E
				{ title: "", width: { wpx: 86 } }, // cell F
				{ title: "", width: { wpx: 183 } }, // cell G
				{ title: "", width: { wpx: 76 } }, // cell H
				{ title: "", width: { wpx: 73 } }, // cell I
				{ title: "", width: { wpx: 125 } }, // cell J
				{ title: "", width: { wpx: 70 } }, // cell K
				{ title: "", width: { wpx: 123 } }, // cell L
				{ title: "", width: { wpx: 133 } }, // cell M
				{ title: "", width: { wpx: 81 } }, // cell N
			],
			data: [
				// row cell 2
				[
					{ value: "" },
					{
						value: "Bobot nilai kriteria",
						style: { fill: { fgColor: { rgb: "FFFFFF00" } } },
					},
				],
				// row cell 3
				[
					{ value: "" },
					{
						value: "Kriteria",
					},
					{
						value: "Pendidikan",
					},
					{
						value: "Sumber air minum",
					},
					{
						value: "Dinding rumah",
					},
					{
						value: "Kondisi lantai",
					},
					{
						value: "Kemampuan membeli pakaian",
					},
					{
						value: "Atap rumah",
					},
					{
						value: "Luas lantai",
					},
					{
						value: "Sumber penerangan",
					},
					{
						value: "Pekerjaan",
					},
					{
						value: "Konsumsi makanan",
					},
					{
						value: "Kemampuan berobat",
					},
				],
				// row cell 4
				[
					{ value: "" },
					{
						value: "Pendidikan",
					},
					{
						value: roundMatriks1[0],
					},
					{
						value: roundMatriks1[1],
					},
					{
						value: roundMatriks1[2],
					},
					{
						value: roundMatriks1[3],
					},
					{
						value: roundMatriks1[4],
					},
					{
						value: roundMatriks1[5],
					},
					{
						value: roundMatriks1[6],
					},
					{
						value: roundMatriks1[7],
					},
					{
						value: roundMatriks1[8],
					},
					{
						value: roundMatriks1[9],
					},
					{
						value: roundMatriks1[10],
					},
				],
				// row cell 5
				[
					{ value: "" },
					{
						value: "Sumber air minum",
					},
					{
						value: roundMatriks2[0],
					},
					{
						value: roundMatriks2[1],
					},
					{
						value: roundMatriks2[2],
					},
					{
						value: roundMatriks2[3],
					},
					{
						value: roundMatriks2[4],
					},
					{
						value: roundMatriks2[5],
					},
					{
						value: roundMatriks2[6],
					},
					{
						value: roundMatriks2[7],
					},
					{
						value: roundMatriks2[8],
					},
					{
						value: roundMatriks2[9],
					},
					{
						value: roundMatriks2[10],
					},
				],
				// row cell 6
				[
					{ value: "" },
					{
						value: "Dinding rumah",
					},
					{
						value: roundMatriks3[0],
					},
					{
						value: roundMatriks3[1],
					},
					{
						value: roundMatriks3[2],
					},
					{
						value: roundMatriks3[3],
					},
					{
						value: roundMatriks3[4],
					},
					{
						value: roundMatriks3[5],
					},
					{
						value: roundMatriks3[6],
					},
					{
						value: roundMatriks3[7],
					},
					{
						value: roundMatriks3[8],
					},
					{
						value: roundMatriks3[9],
					},
					{
						value: roundMatriks3[10],
					},
				],
				// row cell 7
				[
					{ value: "" },
					{
						value: "Kondisi lantai",
					},
					{
						value: roundMatriks4[0],
					},
					{
						value: roundMatriks4[1],
					},
					{
						value: roundMatriks4[2],
					},
					{
						value: roundMatriks4[3],
					},
					{
						value: roundMatriks4[4],
					},
					{
						value: roundMatriks4[5],
					},
					{
						value: roundMatriks4[6],
					},
					{
						value: roundMatriks4[7],
					},
					{
						value: roundMatriks4[8],
					},
					{
						value: roundMatriks4[9],
					},
					{
						value: roundMatriks4[10],
					},
				],
				// row cell 8
				[
					{ value: "" },
					{
						value: "Kemampuan membeli pakaian",
					},
					{
						value: roundMatriks5[0],
					},
					{
						value: roundMatriks5[1],
					},
					{
						value: roundMatriks5[2],
					},
					{
						value: roundMatriks5[3],
					},
					{
						value: roundMatriks5[4],
					},
					{
						value: roundMatriks5[5],
					},
					{
						value: roundMatriks5[6],
					},
					{
						value: roundMatriks5[7],
					},
					{
						value: roundMatriks5[8],
					},
					{
						value: roundMatriks5[9],
					},
					{
						value: roundMatriks5[10],
					},
				],
				// row cell 9
				[
					{ value: "" },
					{
						value: "Atap rumah",
					},
					{
						value: roundMatriks6[0],
					},
					{
						value: roundMatriks6[1],
					},
					{
						value: roundMatriks6[2],
					},
					{
						value: roundMatriks6[3],
					},
					{
						value: roundMatriks6[4],
					},
					{
						value: roundMatriks6[5],
					},
					{
						value: roundMatriks6[6],
					},
					{
						value: roundMatriks6[7],
					},
					{
						value: roundMatriks6[8],
					},
					{
						value: roundMatriks6[9],
					},
					{
						value: roundMatriks6[10],
					},
				],
				// row cell 10
				[
					{ value: "" },
					{
						value: "Luas lantai",
					},
					{
						value: roundMatriks7[0],
					},
					{
						value: roundMatriks7[1],
					},
					{
						value: roundMatriks7[2],
					},
					{
						value: roundMatriks7[3],
					},
					{
						value: roundMatriks7[4],
					},
					{
						value: roundMatriks7[5],
					},
					{
						value: roundMatriks7[6],
					},
					{
						value: roundMatriks7[7],
					},
					{
						value: roundMatriks7[8],
					},
					{
						value: roundMatriks7[9],
					},
					{
						value: roundMatriks7[10],
					},
				],
				// row cell 11
				[
					{ value: "" },
					{
						value: "Sumber penerangan",
					},
					{
						value: roundMatriks8[0],
					},
					{
						value: roundMatriks8[1],
					},
					{
						value: roundMatriks8[2],
					},
					{
						value: roundMatriks8[3],
					},
					{
						value: roundMatriks8[4],
					},
					{
						value: roundMatriks8[5],
					},
					{
						value: roundMatriks8[6],
					},
					{
						value: roundMatriks8[7],
					},
					{
						value: roundMatriks8[8],
					},
					{
						value: roundMatriks8[9],
					},
					{
						value: roundMatriks8[10],
					},
				],
				// row cell 12
				[
					{ value: "" },
					{
						value: "Pekerjaan",
					},
					{
						value: roundMatriks9[0],
					},
					{
						value: roundMatriks9[1],
					},
					{
						value: roundMatriks9[2],
					},
					{
						value: roundMatriks9[3],
					},
					{
						value: roundMatriks9[4],
					},
					{
						value: roundMatriks9[5],
					},
					{
						value: roundMatriks9[6],
					},
					{
						value: roundMatriks9[7],
					},
					{
						value: roundMatriks9[8],
					},
					{
						value: roundMatriks9[9],
					},
					{
						value: roundMatriks9[10],
					},
				],
				// row cell 13
				[
					{ value: "" },
					{
						value: "Konsumsi makanan",
					},
					{
						value: roundMatriks10[0],
					},
					{
						value: roundMatriks10[1],
					},
					{
						value: roundMatriks10[2],
					},
					{
						value: roundMatriks10[3],
					},
					{
						value: roundMatriks10[4],
					},
					{
						value: roundMatriks10[5],
					},
					{
						value: roundMatriks10[6],
					},
					{
						value: roundMatriks10[7],
					},
					{
						value: roundMatriks10[8],
					},
					{
						value: roundMatriks10[9],
					},
					{
						value: roundMatriks10[10],
					},
				],
				// row cell 14
				[
					{ value: "" },
					{
						value: "Kemampuan berobat",
					},
					{
						value: roundMatriks11[0],
					},
					{
						value: roundMatriks11[1],
					},
					{
						value: roundMatriks11[2],
					},
					{
						value: roundMatriks11[3],
					},
					{
						value: roundMatriks11[4],
					},
					{
						value: roundMatriks11[5],
					},
					{
						value: roundMatriks11[6],
					},
					{
						value: roundMatriks11[7],
					},
					{
						value: roundMatriks11[8],
					},
					{
						value: roundMatriks11[9],
					},
					{
						value: roundMatriks11[10],
					},
				],
				// row cell 15
				[{ value: "" }],
				// row cell 16
				[
					{ value: "" },
					{
						value: "Jumlah",
					},
					{
						value: roundKalkulasiPerbandinganKriteria[0],
					},
					{
						value: roundKalkulasiPerbandinganKriteria[1],
					},
					{
						value: roundKalkulasiPerbandinganKriteria[2],
					},
					{
						value: roundKalkulasiPerbandinganKriteria[3],
					},
					{
						value: roundKalkulasiPerbandinganKriteria[4],
					},
					{
						value: roundKalkulasiPerbandinganKriteria[5],
					},
					{
						value: roundKalkulasiPerbandinganKriteria[6],
					},
					{
						value: roundKalkulasiPerbandinganKriteria[7],
					},
					{
						value: roundKalkulasiPerbandinganKriteria[8],
					},
					{
						value: roundKalkulasiPerbandinganKriteria[9],
					},
					{
						value: roundKalkulasiPerbandinganKriteria[10],
					},
				],
				// row cell 17
				[{ value: "" }],

				// normalisasi kriteria cell
				// row cell 18
				[
					{ value: "" },
					{
						value: "Normalisasi kriteria",
						style: { fill: { fgColor: { rgb: "FFFFFF00" } } },
					},
				],
				// row cell 19
				[
					{ value: "" },
					{
						value: "Kriteria",
					},
					{
						value: "Pendidikan",
					},
					{
						value: "Sumber air minum",
					},
					{
						value: "Dinding rumah",
					},
					{
						value: "Kondisi lantai",
					},
					{
						value: "Kemampuan membeli pakaian",
					},
					{
						value: "Atap rumah",
					},
					{
						value: "Luas lantai",
					},
					{
						value: "Sumber penerangan",
					},
					{
						value: "Pekerjaan",
					},
					{
						value: "Konsumsi makanan",
					},
					{
						value: "Kemampuan berobat",
					},
					{
						value: "Jumlah baris",
					},
					{
						value: "EIGEN",
					},
					{
						value: "Lamda",
					},
				],
				// row cell 20
				[
					{ value: "" },
					{
						value: "Pendidikan",
					},
					{
						value: normalisasiKriteria1[0],
					},
					{
						value: normalisasiKriteria1[1],
					},
					{
						value: normalisasiKriteria1[2],
					},
					{
						value: normalisasiKriteria1[3],
					},
					{
						value: normalisasiKriteria1[4],
					},
					{
						value: normalisasiKriteria1[5],
					},
					{
						value: normalisasiKriteria1[6],
					},
					{
						value: normalisasiKriteria1[7],
					},
					{
						value: normalisasiKriteria1[8],
					},
					{
						value: normalisasiKriteria1[9],
					},
					{
						value: normalisasiKriteria1[10],
					},
					{
						value: jmlhNormalisasiKriteria1,
					},
					{
						value: hasilAkhirNilaiPrioritasToExcel[0],
					},
					{
						value: nilaiLamda[0],
					},
				],
				// row cell 21
				[
					{ value: "" },
					{
						value: "Sumber air minum",
					},
					{
						value: normalisasiKriteria2[0],
					},
					{
						value: normalisasiKriteria2[1],
					},
					{
						value: normalisasiKriteria2[2],
					},
					{
						value: normalisasiKriteria2[3],
					},
					{
						value: normalisasiKriteria2[4],
					},
					{
						value: normalisasiKriteria2[5],
					},
					{
						value: normalisasiKriteria2[6],
					},
					{
						value: normalisasiKriteria2[7],
					},
					{
						value: normalisasiKriteria2[8],
					},
					{
						value: normalisasiKriteria2[9],
					},
					{
						value: normalisasiKriteria2[10],
					},
					{
						value: jmlhNormalisasiKriteria2,
					},
					{
						value: hasilAkhirNilaiPrioritasToExcel[1],
					},
					{
						value: nilaiLamda[1],
					},
				],
				// row cell 22
				[
					{ value: "" },
					{
						value: "Dinding rumah",
					},
					{
						value: normalisasiKriteria3[0],
					},
					{
						value: normalisasiKriteria3[1],
					},
					{
						value: normalisasiKriteria3[2],
					},
					{
						value: normalisasiKriteria3[3],
					},
					{
						value: normalisasiKriteria3[4],
					},
					{
						value: normalisasiKriteria3[5],
					},
					{
						value: normalisasiKriteria3[6],
					},
					{
						value: normalisasiKriteria3[7],
					},
					{
						value: normalisasiKriteria3[8],
					},
					{
						value: normalisasiKriteria3[9],
					},
					{
						value: normalisasiKriteria3[10],
					},
					{
						value: jmlhNormalisasiKriteria3,
					},
					{
						value: hasilAkhirNilaiPrioritasToExcel[2],
					},
					{
						value: nilaiLamda[2],
					},
				],
				// row cell 22
				[
					{ value: "" },
					{
						value: "Kondisi lantai",
					},
					{
						value: normalisasiKriteria4[0],
					},
					{
						value: normalisasiKriteria4[1],
					},
					{
						value: normalisasiKriteria4[2],
					},
					{
						value: normalisasiKriteria4[3],
					},
					{
						value: normalisasiKriteria4[4],
					},
					{
						value: normalisasiKriteria4[5],
					},
					{
						value: normalisasiKriteria4[6],
					},
					{
						value: normalisasiKriteria4[7],
					},
					{
						value: normalisasiKriteria4[8],
					},
					{
						value: normalisasiKriteria4[9],
					},
					{
						value: normalisasiKriteria4[10],
					},
					{
						value: jmlhNormalisasiKriteria4,
					},
					{
						value: hasilAkhirNilaiPrioritasToExcel[3],
					},
					{
						value: nilaiLamda[3],
					},
				],
				// row cell 22
				[
					{ value: "" },
					{
						value: "Kemampuan membeli pakaian",
					},
					{
						value: normalisasiKriteria5[0],
					},
					{
						value: normalisasiKriteria5[1],
					},
					{
						value: normalisasiKriteria5[2],
					},
					{
						value: normalisasiKriteria5[3],
					},
					{
						value: normalisasiKriteria5[4],
					},
					{
						value: normalisasiKriteria5[5],
					},
					{
						value: normalisasiKriteria5[6],
					},
					{
						value: normalisasiKriteria5[7],
					},
					{
						value: normalisasiKriteria5[8],
					},
					{
						value: normalisasiKriteria5[9],
					},
					{
						value: normalisasiKriteria5[10],
					},
					{
						value: jmlhNormalisasiKriteria5,
					},
					{
						value: hasilAkhirNilaiPrioritasToExcel[4],
					},
					{
						value: nilaiLamda[4],
					},
				],
				// row cell 22
				[
					{ value: "" },
					{
						value: "Atap rumah",
					},
					{
						value: normalisasiKriteria6[0],
					},
					{
						value: normalisasiKriteria6[1],
					},
					{
						value: normalisasiKriteria6[2],
					},
					{
						value: normalisasiKriteria6[3],
					},
					{
						value: normalisasiKriteria6[4],
					},
					{
						value: normalisasiKriteria6[5],
					},
					{
						value: normalisasiKriteria6[6],
					},
					{
						value: normalisasiKriteria6[7],
					},
					{
						value: normalisasiKriteria6[8],
					},
					{
						value: normalisasiKriteria6[9],
					},
					{
						value: normalisasiKriteria6[10],
					},
					{
						value: jmlhNormalisasiKriteria6,
					},
					{
						value: hasilAkhirNilaiPrioritasToExcel[5],
					},
					{
						value: nilaiLamda[5],
					},
				],
				// row cell 23
				[
					{ value: "" },
					{
						value: "Luas lantai",
					},
					{
						value: normalisasiKriteria7[0],
					},
					{
						value: normalisasiKriteria7[1],
					},
					{
						value: normalisasiKriteria7[2],
					},
					{
						value: normalisasiKriteria7[3],
					},
					{
						value: normalisasiKriteria7[4],
					},
					{
						value: normalisasiKriteria7[5],
					},
					{
						value: normalisasiKriteria7[6],
					},
					{
						value: normalisasiKriteria7[7],
					},
					{
						value: normalisasiKriteria7[8],
					},
					{
						value: normalisasiKriteria7[9],
					},
					{
						value: normalisasiKriteria7[10],
					},
					{
						value: jmlhNormalisasiKriteria7,
					},
					{
						value: hasilAkhirNilaiPrioritasToExcel[6],
					},
					{
						value: nilaiLamda[6],
					},
				],
				// row cell 23
				[
					{ value: "" },
					{
						value: "Sumber penerangan",
					},
					{
						value: normalisasiKriteria8[0],
					},
					{
						value: normalisasiKriteria8[1],
					},
					{
						value: normalisasiKriteria8[2],
					},
					{
						value: normalisasiKriteria8[3],
					},
					{
						value: normalisasiKriteria8[4],
					},
					{
						value: normalisasiKriteria8[5],
					},
					{
						value: normalisasiKriteria8[6],
					},
					{
						value: normalisasiKriteria8[7],
					},
					{
						value: normalisasiKriteria8[8],
					},
					{
						value: normalisasiKriteria8[9],
					},
					{
						value: normalisasiKriteria8[10],
					},
					{
						value: jmlhNormalisasiKriteria8,
					},
					{
						value: hasilAkhirNilaiPrioritasToExcel[7],
					},
					{
						value: nilaiLamda[7],
					},
				],
				// row cell 23
				[
					{ value: "" },
					{
						value: "Pekerjaan",
					},
					{
						value: normalisasiKriteria9[0],
					},
					{
						value: normalisasiKriteria9[1],
					},
					{
						value: normalisasiKriteria9[2],
					},
					{
						value: normalisasiKriteria9[3],
					},
					{
						value: normalisasiKriteria9[4],
					},
					{
						value: normalisasiKriteria9[5],
					},
					{
						value: normalisasiKriteria9[6],
					},
					{
						value: normalisasiKriteria9[7],
					},
					{
						value: normalisasiKriteria9[8],
					},
					{
						value: normalisasiKriteria9[9],
					},
					{
						value: normalisasiKriteria9[10],
					},
					{
						value: jmlhNormalisasiKriteria9,
					},
					{
						value: hasilAkhirNilaiPrioritasToExcel[8],
					},
					{
						value: nilaiLamda[8],
					},
				],
				// row cell 23
				[
					{ value: "" },
					{
						value: "Konsumsi makanan",
					},
					{
						value: normalisasiKriteria10[0],
					},
					{
						value: normalisasiKriteria10[1],
					},
					{
						value: normalisasiKriteria10[2],
					},
					{
						value: normalisasiKriteria10[3],
					},
					{
						value: normalisasiKriteria10[4],
					},
					{
						value: normalisasiKriteria10[5],
					},
					{
						value: normalisasiKriteria10[6],
					},
					{
						value: normalisasiKriteria10[7],
					},
					{
						value: normalisasiKriteria10[8],
					},
					{
						value: normalisasiKriteria10[9],
					},
					{
						value: normalisasiKriteria10[10],
					},
					{
						value: jmlhNormalisasiKriteria10,
					},
					{
						value: hasilAkhirNilaiPrioritasToExcel[9],
					},
					{
						value: nilaiLamda[9],
					},
				],
				// row cell 23
				[
					{ value: "" },
					{
						value: "Kemampuan berobat",
					},
					{
						value: normalisasiKriteria11[0],
					},
					{
						value: normalisasiKriteria11[1],
					},
					{
						value: normalisasiKriteria11[2],
					},
					{
						value: normalisasiKriteria11[3],
					},
					{
						value: normalisasiKriteria11[4],
					},
					{
						value: normalisasiKriteria11[5],
					},
					{
						value: normalisasiKriteria11[6],
					},
					{
						value: normalisasiKriteria11[7],
					},
					{
						value: normalisasiKriteria11[8],
					},
					{
						value: normalisasiKriteria11[9],
					},
					{
						value: normalisasiKriteria11[10],
					},
					{
						value: jmlhNormalisasiKriteria11,
					},
					{
						value: hasilAkhirNilaiPrioritasToExcel[10],
					},
					{
						value: nilaiLamda[10],
					},
				],
				// row cell 24
				[{ value: "" }],
				// row cell 25
				[
					{ value: "" },
					{
						value: "Jumlah",
					},
					{
						value: hasilNormalisasiKriteriaAkhir[0],
					},
					{
						value: hasilNormalisasiKriteriaAkhir[1],
					},
					{
						value: hasilNormalisasiKriteriaAkhir[2],
					},
					{
						value: hasilNormalisasiKriteriaAkhir[3],
					},
					{
						value: hasilNormalisasiKriteriaAkhir[4],
					},
					{
						value: hasilNormalisasiKriteriaAkhir[5],
					},
					{
						value: hasilNormalisasiKriteriaAkhir[6],
					},
					{
						value: hasilNormalisasiKriteriaAkhir[7],
					},
					{
						value: hasilNormalisasiKriteriaAkhir[8],
					},
					{
						value: hasilNormalisasiKriteriaAkhir[9],
					},
					{
						value: hasilNormalisasiKriteriaAkhir[10],
					},
					{
						value: "",
					},
					{
						value: totalNilaiEIGEN,
					},
					{
						value: nilaiLamdaMaks,
					},
				],
				// row cell 26
				[{ value: "" }, { value: "Nilai CI" }, { value: nilaiCI }],
				// row cell 27
				[{ value: "" }, { value: "Nilai CR" }, { value: nilaiCR }],
			],
		},
	];

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
									<ExcelFile
										element={<MenuItem>EXCEL</MenuItem>}
										filename="hasil_perhitungan_ahp"
									>
										<ExcelSheet
											dataSet={multiDataSet}
											name="Perhitungan AHP"
										/>
									</ExcelFile>
								</Menu>
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
											<td>{i + 1}.</td>
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
