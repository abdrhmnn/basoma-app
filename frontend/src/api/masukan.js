import axios from "axios";

const MASUKAN = {
    getAllMasukan: () => {
        return axios.get(`/masukan`)
    },
    saveMasukan: (props, msID, userID) => {
        return axios.post(`/masukan`, {
            kd_masukan: `MS_${msID}`,
            nm_depan: props.nm_depan,
            nm_belakang: props.nm_belakang,
            pesan: props.pesan,
            user_id: userID,
        })
    },
    getMasukanByID: (id) => {
        return axios.get(`/masukan/${id}`)
    },
    getMasukanByUserID: (userId) => {
        return axios.get(`/masukan/userId/${userId}`)
    },
    updateMasukanByUserID: (id) => {
        return axios.patch(`/masukan/userId/${id}`)
    },
}

export default MASUKAN