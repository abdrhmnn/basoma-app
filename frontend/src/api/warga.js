import axios from "axios";

const WARGA = {
    getAllWarga: () => {
        return axios.get(`/warga`)
    },
    getWargaByBantuanID: (id) => {
        return axios.get(`/warga/bantuanID/${id}`)
    },
    getWargaByNoKK: (no_kk) => {
        return axios.get(`/warga/noKK/${no_kk}`)
    },
    getWargaByUserID: (userId) => {
        return axios.get(`/warga/userId/${userId}`)
    },
    getWargaByBantuanIDAndSortByNilaiRangking: (bantuanId) => {
        return axios.get(`/warga/sortRangking/${bantuanId}`)
    },
    saveWarga: (props, userId, bantuanId, imgRumah) => {
        return axios.post(`/warga`, {
            no_kk: props.no_kk,
            no_ktp: props.no_ktp,
            user_id: userId,
            id_bantuan: bantuanId,
            nama_lengkap: props.nm_lengkap,
            alamat: props.alamat,
            no_telepon: props.no_telepon,
            status_rekomendasi: "pending",
            nilai_rekomendasi: 0,
            foto_rumah: imgRumah.name
        })
    },
    updateWarga: (noKK, data) => {
        return axios.patch(`/warga/update/${noKK}`, data)
    },
    deleteWargaByUserID: (id) => {
        return axios.delete(`/warga/${id}`)
    },
    deleteWargaByBantuanID: (id) => {
        return axios.delete(`/bantuanId/${id}`)
    }
}

export default WARGA