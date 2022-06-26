import axios from "axios";

const SEND_EMAIL_NOTIF = {
    sendEmail: (values) => {
        return axios.post('/send-email', {
            no_kk: values.no_kk,
            no_ktp: values.no_ktp,
            nm_lengkap: values.nm_lengkap,
            alamat: values.alamat,
            no_telepon: values.no_telepon
        })
    }
}

export default SEND_EMAIL_NOTIF