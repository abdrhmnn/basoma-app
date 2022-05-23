import axios from "axios";

const UPLOAD = {
    saveIMG_USER: (data) => {
        return axios.post(`/uploads/user`, data)
    },
    saveIMG_RUMAH: (data) => {
        return axios.post(`/uploads/rumah`, data)
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
    deleteImgRumah: (image_name) => {
        return axios.delete(`/uploads/delete/imgRumah/${image_name}`)
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
    showImgRumah: (data) => {
        return `http://localhost:5000/public/frumah/${data}`
    },
    showImgBantuan: (data) => {
        return `http://localhost:5000/public/bantuan/${data}`
    }
}

export default UPLOAD