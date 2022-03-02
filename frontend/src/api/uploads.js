import axios from "axios";

const UPLOAD = {
    saveIMG_USER: (data) => {
        return axios.post(`/uploads/user`, data)
    },
    showIMG_DEFAULT: (data) => {
        return `http://localhost:5000/public/${data}`
    },
    showIMG_USER: (data) => {
        return `http://localhost:5000/public/user/${data}`
    },
    showImgKTP: (data) => {
        return `http://localhost:5000/public/fktp/${data}`
    },
    showImgBangunan: (data) => {
        return `http://localhost:5000/public/fbangunan/${data}`
    },
    showImgBantuan: (data) => {
        return `http://localhost:5000/public/bantuan/${data}`
    },
    saveIMG_KTP: (data) => {
        return axios.post(`/uploads/ktp`, data)
    },
    saveIMG_BANGUNAN: (data) => {
        return axios.post(`/uploads/bangunan`, data)
    },
    saveIMG_BANTUAN: (data) => {
        return axios.post(`/uploads/bantuan`, data)
    },
    deleteImgUser: (image_name) => {
        return axios.delete(`/uploads/delete/imgUser/${image_name}`)
    },
    deleteImgKTP_User: (image_name) => {
        return axios.delete(`/uploads/delete/imgKtpUser/${image_name}`)
    },
    deleteImgBangunan_User: (image_name) => {
        return axios.delete(`/uploads/delete/imgBangunanUser/${image_name}`)
    }
}

export default UPLOAD