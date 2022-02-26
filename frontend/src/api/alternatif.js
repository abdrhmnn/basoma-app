import axios from "axios";

const ALTERNATIF = {
    getAllAlternatif: () => {
        return axios.get(`/alternatif`)
    },
    saveAlternatif: (idAlternatif, userId, nilaiCI, nilaiCR) => {
        return axios.post(`/alternatif`, {
            id_alternatif: `AI_${idAlternatif}`,
            user_id: userId,
            nilai_ci: nilaiCI,
            nilai_cr: nilaiCR
        })
    },
    getAlternatifByUserID: (userId) => {
        return axios.get(`/alternatif/userId/${userId}`)
    }
}

export default ALTERNATIF