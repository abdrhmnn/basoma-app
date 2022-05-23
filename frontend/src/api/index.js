import axios from "axios";

// other API files
import BANTUAN from "./bantuan";
import KRITERIA from "./kriteria";
import MASUKAN from "./masukan";
import PEMBERITAHUAN from "./pemberitahuan";
import PRIORITAS from "./prioritas";
import UPLOAD from "./uploads";
import WARGA from "./warga";
import SURVEY from "./survey";
import HISTORY_KEBIJAKAN from "./history_kebijakan";

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
    updateUser: (id, data) => {
        return axios.patch(`/users/${id}`, data)
    },
    deleteUserByUserID: (id) => {
        return axios.delete(`/users/${id}`)
    },
    
    // IMPORTED APIS
    ...BANTUAN,
    ...UPLOAD,
    ...WARGA,
    ...KRITERIA,
    ...PRIORITAS,
    ...MASUKAN,
    ...PEMBERITAHUAN,
    ...SURVEY,
    ...HISTORY_KEBIJAKAN
}

export default API