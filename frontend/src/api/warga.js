import axios from "axios";

const WARGA = {
    getAllWarga: () => {
        return axios.get(`/warga`)
    },
    getWargaByBantuanID: (id) => {
        return axios.get(`/warga/bantuanID/${id}`)
    },
    getWargaByNoKTP: (no_ktp) => {
        return axios.get(`/warga/noKTP/${no_ktp}`)
    },
    getWargaByUserID: (userId) => {
        return axios.get(`/warga/userId/${userId}`)
    },
    getWargaByBantuanIDAndSortByNilaiRangking: (bantuanId) => {
        return axios.get(`/warga/sortRangking/${bantuanId}`)
    },
    saveWarga: (props, userID, bantuanID, penghasilan, pendidikan, luasRumah, imgKTP, imgBangunan, nilaiRangking) => {
        return axios.post(`/warga`, {
            no_ktp: props.nik,
            user_id: userID,
            kd_bantuan: bantuanID,
            nama_lengkap: props.nm_lengkap,
            alamat: props.alamat,
            pekerjaan: props.pekerjaan,
            penghasilan: penghasilan,
            pendidikan: pendidikan,
            luas_bangunan: luasRumah,
            sumber_penerangan_rumah: props.sumber_penerangan,
            status_penerimaan: 'pending',
            foto_ktp: imgKTP.name,
            foto_bangunan_rumah: imgBangunan.name,
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