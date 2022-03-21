import axios from "axios";

const ALTERNATIF = {
    getAllAlternatif: () => {
        return axios.get(`/alternatif`)
    },
    getAlternatifByUserID: (userId) => {
        return axios.get(`/alternatif/userId/${userId}`)
    },
    saveAlternatif: (data) => {
        return axios.post(`/alternatif`, data)
    },
    deleteAlternatifByUserID: (id) => {
        return axios.delete(`/alternatif/${id}`)
    }
}

export default ALTERNATIF