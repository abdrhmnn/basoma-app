import React from "react";

// img
import searchImg from "./../../images/searching.svg";

const BoxBantuanGagal = () => {
	return (
		<div>
			<div className="not_found">
				<div className="flex_not_found">
					<img src={searchImg} alt="Tidak ditemukan" />
					<h1>Data bantuan tidak ditemukan!</h1>
				</div>
			</div>
		</div>
	);
};

export default BoxBantuanGagal;
