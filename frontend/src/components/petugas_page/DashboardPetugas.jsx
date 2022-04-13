import React, { useState, useEffect } from "react";

// components
import NavbarPetugas from "./NavbarPetugas";
import HeaderPetugas from "./HeaderPetugas";

// API storage
import API from "../../api";

// npm packages
import { MdAssignmentInd } from "react-icons/md";

const DashboardPetugas = () => {
	const [pendaftaran, setPendaftaran] = useState([]);

	useEffect(() => {
		document.title = "Dashboard Petugas";
		getAllPendaftaran();
	}, []);

	const getAllPendaftaran = async () => {
		const response = await API.getAllWarga();
		setPendaftaran(response.data);
	};
	return (
		<div style={{ display: "flex" }}>
			<NavbarPetugas />
			<div className="flex_header_admin">
				<HeaderPetugas />
				<div className="content_dashboard_admin">
					<h2>Hi, Selamat Datang</h2>

					{/* dashboard petugas content */}
					<div className="dahsboard_info_petugas">
						{/* info pendaftaran bantuan */}
						<div
							className="info_item_pendaftaran"
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
							<div className="info_detail_pendaftaran">
								<h2>{pendaftaran.length}</h2>
								<p>Pendaftaran Bantuan</p>
							</div>
						</div>
						{/* akhir info pendaftaran bantuan */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPetugas;
