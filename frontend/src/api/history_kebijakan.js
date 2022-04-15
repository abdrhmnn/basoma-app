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
    }
}

export default HISTORY_KEBIJAKAN