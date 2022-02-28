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
    },
    updateBantuan: (bantuanId, data) => {
        return axios.patch(`/bantuan/${bantuanId}`, data)
    },
    updateKapasitasBantuan: (bantuanId, kapasitas) => {
        return axios.patch(`/bantuan/${bantuanId}`, {
            kd_bantuan: bantuanId,
            kapasitas: kapasitas
        })
    },
    saveBantuan: (bantuanId, props, banner) => {
        return axios.post(`/bantuan`, {
            kd_bantuan: `BNT_${bantuanId}`,
            nama: props.nama,
            kapasitas: props.kapasitas,
            alamat: props.alamat,
            deskripsi: props.deskripsi,
            banner: banner.name
        })
    }
}

export default BANTUAN