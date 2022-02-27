import axios from "axios";

const WARGA = {
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
    getAllWarga: () => {
        return axios.get(`/warga`)
    },
    getWargaByBantuanID: (id) => {
        return axios.get(`/warga/bantuanID/${id}`)
    },
    getWargaByNoKTP: (no_ktp) => {
        return axios.get(`/warga/noKTP/${no_ktp}`)
    },
    getWargaByBantuanIDAndSortByNilaiRangking: (bantuanId) => {
        return axios.get(`/warga/sortRangking/${bantuanId}`)
    },
    updateStatusWargaByUserID: (userId, status) => {
        return axios.patch(`/warga/update/${userId}`, {
            user_id: userId,
            status_penerimaan: status
        })
    }
}

export default WARGA