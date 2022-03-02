import axios from "axios";

const ALTERNATIF = {
    getAllAlternatif: () => {
        return axios.get(`/alternatif`)
    },
    saveAlternatif: (data) => {
        return axios.post(`/alternatif`, data)
    },
    getAlternatifByUserID: (userId) => {
        return axios.get(`/alternatif/userId/${userId}`)
    },
    deleteAlternatifByUserID: (id) => {
        return axios.delete(`/alternatif/${id}`)
    }
}

export default ALTERNATIF