// styling component linked in about.scss file

import React, { useEffect } from "react";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

// img
import img1 from "./../../images/img2.png";

// npm packages
import { Card, CardContent, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const About = () => {
	useEffect(() => {
		document.title = "Tentang Bantuan Sosial Masyarakat";
	}, []);

	return (
		<div>
			<Navbar />

			{/* Component about content */}
			<div className="about">
				<h1>Bantuan Sosial Masyarakat</h1>
				<p>
					Bantuan Sosial Masyarakat (Basoma) adalah sistem pendukung
					keputusan yang dapat membantu dalam menentukan masyarakat yang
					tepat untuk menerima bantuan pangan non tunai yang akan
					diberikan. Dalam proses menentukan calon penerima BPNT, sistem
					Basoma menggunakan metode <i>Analytical Hierarchy Process</i>.
				</p>
				<p>
					Analytical Hierarchy Process merupakan salah satu bentuk model
					pengambilan keputusan dengan multiple kriteria yang kompleks
					menjadi suatu hierarki yang merepresentasikan sebuah permasalahan
					dalam suatu struktur multilevel dimana level tersebut terdiri
					dari kriteria, sub kriteria hingga ke level terakhir yaitu
					alternatif. Metode AHP digunakan karena dapat menyelesaikan
					masalah multikriteria yang kompleks menjadi suatu hierarki.
					Masalah yang kompleks dapat diartikan bahwa kriteria dari suatu
					masalah yang begitu banyak (multikriteria), struktur masalah yang
					belum jelas serta ketidakpastian pendapat dari pengambil
					keputusan sehingga metode AHP dapat menggambarkan permasalahan
					menjadi terlihat lebih terstruktur dan sistematis.
				</p>
				<p>
					Dalam menentukan calon penerima BPNT, sistem Basoma menggunakan
					kriteria yang ditentukan oleh Kementerian Sosial nomor
					146/HUK/2013 yang dijadikan sebagai dasar penilaian calon
					penerima BPNT, diantaranya :
				</p>
				<ul>
					<li>Pendidikan</li>
					<li>Sumber air minum</li>
					<li>Dinding rumah</li>
					<li>Kondisi lantai</li>
					<li>Kemampuan membeli pakaian</li>
					<li>Atap rumah</li>
					<li>Luas lantai</li>
					<li>Sumber penerangan</li>
					<li>Pekerjaan</li>
					<li>Konsumsi makanan</li>
					<li>Kemampuan berobat</li>
				</ul>
				{/* <p>
					Kami adalah mahasiswa{" "}
					<a
						href="https://www.mercubuana.ac.id/id"
						target="_blank"
						rel="noreferrer"
					>
						Universitas Mercu Buana
					</a>{" "}
					yang saat ini sedang mengerjakan tugas akhir dimana aplikasi
					Basoma adalah aplikasi yang kami rancang untuk tugas akhir kami.
				</p> */}

				{/* Card container */}
				{/* <div className="about_us">
					<Card className="card_about_us">
						<Avatar
							alt="Foto Profile"
							src={img1}
							sx={{ width: 145, height: 140, margin: "auto" }}
						/>
						<CardContent>
							<h2>Jody Satrio</h2>
							<p>Designer</p>
						</CardContent>
					</Card>
					<Card className="card_about_us">
						<Avatar
							alt="Foto Profile"
							src={img1}
							sx={{ width: 145, height: 140, margin: "auto" }}
						/>
						<CardContent>
							<h2>Abdurrahman</h2>
							<p>Designer</p>
						</CardContent>
					</Card>
					<Card className="card_about_us">
						<Avatar
							alt="Foto Profile"
							src={img1}
							sx={{ width: 145, height: 140, margin: "auto" }}
						/>
						<CardContent>
							<h2>Irpan Indra Maulana</h2>
							<p>Designer</p>
						</CardContent>
					</Card>
				</div> */}
				{/* Akhir card container */}

				<p>
					Saran dan masukan sangat kami butuhkan untuk mengembangkan
					aplikasi basoma untuk kedepannya. Jika ada, dapat klik{" "}
					<Link to="/masukan">disini!</Link>
				</p>
			</div>
			{/* Akhir component about content */}

			<Footer class_about="about_foot" />
		</div>
	);
};

export default About;
