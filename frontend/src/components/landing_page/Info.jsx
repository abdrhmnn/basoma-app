import React from "react";

// components
import JoinUs from "./JoinUs";

// img
import Mudah_Akses from "./../../images/easy_to_access.svg";
import Mudah_Daftar from "./../../images/easy_to_use.svg";
import Updt_Info from "./../../images/easy_to_update.svg";

const Info = () => {
	return (
		<div className="wr_info">
			<div className="info">
				<div className="info-content">
					<img src={Mudah_Akses} alt="Easy to Use" />
					<h2>Mudah Diakses</h2>
					<p>
						Aplikasi basoma dapat diakses dimanapun
						<br />
						dan kapanpun
					</p>
				</div>
				<div className="info-content">
					<img src={Mudah_Daftar} alt="Easy to Use" />
					<h2>Mudah Digunakan</h2>
					<p>
						Proses mulai pendaftaran hingga selesai dapat dengan mudah
						dipahami
					</p>
				</div>
				<div className="info-content">
					<img src={Updt_Info} alt="Easy to Use" />
					<h2>Selalu Update</h2>
					<p>
						Informasi bantuan sosial selalu diperbarui
						<br />
						setiap hari
					</p>
				</div>
			</div>
			<JoinUs />
		</div>
	);
};

export default Info;
