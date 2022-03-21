import axios from "axios";

const BANTUAN = {
    getAllBantuan: () => {
        return axios.get(`/bantuan`)
    },
    getBantuanByID: (id) => {
        return axios.get(`/bantuan/id/${id}`)
    },
    saveBantuan: (bantuanId, props, banner) => {
        return axios.post(`/bantuan`, {
            id_bantuan: `BNT_${bantuanId}`,
            nama: props.nama,
            kapasitas: props.kapasitas,
            alamat: props.alamat,
            deskripsi: props.deskripsi,
            banner: banner.name
        })
    },
    updateBantuan: (bantuanId, data) => {
        return axios.patch(`/bantuan/${bantuanId}`, data)
    },
    deleteBantuanByID: (id) => {
        return axios.delete(`/bantuan/${id}`)
    }
}

export default BANTUAN