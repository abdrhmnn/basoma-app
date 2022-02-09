import axios from "axios";

const BANTUAN = {
    getAllBantuan: () => {
        return axios.get(`/bantuan`)
    },
    getBantuanByID: (id) => {
        return axios.get(`/bantuan/id/${id}`)
    },
    getBantuanByNama: (nama) => {
        return axios.get(`/bantuan/${nama}`)
    },
    getBantuanByKapasitas: (kapasitas) => {
        return axios.get(`/bantuan/kapasitas/${kapasitas}`)
    }
}

export default BANTUAN