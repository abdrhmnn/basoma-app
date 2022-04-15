import React, { useState, useEffect } from "react";

// API storage
import API from "../../api";

// npm packages
import {
	Box,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
} from "@mui/material";
import DialogHistoryKebijakan from "./DialogHistoryKebijakan";

const HistoryKebijakan = () => {
	const [history, setHistory] = useState(null);
	const [historyByID, setHistoryByID] = useState(null);
	const [user, setUser] = useState(null);
	const [userByID, setUserByID] = useState(null);

	const [openDialog, setOpenDialog] = useState(false);

	useEffect(() => {
		document.title = "History Kebijakan Bantuan";
		API.getAllHistoryKebijakan().then((res) => {
			setHistory(res.data);
		});
		API.getAllUser().then((res) => {
			setUser(res.data);
		});
	}, []);

	return (
		<div className="history_kebijakan">
			<div className="logo_app">
				<h2>Basoma</h2>
			</div>
			<div className="content">
				<h3>History kebijakan bantuan</h3>
				{history &&
					user &&
					history.map((e, i) => {
						const userId = [];
						user.map((element, i) => {
							userId.push(element.user_id);
						});

						return (
							<Box
								key={i}
								sx={{
									height: 50,
									p: 3,
									borderRadius: 3,
								}}
								onClick={() => {
									if (userId.includes(e.user_id)) {
										setOpenDialog(true);
										API.getUserByID(e.user_id).then((res) => {
											setUserByID(res.data);
										});
										API.getHistoryByID(e.id_history).then((res) => {
											setHistoryByID(res.data);
										});
									}

									// const splitWaktuHistory =
									// 	historyByID.waktu_kebijakan.split(" ");
									// setWaktuKebijakan(splitWaktuHistory);
								}}
							>
								<Typography variant="h4" className="judul_history">
									History kebijakan {i + 1}
								</Typography>
								<Typography variant="p" className="click_history">
									Klik untuk melihat detail
								</Typography>
							</Box>
						);
					})}
				{userByID && historyByID && (
					<DialogHistoryKebijakan
						open={openDialog}
						close={() => {
							setOpenDialog(false);
						}}
						userById={userByID}
						historyById={historyByID}
					/>
				)}
			</div>
		</div>
	);
};

export default HistoryKebijakan;
