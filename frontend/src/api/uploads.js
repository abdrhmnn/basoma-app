import axios from "axios";

const UPLOAD = {
    saveIMG_USER: (data) => {
        return axios.post(`/uploads/user`, data)
    },
    saveIMG_KK: (data) => {
        return axios.post(`/uploads/kk`, data)
    },
    saveIMG_KTP: (data) => {
        return axios.post(`/uploads/ktp`, data)
    },
    saveIMG_BANTUAN: (data) => {
        return axios.post(`/uploads/bantuan`, data)
    },
    deleteImgUser: (image_name) => {
        return axios.delete(`/uploads/delete/imgUser/${image_name}`)
    },
    deleteImgKK: (image_name) => {
        return axios.delete(`/uploads/delete/imgKkUser/${image_name}`)
    },
    deleteImgKTP: (image_name) => {
        return axios.delete(`/uploads/delete/imgKtpUser/${image_name}`)
    },
    deleteImgBantuan: (image_name) => {
        return axios.delete(`/uploads/delete/imgBantuan/${image_name}`)
    },
    showIMG_DEFAULT: (data) => {
        return `http://localhost:5000/public/${data}`
    },
    showIMG_USER: (data) => {
        return `http://localhost:5000/public/user/${data}`
    },
    showImgKK: (data) => {
        return `http://localhost:5000/public/fkk/${data}`
    },
    showImgKTP: (data) => {
        return `http://localhost:5000/public/fktp/${data}`
    },
    showImgBantuan: (data) => {
        return `http://localhost:5000/public/bantuan/${data}`
    }
}

export default UPLOAD