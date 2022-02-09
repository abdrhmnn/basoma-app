// styling component linked in bantuan_not_found.scss file

import React from "react";

// img
import searchImg from "./../../images/searching.svg";

const BoxBantuanGagal = () => {
	return (
		<div className="not_found">
			<div className="flex_not_found">
				<img src={searchImg} alt="Tidak ditemukan" />
				<h1>Data bantuan tidak ditemukan!</h1>
			</div>
		</div>
	);
};

export default BoxBantuanGagal;
