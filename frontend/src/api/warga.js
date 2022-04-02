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
    saveWarga: (props, userID, bantuanID, kesehatan, penghasilan, pendidikan, imgKK, imgKTP, nilaiRangking) => {
        return axios.post(`/warga`, {
            no_kk: props.no_kk,
            no_ktp: props.no_ktp,
            user_id: userID,
            id_bantuan: bantuanID,
            nama_lengkap: props.nm_lengkap,
            alamat: props.alamat,
            konsumsi_makanan: props.konsumsi_makanan,
            kondisi_pakaian: props.kondisi_pakaian,
            kesehatan: kesehatan,
            asset: props.asset,
            pendidikan: pendidikan,
            penghasilan: penghasilan,
            luas_bangunan: props.luas_bangunan,
            status_penerimaan: 'pending',
            foto_kk: imgKK.name,
            foto_ktp: imgKTP.name,
            nilai_rangking: nilaiRangking
        })
    },
    updateStatusWargaByUserID: (userId, status) => {
        return axios.patch(`/warga/update/${userId}`, {
            user_id: userId,
            status_penerimaan: status
        })
    },
    deleteWargaByUserID: (id) => {
        return axios.delete(`/warga/${id}`)
    }
}

export default WARGA