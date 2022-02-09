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
    }
}

export default MASUKAN