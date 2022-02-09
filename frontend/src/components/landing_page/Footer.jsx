// styling component linked in footer.scss file

import React from "react";

// npm packages
import { NavLink, Link } from "react-router-dom";
import {
	AiFillInstagram,
	AiFillFacebook,
	AiOutlineTwitter,
} from "react-icons/ai";

const Footer = (props) => {
	let classNameForFooter = "foot_foot";

	const showClassName = () => {
		const aboutProps = props.class_about;
		const bantuanProps = props.class_bantuan;
		const bantuanDetailProps = props.class_bantuan_detail;
		const editProfileProps = props.class_edit_profile;
		const masukanProps = props.class_masukan;

		if (aboutProps) return (classNameForFooter = aboutProps);
		else if (bantuanProps) return (classNameForFooter = bantuanProps);
		else if (bantuanDetailProps)
			return (classNameForFooter = bantuanDetailProps);
		else if (editProfileProps) return (classNameForFooter = editProfileProps);
		else if (masukanProps) return (classNameForFooter = masukanProps);

		return classNameForFooter;
	};

	return (
		// Component footer
		<footer className={"footer " + showClassName()}>
			<div className="wrap_container">
				<h1>Basoma</h1>

				{/* Footer navbar section */}
				<div className="footer_nav">
					<ul>
						<li>
							<NavLink
								exact="true"
								to="/"
								className={({ isActive }) =>
									isActive ? "active_foot" : "unselected_foot"
								}
							>
								Beranda
							</NavLink>
						</li>
						<li>
							<NavLink
								exact="true"
								to="/bantuan"
								className={({ isActive }) =>
									isActive || props.active_foot
										? "active_foot"
										: "unselected_foot"
								}
							>
								Bantuan
							</NavLink>
						</li>
						<li>
							<NavLink
								exact="true"
								to="/tentang"
								className={({ isActive }) =>
									isActive || props.active_masukan
										? "active_foot"
										: "unselected_foot"
								}
							>
								Tentang
							</NavLink>
						</li>
					</ul>
				</div>
				{/* Akhir footer navbar section */}

				<hr />

				{/* Footer sosial media section */}
				<div className="footer_sosmed">
					<div className="footer_created">
						<h2>Created by. Team JAI</h2>
					</div>
					<div className="footer_social_media">
						<Link to="">
							<AiFillFacebook size={20} />
						</Link>
						<Link to="">
							<AiFillInstagram size={20} />
						</Link>
						<Link to="">
							<AiOutlineTwitter size={20} />
						</Link>
					</div>
				</div>
				{/* Akhir footer sosial media section */}
			</div>
		</footer>
		// Akhir component footer
	);
};

export default Footer;
