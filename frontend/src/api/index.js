import axios from "axios";

// other API files
import BANTUAN from "./bantuan";
import KRITERIA from "./kriteria";
import MASUKAN from "./masukan";
import PEMBERITAHUAN from "./pemberitahuan";
import PESAN_BALAS from "./pesan_balas";
import PRIORITAS from "./prioritas";
import UPLOAD from "./uploads";
import WARGA from "./warga";

axios.defaults.baseURL = "http://localhost:5000";

const API = {
    getAllUser: () => {
        return axios.get(`/users`)
    },
    getUserByID: (id) => {
        return axios.get(`/users/${id}`)
    },
    saveUser: (props, userID) => {
        return axios.post(`/users`, {
            user_id: `USER_${userID}`,
            nm_depan: props.nm_depan,
            nm_belakang: props.nm_belakang,
            username: props.username,
            password: props.password,
            role: "warga",
            gambar: "default_img.svg",
            status_pengisian: "belum",
        })
    },
    updateUserByID: (props, img, id) => {
        return axios.patch(`/users/${id}`, {
            nm_depan: props.nm_depan,
            nm_belakang: props.nm_belakang,
            username: props.username,
            password: props.password,
            gambar: img.name
        });
    },
    updateStatusPengisianUser: (id) => {
        return axios.patch(`/users/${id}`, {
            status_pengisian: 'sudah'
        });
    },
    updateUserTanpaGambar: (props, id) => {
        return axios.patch(`/users/${id}`, {
            nm_depan: props.nm_depan,
            nm_belakang: props.nm_belakang,
            username: props.username,
            password: props.password
        });
    },
    
    // IMPORTED APIS
    ...BANTUAN,
    ...UPLOAD,
    ...WARGA,
    ...KRITERIA,
    ...PRIORITAS,
    ...MASUKAN,
    ...PESAN_BALAS,
    ...PEMBERITAHUAN
}

export default API