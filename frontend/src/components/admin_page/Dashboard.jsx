import React, { useState, useEffect } from "react";

// components
import HeaderAdmin from "./HeaderAdmin";
import NavbarAdmin from "./NavbarAdmin";

// API storage
import API from "../../api";

// npm packages
import { FaHandsHelping, FaUserFriends, FaListUl } from "react-icons/fa";
import { MdAssignmentInd } from "react-icons/md";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
	const [user, setUser] = useState([]);
	const [bantuan, setBantuan] = useState([]);
	const [pendaftaran, setPendaftaran] = useState([]);
	const [kriteria, setKriteria] = useState([]);

	ChartJS.register(
		CategoryScale,
		LinearScale,
		BarElement,
		Title,
		Tooltip,
		Legend
	);
	const labels = ["January", "February"];

	const data = {
		labels,
		datasets: [
			{
				label: "Diterima",
				data: labels.map(() => 10),
				backgroundColor: "rgba(255, 99, 132, 0.5)",
			},
			{
				label: "Ditolak",
				data: labels.map(() => 20),
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};

	const options = {
		responsive: true,
	};

	useEffect(() => {
		document.title = "Dashboard Admin";
		getAllUser();
		getAllBantuan();
		getAllPendaftaran();
		getAllKriteria();
	}, []);

	const getAllUser = async () => {
		const response = await API.getAllUser();
		setUser(response.data);
	};

	const getAllBantuan = async () => {
		const response = await API.getAllBantuan();
		setBantuan(response.data);
	};

	const getAllPendaftaran = async () => {
		const response = await API.getAllWarga();
		setPendaftaran(response.data);
	};

	const getAllKriteria = async () => {
		const response = await API.getAllKriteria();
		setKriteria(response.data);
	};

	return (
		<div style={{ display: "flex" }}>
			<NavbarAdmin />
			<div className="flex_header_admin">
				<HeaderAdmin />
				<div className="content_dashboard_admin">
					<h2>Hi, Selamat Datang</h2>
					<div className="dahsboard_info">
						<div
							className="info_item_1"
							style={{
								backgroundColor: "rgb(200, 250, 205)",
								color: "rgb(0, 82, 73)",
							}}
						>
							<div
								className="info_img"
								style={{
									color: "rgb(0, 123, 85)",
									backgroundImage:
										"linear-gradient(135deg, rgba(0, 123, 85, 0) 0%, rgba(0, 123, 85, 0.24) 100%)",
								}}
							>
								<FaHandsHelping size={30} />
							</div>
							<div className="info_detail">
								<h2>{bantuan.length}</h2>
								<p>Bantuan Sosial</p>
							</div>
						</div>
						<div
							className="info_item_2"
							style={{
								backgroundColor: "rgb(208, 242, 255)",
								color: "rgb(4, 41, 122)",
							}}
						>
							<div
								className="info_img"
								style={{
									color: "rgb(12, 83, 183)",
									backgroundImage:
										"linear-gradient(135deg, rgba(12, 83, 183, 0) 0%, rgba(12, 83, 183, 0.24) 100%)",
								}}
							>
								<FaUserFriends size={30} />
							</div>
							<div className="info_detail">
								<h2>{user.length}</h2>
								<p>Total User</p>
							</div>
						</div>
						<div
							className="info_item_3"
							style={{
								backgroundColor: "rgb(255, 247, 205)",
								color: "rgb(122, 79, 1)",
							}}
						>
							<div
								className="info_img"
								style={{
									color: "rgb(183, 129, 3)",
									backgroundImage:
										"linear-gradient(135deg, rgba(183, 129, 3, 0) 0%, rgba(183, 129, 3, 0.24) 100%)",
								}}
							>
								<MdAssignmentInd size={30} />
							</div>
							<div className="info_detail">
								<h2>{pendaftaran.length}</h2>
								<p>Pendaftaran Bantuan</p>
							</div>
						</div>
						<div
							className="info_item_4"
							style={{
								backgroundColor: "rgb(255, 231, 217)",
								color: "rgb(122, 12, 46)",
							}}
						>
							<div
								className="info_img"
								style={{
									color: "rgb(183, 33, 54)",
									backgroundImage:
										"linear-gradient(135deg, rgba(183, 33, 54, 0) 0%, rgba(183, 33, 54, 0.24) 100%)",
								}}
							>
								<FaListUl size={28} />
							</div>
							<div className="info_detail">
								<h2>{kriteria.length}</h2>
								<p>Kriteria Bantuan</p>
							</div>
						</div>
					</div>
					<div className="dashboard_chart">
						<h2>Data Pendaftaran Bantuan</h2>
						<p>berdasarkan status penerimaan</p>
						<Bar options={options} data={data} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
