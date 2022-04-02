import axios from "axios";

const MASUKAN = {
    getAllMasukan: () => {
        return axios.get(`/masukan`)
    },
    getMasukanByID: (id) => {
        return axios.get(`/masukan/${id}`)
    },
    saveMasukan: (props, msID, userID) => {
        return axios.post(`/masukan`, {
            id_masukan: `MS_${msID}`,
            nm_depan: props.nm_depan,
            nm_belakang: props.nm_belakang,
            pesan: props.pesan,
            user_id: userID,
        })
    },
    deleteMasukanByUserID: (userID) => {
        return axios.delete(`/masukan/${userID}`)
    }
}

export default MASUKAN