import React from "react";

// npm packages
import {
	Avatar,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
} from "@mui/material";

const DialogHistoryKebijakan = ({ open, close, userById, historyById }) => {
	const splitWaktuHistory = historyById.waktu_kebijakan.split(" ");
	const tanggal = splitWaktuHistory[0];
	const waktu = splitWaktuHistory[1];

	return (
		<Dialog
			open={open}
			onClose={close}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title" sx={{ fontSize: "1em" }}>
				Detail History Kebijakan Bantuan
			</DialogTitle>
			<DialogContent>
				<div className="detail_history">
					<div className="user_detail">
						<p>Kebijakan dilakukan oleh</p>
						<div className="profile_user">
							<div className="foto">
								<Avatar
									alt="Foto Profile"
									src={
										userById.gambar
											? userById.gambar === "default_img.svg"
												? `http://localhost:5000/public/${userById.gambar}`
												: `http://localhost:5000/public/user/${userById.gambar}`
											: "blank_img.png"
									}
								/>
							</div>
							<div className="data_diri">
								<div className="nm_lengkap">
									{userById.nm_depan} {userById.nm_belakang}
								</div>
								<div className="jabatan">{userById.role}</div>
							</div>
						</div>
					</div>
					<div className="tanggal_waktu">
						<div className="tanggal">
							<p>Tanggal Kebijakan</p>
							<p>{tanggal.replace(/-/g, "/")}</p>
						</div>
						<div className="waktu">
							<p>Waktu Kebijakan</p>
							<p>{waktu} WIB</p>
						</div>
					</div>
					<div className="keterangan_kebijakan">
						<p>Keterangan</p>
						<TextField
							name="keterangan"
							variant="outlined"
							defaultValue={`${historyById.keterangan}`}
							className="text_keterangan"
							disabled={true}
							fullWidth
							multiline
							rows={3}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DialogHistoryKebijakan;
