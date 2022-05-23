// styling component linked in hero.scss file

import React from "react";

// img
import wave from "./../../images/wave.svg";

// npm packages
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Hero = () => {
	return (
		<section className="hero">
			<div className="content-hero">
				<h3>
					Temukan Bantuan Pangan Non Tunai Dengan <span>Mudah</span>
				</h3>
				<p>
					Tempat untuk menemukan bantuan pangan non tunai yang dibutuhkan{" "}
					<br />
					dengan mudah
				</p>
				<Button
					variant="contained"
					className="btn_cari"
					component={Link}
					to="/bantuan"
				>
					Cari Bantuan <FiSearch size={20} style={{ marginLeft: 10 }} />
				</Button>
			</div>
			<img src={wave} alt="Wave" id="wave" />
		</section>
	);
};

export default Hero;
