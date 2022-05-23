import axios from "axios";

const HISTORY_KEBIJAKAN = {
    getAllHistoryKebijakan: () => {
        return axios.get(`/history-kebijakan`)
    },
    getHistoryByID: (id) => {
        return axios.get(`/history-kebijakan/${id}`)
    },
    saveHistoryKebijakan: (data) => {
        return axios.post(`/history-kebijakan`, data)
    },
    deleteHistoryByNoKK: (no_kk) => {
        return axios.delete(`/history-kebijakan/${no_kk}`)
    }
}

export default HISTORY_KEBIJAKAN