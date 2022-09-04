import nodemailer from "nodemailer";

export async function sendEmail(req, res) {
	try {
		let pesanEmailNotifikasi = `
            <p>Warga baru telah melakukan pendaftaran bantuan, berikut detail dari warga yang mendaftar :</p>
            <ul>
                <li>Nomor KK : ${req.body.no_kk}</li>
                <li>Nomor KTP : ${req.body.no_ktp}</li>
                <li>Nama lengkap : ${req.body.nm_lengkap}</li>
                <li>Alamat lengkap : ${req.body.alamat}</li>
                <li>No telepon : ${req.body.no_telepon}</li>
            </ul>
        `;

		let transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 587,
			secure: false, // true for 465, false for other ports
			auth: {
				user: "@gmail.com", // generated ethereal user
				pass: "bzphljoaebmslupx", // generated ethereal password
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		// send mail with defined transport object
		let info = await transporter.sendMail({
			from: "<@gmail.com>", // sender address
			to: "@gmail.com", // list of receivers
			subject: "Pemberitahuan pendaftaran warga baru", // Subject line
			text: "Pendaftaran warga telah dilakukan", // plain text body
			html: pesanEmailNotifikasi, // html body
		});

		console.log("Message sent: %s", info.messageId);
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

		// Preview only available when sending through an Ethereal account
		console.log(
			"Preview URL: %s",
			nodemailer.getTestMessageUrl(info)
		);
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

		res.json({
			message: "Email has been sent!",
		});
	} catch (error) {
		res.json({ message: error.message });
	}

	// try{
	//     // Generate test SMTP service account from ethereal.email
	// // Only needed if you don't have a real mail account for testing

	// }catch(error){
	//     res.json({ message: error.message })
	// }
}
