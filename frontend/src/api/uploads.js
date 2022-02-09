import axios from "axios";

const UPLOAD = {
    saveIMG: (data) => {
        return axios.post(`/uploads`, data)
    },
    showIMG: (data) => {
        return `http://localhost:5000/public/${data}`
    },
    saveIMG_KTP: (data) => {
        return axios.post(`/uploads/ktp`, data)
    },
    saveIMG_BANGUNAN: (data) => {
        return axios.post(`/uploads/bangunan`, data)
    }
}

export default UPLOAD